#!/usr/bin/env node
// hearloop: top request on your board -> any coding agent (or you) builds it -> Kane CLI verifies -> board updated.
import { spawn, spawnSync } from 'node:child_process'
import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { createInterface } from 'node:readline/promises'
import { AGENTS, agentCommand, buildPrompt } from './agents'
import { boardApi, CONFIG_FILE, type Config, loadConfig } from './config'

type Post = { id: number; title: string; body: string; status: string; votes: number }
type Verdict = { passed: boolean; summary: string; kaneFault: boolean }

const DIR = '.hearloop'
const OBJECTIVE = `${DIR}/kane-objective.txt`
const CHANGELOG = `${DIR}/changelog.md`

const HELP = `hearloop: build your board's top request with a coding agent, prove it with Kane CLI.

  hearloop init                         write ${CONFIG_FILE} for this repo
  hearloop run [--post <id>]            build the top request (or one post), verify, report
  hearloop verify <post> [objective]    only run Kane and report (CI, or work done by hand)

Options: --config <file>  another config, e.g. hearloop.prod.json (default ${CONFIG_FILE})
Agents: ${Object.keys(AGENTS).join(', ')}, manual (you write the code), or any command with {prompt}.
Env: HEARLOOP_TOKEN  the loop token from your board's Settings → Loop API tokens`

const sh = (cmd: string, env: Record<string, string> = {}, inherit = process.env) =>
  new Promise<number>((done) => spawn(cmd, { shell: true, stdio: 'inherit', env: { ...inherit, ...env } }).on('close', (c) => done(c ?? 1)))

/** The agent reads untrusted text, so it never gets our token. */
const { HEARLOOP_TOKEN: _token, ...agentEnv } = process.env

class Conflict extends Error {}

async function must(cmd: string, what: string) {
  if ((await sh(cmd)) !== 0) throw new Error(`${what} failed: ${cmd}`)
}

function api(c: Config) {
  const base = boardApi(c.board)
  return async (path: string, body?: unknown): Promise<any> => {
    const token = process.env.HEARLOOP_TOKEN
    if (body !== undefined && !token) throw new Error('Set HEARLOOP_TOKEN to your loop token (board Settings → Loop API token).')
    const init = body === undefined ? {} : {
      method: 'POST',
      headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
      body: JSON.stringify(body),
    }
    // one retry on a network error, so a Kane verdict isn't lost to a blip
    const res = await fetch(base + path, init).catch(() => new Promise((r) => setTimeout(r, 2000)).then(() => fetch(base + path, init)))
    if (res.status === 409) throw new Conflict(((await res.json().catch(() => ({}))) as { error?: string }).error ?? 'conflict')
    if (!res.ok) throw new Error(`${path}: ${res.status} ${await res.text()}`)
    return res.json()
  }
}

async function ask(q: string, fallback = '') {
  const rl = createInterface({ input: process.stdin, output: process.stdout })
  const a = (await rl.question(fallback ? `${q} (${fallback}) ` : `${q} `)).trim()
  rl.close()
  return a || fallback
}

const read = (p: string) => (existsSync(p) ? readFileSync(p, 'utf8').trim() : '')

// Kane --agent prints NDJSON; the run_end line holds status, summary and, on failure, a verdict.
function kane(c: Config, objective: string): Verdict {
  const run = () => spawnSync('kane-cli', ['run', objective, '--agent', '--headless', '--url', c.app, '--timeout', '300', '--max-steps', '30'], {
    encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, env: { ...process.env, KANE_CLI_USER_AGENT: process.env.KANE_CLI_USER_AGENT ?? 'hearloop' },
  })
  let out: string
  if (c.kaneFolder) {
    // file the run under the configured folder, then put the profile's folder back
    const prev = JSON.parse(spawnSync('kane-cli', ['config', 'show', '--agent'], { encoding: 'utf8' }).stdout || '{}').folder_id
    spawnSync('kane-cli', ['config', 'folder', c.kaneFolder])
    try { out = run().stdout ?? '' } finally { if (prev) spawnSync('kane-cli', ['config', 'folder', prev]) }
  } else out = run().stdout ?? ''
  writeFileSync(`${DIR}/kane-${Date.now()}.ndjson`, out)
  const end = out.split('\n').flatMap((l): any[] => { try { return [JSON.parse(l)] } catch { return [] } }).find((e) => e.type === 'run_end')
  if (!end) throw new Error('Kane CLI returned no result. Is it installed and signed in? (npm i -g @testmuai/kane-cli && kane-cli login)')
  const passed = end.status === 'passed'
  const summary = [
    `Objective: ${objective}`,
    `Kane: ${end.status}${end.reason ? ` (${end.reason})` : ''}`,
    end.summary,
    !passed && end.verdict?.root_cause && `Root cause (${end.verdict.family}): ${end.verdict.root_cause}`,
  ].filter(Boolean).join('\n')
  return { passed, summary, kaneFault: !passed && end.verdict?.family === 'automation_bug' }
}

async function report(c: Config, postId: number, v: Verdict) {
  const changelog = v.passed ? read(CHANGELOG) || undefined : undefined
  await api(c)(`/posts/${postId}/runs`, { passed: v.passed, summary: v.summary, changelog })
  console.log(v.passed ? '  ✓ Kane passed. Post shipped, changelog published.' : '  ✗ Kane failed. Report attached to the post.')
}

async function init() {
  if (existsSync(CONFIG_FILE) && (await ask(`${CONFIG_FILE} exists. Overwrite? [y/N]`)).toLowerCase() !== 'y') return
  const board = await ask('Your board URL, e.g. https://hearloop.app/acme:')
  boardApi(board)
  const app = await ask('URL of the app Kane should test:', 'http://localhost:3000')
  const agent = await ask(`Coding agent [${Object.keys(AGENTS).join(' | ')} | manual | "cmd {prompt}"]:`, 'claude')
  const build = await ask('Build command (empty for none):')
  const deploy = await ask('Deploy command before Kane tests (empty for none):')
  const c: Config = { board, app, agent, ...(build && { build }), ...(deploy && { deploy }) }
  writeFileSync(CONFIG_FILE, JSON.stringify(c, null, 2) + '\n')
  if (existsSync('.gitignore') && !read('.gitignore').split('\n').includes(DIR)) appendFileSync('.gitignore', `\n${DIR}\n`)
  console.log(`Wrote ${CONFIG_FILE}. Next: HEARLOOP_TOKEN=hl_… npx hearloop run`)
}

async function implement(c: Config, post: Post, failure?: string) {
  const prompt = buildPrompt(post, { app: c.app, build: c.build, failure })
  writeFileSync(`${DIR}/prompt.md`, prompt + '\n')
  if (c.agent === 'manual') {
    console.log(`\n${prompt}\n\n(also in ${DIR}/prompt.md)`)
    await ask('Build it, then press Enter.')
    if (!read(OBJECTIVE)) writeFileSync(OBJECTIVE, await ask('What should Kane check? (one plain-English browser test):'))
    return
  }
  console.log(`  ${c.agent} is building…`)
  if ((await sh(agentCommand(c.agent), { HEARLOOP_PROMPT: prompt }, agentEnv)) !== 0) throw new Error(`agent "${c.agent}" exited with an error`)
  if (read(OBJECTIVE).startsWith('REFUSED')) throw new Error(`the agent refused this request: ${read(OBJECTIVE)}`)
  if (c.build) await must(c.build, 'build')
}

async function run(postArg?: string) {
  const c = loadConfig(configPath)
  const call = api(c)
  mkdirSync(DIR, { recursive: true })
  // Only Planned posts: a member approved them. Open posts are raw public input and never reach an agent unasked.
  let post: Post | undefined
  if (postArg) post = (await call(`/posts/${postArg}`)).post as Post
  else post = (await call('/posts?status=planned'))[0] // sorted by votes
  if (!post) return console.log('Nothing planned. Move a request to Planned on your board to build it.')
  console.log(`▶ #${post.id} ${post.title} (${post.votes} votes)`)

  // claim it (another loop gets a 409), and keep the lease alive while we work
  try {
    await call(`/posts/${post.id}/claim`, {})
  } catch (e) {
    if (e instanceof Conflict) return console.log(`  ${e.message} Pick another with --post <id>.`)
    throw e
  }
  const renew = setInterval(() => call(`/posts/${post.id}/claim`, {}).catch(() => {}), 60_000)
  try {
    await attempts(c, post)
  } catch (e) {
    // never leave a post stuck in "building"
    await call(`/posts/${post.id}/release`, {}).catch(() => {})
    throw e
  } finally {
    clearInterval(renew)
  }
}

async function attempts(c: Config, post: Post) {
  const call = api(c)
  let failure: string | undefined
  let rebuild = true
  for (let attempt = 1; attempt <= (c.maxTries ?? 3); attempt++) {
    if (attempt > 1) await call(`/posts/${post.id}/claim`, {}) // a failed report released it to planned
    console.log(`  attempt ${attempt}`)
    if (rebuild) {
      for (const f of [OBJECTIVE, CHANGELOG]) writeFileSync(f, '')
      await implement(c, post, failure)
      if (c.deploy) await must(c.deploy, 'deploy')
    } else console.log('  re-running Kane on the same build')
    const objective = read(OBJECTIVE)
    if (!objective) throw new Error(`No objective in ${OBJECTIVE}; the agent must write one.`)
    console.log(`  Kane verifying: ${objective}`)
    const v = kane(c, objective)
    await report(c, post.id, v)
    if (v.passed) return console.log('  Review the diff and commit when ready.')
    rebuild = !v.kaneFault
    if (v.kaneFault) console.log('  Kane blamed its own automation, not the app. Retrying the test.')
    else failure = v.summary
  }
  console.log('Gave up. The post is back in Planned with every Kane report attached.')
  process.exitCode = 1
}

async function verify(postArg?: string, objectiveArg?: string) {
  const c = loadConfig(configPath)
  const id = Number(postArg)
  if (!Number.isInteger(id)) throw new Error('Usage: hearloop verify <post id> [objective]')
  mkdirSync(DIR, { recursive: true })
  const objective = objectiveArg ?? read(OBJECTIVE)
  if (!objective) throw new Error(`Pass an objective or write one to ${OBJECTIVE}.`)
  await api(c)(`/posts/${id}/claim`, {}) // only the claim holder can report
  const v = kane(c, objective)
  await report(c, id, v)
  if (!v.passed) process.exitCode = 1
}

const argv = process.argv.slice(2)
const flag = (n: string) => (argv.includes(n) ? argv.splice(argv.indexOf(n), 2)[1] : undefined)
const configPath = flag('--config') ?? CONFIG_FILE
const post = flag('--post')
const [cmd, ...rest] = argv
try {
  if (cmd === 'init') await init()
  else if (cmd === 'run') await run(post)
  else if (cmd === 'verify') await verify(rest[0], rest[1])
  else console.log(HELP)
} catch (e) {
  console.error(`hearloop: ${(e as Error).message}`)
  process.exitCode = 1
}
