# hearloop v2

A feedback board that closes its own loop. Built for the KaneCLI Online Hackathon (Nov 2026).

1. Users post requests and vote on them.
2. A coding agent picks up the top request and builds it.
3. Kane CLI verifies the feature in a real browser.
4. Pass: the post moves to **shipped** and a changelog entry is published. Fail: the post goes back to **planned** with Kane's report, and the agent tries again.

Nothing reaches the changelog without a passing Kane run.

## Run locally

```bash
bun install
cp .dev.vars.example .dev.vars   # set API_TOKEN
bun run db:migrate
bun run dev                      # http://localhost:3000
```

## The loop

```bash
bun run loop                                   # local: http://localhost:3000, token from .dev.vars
set -a; . ./.prod.local; set +a; bun run loop --deploy   # live: builds, deploys, then Kane tests the live URL
```

Kane CLI needs a Chromium. If Chrome isn't installed, set `KANE_CLI_CHROME_PATH`.
If Kane blames its own automation (`verdict.family: automation_bug`), the loop re-runs Kane instead of asking the agent to change working code.

## Deploy

```bash
bunx wrangler d1 create hearloop-v2            # put the id in wrangler.jsonc
bun run db:migrate:remote
bun run deploy
bunx wrangler secret put API_TOKEN
```

## Agent API

Reads are public. Writes need `Authorization: Bearer $API_TOKEN`.

| Method | Path | Body |
|---|---|---|
| GET | `/api/posts?status=open` | |
| GET | `/api/posts/:id` | |
| POST | `/api/posts/:id/status` | `{"status":"building"}` |
| POST | `/api/posts/:id/runs` | `{"passed":true,"summary":"…","changelog":"…"}` |
| GET | `/api/changelog` | |

## Stack

TanStack Start, Cloudflare Workers, D1, Tailwind.
