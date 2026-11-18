#!/usr/bin/env bun
// The closed loop: top request -> coding agent builds it -> Kane CLI verifies -> shipped or retried.
// Usage: APP_URL=http://localhost:3000 ORG=demo API_TOKEN=<org token from Settings> bun scripts/loop.ts [--deploy] [--post <id>]
import { $ } from 'bun'
import { FOLDERS } from '../kane/suite'

// Kane needs a Chromium; point KANE_CLI_CHROME_PATH at one if Chrome isn't installed (e.g. Helium)
process.env.KANE_CLI_CHROME_PATH ??= '/Applications/Helium.app/Contents/MacOS/Helium'

const APP_URL = process.env.APP_URL ?? 'http://localhost:3000'
const ORG = process.env.ORG ?? 'demo'
const TOKEN = process.env.API_TOKEN ?? 'dev-token'
const BOARD = `${APP_URL}/${ORG}`
const MAX_TRIES = Number(process.env.MAX_TRIES ?? 3)
const args = process.argv.slice(2)
const deploy = args.includes('--deploy')
const pick = args.includes('--post') ? Number(args[args.indexOf('--post') + 1]) : undefined

type Post = { id: number; title: string; body: string; status: string; votes: number }

async function api(path: string, body?: unknown): Promise<any> {
  const res = await fetch(`${APP_URL}/api/${ORG}${path}`, body === undefined ? {} : {
    method: 'POST',
    headers: { authorization: `Bearer ${TOKEN}`, 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`${path}: ${res.status} ${await res.text()}`)
  return res.json()
}

async function nextPost(): Promise<Post | undefined> {
  if (pick) return (await api(`/posts/${pick}`)).post
  const [planned, open] = await Promise.all([api('/posts?status=planned'), api('/posts?status=open')])
  return [...planned, ...open][0] // each list is already sorted by votes
}

// The agent implements the request and writes a Kane objective that proves it.
async function build(post: Post, failure?: string) {
  const prompt = [
    `You are working in the hearloop-v2 repo (TanStack Start on Cloudflare Workers + D1). Read README.md first.`,
    `Implement this user request from the feedback board:`,
    `Title: ${post.title}`,
    post.body && `Details: ${post.body}`,
    failure && `Your previous attempt FAILED Kane CLI verification. Kane reported:\n${failure}\nFix it.`,
    `Keep the change small and in the existing style. Run \`bun run build\` and fix any errors.`,
    `Then write .hearloop/kane-objective.txt: one plain-English browser test, starting from the board page (/${ORG}),`,
    `that a tester could follow to prove the feature works (what to click/type and what must be visible).`,
    `Also write .hearloop/changelog.md: two sentences for users announcing the change. Do not commit.`,
  ].filter(Boolean).join('\n')
  await $`mkdir -p .hearloop`
  await $`claude -p ${prompt} --permission-mode acceptEdits --allowedTools "Bash(bun run build) Bash(bun run build:*) Read Edit Write Glob Grep"`
}

// kaneFault: Kane blamed its own automation, not the app, so rebuilding would "fix" working code
type KaneResult = { passed: boolean; summary: string; kaneFault: boolean }

// Kane --agent prints NDJSON; the last line is {"type":"run_end","status":"passed"|"failed",summary,reason,...}
async function verify(objective: string): Promise<KaneResult> {
  // file the run under "08 Loop verifications" in Test Manager, then put the profile's folder back
  const prev = JSON.parse(await $`kane-cli config show --agent`.text()).folder_id
  await $`kane-cli config folder ${process.env.KANE_FOLDER ?? FOLDERS.loop.id}`.quiet().nothrow()
  try {
    return await verifyIn(objective)
  } finally {
    if (prev) await $`kane-cli config folder ${prev}`.quiet().nothrow()
  }
}

async function verifyIn(objective: string): Promise<KaneResult> {
  const out = await $`kane-cli run ${objective} --agent --headless --url ${BOARD} --timeout 300 --max-steps 30`.nothrow().text()
  const events = out.split('\n').flatMap((l): any[] => { try { return [JSON.parse(l)] } catch { return [] } })
  const end = events.find((e: any) => e.type === 'run_end')
  const passed = end?.status === 'passed'
  const kaneFault = !passed && end?.verdict?.family === 'automation_bug'
  const summary = [
    `Objective: ${objective}`,
    `Kane: ${end?.status ?? 'no run_end'}${end?.reason ? ` (${end.reason})` : ''}`,
    end?.summary ?? out.slice(-1500),
    !passed && end?.verdict?.root_cause && `Root cause (${end.verdict.family}): ${end.verdict.root_cause}`,
  ].filter(Boolean).join('\n')
  await Bun.write(`.hearloop/kane-${Date.now()}.ndjson`, out)
  return { passed, summary, kaneFault }
}

const post = await nextPost()
if (!post) {
  console.log('Nothing open or planned. Board is clear.')
  process.exit(0)
}
console.log(`▶ #${post.id} ${post.title} (${post.votes} votes)`)

let failure: string | undefined
let rebuild = true
for (let attempt = 1; attempt <= MAX_TRIES; attempt++) {
  await api(`/posts/${post.id}/status`, { status: 'building' })
  if (rebuild) {
    console.log(`  attempt ${attempt}: agent building…`)
    await build(post, failure)
    if (deploy) await $`bun run deploy`
  } else console.log(`  attempt ${attempt}: re-running Kane on the same build`)
  const objective = (await Bun.file('.hearloop/kane-objective.txt').text()).trim()
  console.log(`  Kane verifying: ${objective}`)
  const r = await verify(objective)
  const changelog = r.passed ? (await Bun.file('.hearloop/changelog.md').text().catch(() => post.title)).trim() : undefined
  await api(`/posts/${post.id}/runs`, { passed: r.passed, summary: r.summary, changelog })
  if (r.passed) {
    await $`git add -A && git commit -qm ${`Ship #${post.id}: ${post.title}\n\nVerified with Kane CLI.`}`.nothrow()
    console.log(`  ✓ shipped. Changelog published.`)
    process.exit(0)
  }
  rebuild = !r.kaneFault
  if (r.kaneFault) console.log(`  ✗ Kane blamed its own automation, not the app. Retrying the test.`)
  else {
    console.log(`  ✗ Kane failed. Feeding the report back to the agent.`)
    failure = r.summary
  }
}
console.log(`Gave up after ${MAX_TRIES} attempts. Post is back in planned with every Kane report attached.`)
process.exit(1)
