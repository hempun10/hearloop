#!/usr/bin/env bun
// The closed loop: top request -> coding agent builds it -> Kane CLI verifies -> shipped or retried.
// Usage: APP_URL=http://localhost:3000 API_TOKEN=dev-token bun scripts/loop.ts [--deploy] [--post <id>]
import { $ } from 'bun'

const APP_URL = process.env.APP_URL ?? 'http://localhost:3000'
const TOKEN = process.env.API_TOKEN ?? 'dev-token'
const MAX_TRIES = Number(process.env.MAX_TRIES ?? 3)
const args = process.argv.slice(2)
const deploy = args.includes('--deploy')
const pick = args.includes('--post') ? Number(args[args.indexOf('--post') + 1]) : undefined

type Post = { id: number; title: string; body: string; status: string; votes: number }

async function api(path: string, body?: unknown) {
  const res = await fetch(APP_URL + '/api' + path, body === undefined ? {} : {
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
    `Then write .hearloop/kane-objective.txt: one plain-English browser test, starting from the board page,`,
    `that a tester could follow to prove the feature works (what to click/type and what must be visible).`,
    `Also write .hearloop/changelog.md: two sentences for users announcing the change. Do not commit.`,
  ].filter(Boolean).join('\n')
  await $`mkdir -p .hearloop`
  await $`claude -p ${prompt} --permission-mode acceptEdits --allowedTools "Bash(bun run build) Bash(bun run build:*) Read Edit Write Glob Grep"`
}

type KaneResult = { passed: boolean; summary: string }

// ponytail: verdict parsed from Kane's NDJSON by event/field names; tighten once the schema is pinned
async function verify(objective: string): Promise<KaneResult> {
  const out = await $`kane-cli run ${objective} --agent --headless --url ${APP_URL} --timeout 300 --mode testing`.nothrow().text()
  const events = out.split('\n').flatMap((l) => { try { return [JSON.parse(l)] } catch { return [] } })
  const end = events.findLast((e) => /run_end|result|complete/i.test(String(e.type ?? e.event ?? '')))
  const status = String(end?.status ?? end?.result ?? end?.verdict ?? '').toLowerCase()
  const passed = end?.passed === true || end?.success === true || /^(pass|passed|success|succeeded)$/.test(status)
  const summary = [
    `Objective: ${objective}`,
    `Verdict: ${passed ? 'passed' : 'failed'}${status ? ` (${status})` : ''}`,
    end?.summary ?? end?.message ?? end?.reason ?? '',
  ].filter(Boolean).join('\n')
  await Bun.write(`.hearloop/kane-${Date.now()}.ndjson`, out)
  return { passed, summary }
}

const post = await nextPost()
if (!post) {
  console.log('Nothing open or planned. Board is clear.')
  process.exit(0)
}
console.log(`▶ #${post.id} ${post.title} (${post.votes} votes)`)

let failure: string | undefined
for (let attempt = 1; attempt <= MAX_TRIES; attempt++) {
  await api(`/posts/${post.id}/status`, { status: 'building' })
  console.log(`  attempt ${attempt}: agent building…`)
  await build(post, failure)
  if (deploy) await $`bun run deploy`
  const objective = (await Bun.file('.hearloop/kane-objective.txt').text()).trim()
  console.log(`  Kane verifying: ${objective}`)
  const r = await verify(objective)
  const changelog = r.passed ? (await Bun.file('.hearloop/changelog.md').text().catch(() => post.title)).trim() : undefined
  await api(`/posts/${post.id}/runs`, { passed: r.passed, summary: r.summary, changelog })
  if (r.passed) {
    await $`git add -A -- . ':!.hearloop' && git commit -qm ${`Ship #${post.id}: ${post.title}\n\nVerified with Kane CLI.`}`.nothrow()
    console.log(`  ✓ shipped. Changelog published.`)
    process.exit(0)
  }
  console.log(`  ✗ Kane failed. Feeding the report back to the agent.`)
  failure = r.summary
}
console.log(`Gave up after ${MAX_TRIES} attempts. Post is back in planned with every Kane report attached.`)
process.exit(1)
