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
cp .dev.vars.example .dev.vars   # set BETTER_AUTH_SECRET (openssl rand -hex 32)
bun run db:migrate
bun run dev                      # http://localhost:3000
```

Sign up, name your board (it lives at `/<your-org>`), then generate a loop token in Settings.
Boards are public to read, post and vote; only members see Settings.

## The loop

```bash
ORG=acme API_TOKEN=hl_… bun run loop                      # local
set -a; . ./.prod.local; set +a; bun run loop --deploy   # live: APP_URL, ORG, API_TOKEN; deploys, then Kane tests the live URL
```

Kane CLI needs a Chromium. If Chrome isn't installed, set `KANE_CLI_CHROME_PATH`.
If Kane blames its own automation (`verdict.family: automation_bug`), the loop re-runs Kane instead of asking the agent to change working code.

## Kane test suite

Tests live in `kane/<area>/*_test.md`, one folder per Test Manager folder (see `kane/suite.ts`):
01 Smoke, 02 Auth, 03 Orgs & onboarding, 04 Public board, 05 Roadmap & changelog, 06 Dashboard, 07 Branding & access, 08 Loop verifications.

```bash
bun run e2e:seed            # reset the fixture: e2e@hearloop.test owning /acme (password in .testmuai/variables/e2e.json)
bun run kane run smoke      # replay one area (cheap, uses the recorded steps)
bun run kane run all
bun run kane record <area>  # record tests added to kane/suite.ts, filed into that area's folder
```

Every objective starts at `{{base_url}}`, so the same recordings run against any deployment.
The loop files its Kane runs under 08 Loop verifications.

## Deploy

```bash
bunx wrangler d1 create hearloop-v2            # put the id in wrangler.jsonc
bun run db:migrate:remote
bun run deploy
bunx wrangler secret put BETTER_AUTH_SECRET    # and set BETTER_AUTH_URL in wrangler.jsonc vars
```

## Agent API

Every path is scoped to an org. Reads are public. Writes need `Authorization: Bearer <org token>`.

| Method | Path | Body |
|---|---|---|
| GET | `/api/:org/posts?status=open` | |
| GET | `/api/:org/posts/:id` | |
| POST | `/api/:org/posts/:id/status` | `{"status":"building"}` |
| POST | `/api/:org/posts/:id/runs` | `{"passed":true,"summary":"…","changelog":"…"}` |
| GET | `/api/:org/changelog` | |

## Stack

TanStack Start, Cloudflare Workers, D1, Tailwind.
