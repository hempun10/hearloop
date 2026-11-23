# @hearloop/web

The hearloop app: boards, dashboard and the agent API. Docs are a separate app (`apps/docs`); shared UI is `@hearloop/ui`.

TanStack Start (React 19) on Cloudflare Workers, D1 via Drizzle, Better Auth, shadcn/ui, TanStack Query. Bun.

## Structure

```
src/
  routes/                 thin: loader primes the query cache, guards in beforeLoad, page = feature components
  features/<domain>/      orgs, posts, changelog, runs, landing, dashboard, auth, api
    <x>.schema.ts         zod schemas, shared by forms and server-function validators (client-safe)
    <x>.server.ts         Drizzle queries; server-only, never import from components
    <x>.functions.ts      createServerFn wrappers (validator + middleware); import .server lazily inside handlers
    <x>.queries.ts        queryOptions factories (query keys live here)
    use-*.ts              hooks: mutations with optimistic updates, shortcuts
    components/             app-wide pieces (site header/footer, back-button, user-menu). Primitives come from @hearloop/ui
  components/             app-wide pieces (site header/footer, back-button, user-menu); magic/ = Magic UI motion components
  middleware/auth.ts      sessionMiddleware (user | null), authMiddleware (requires user)
  db/schema.ts            Drizzle schema (single source of types: Post, Org, Run…)
```

## Rules

- Forms: react-hook-form + zodResolver with the feature's schema, rendered with shadcn `Field`.
- Server functions validate input with zod and authorize in the handler (`requireMembership`); a route guard is only UX.
- Data in components comes from `useSuspenseQuery(xQuery(...))`; mutations invalidate or patch the cache.
- Icons from lucide-react; toasts via sonner; confirmations via AlertDialog, never `confirm()`.
- UI primitives: `@hearloop/ui/components/<name>` (add new ones with `bunx shadcn@latest add <name>` here; they land in packages/ui). Don't hand-roll inputs/dialogs.
- Colours via theme tokens from `packages/ui/src/styles/globals.css` (`bg-card`, `text-muted-foreground`, `text-faint`, `bg-brand`, `bg-status-shipped`), not hex.
- Schema change: edit `src/db/schema.ts`, `bun run db:generate`, `bun run db:migrate`.
- Keep visible labels stable: Kane tests in `kane/` find elements by their text.

## Check

`bun run typecheck && bun run build` (from the repo root), then `bun run kane run <area>` for the area you touched.

## Testing with Kane CLI: follow this every time, without being asked

**Before you run any Kane CLI command, read [TestMu AI's agent guide](https://www.testmuai.com/kane-cli-agent/AGENTS.md) and follow it.** It is the source of truth for flags, exit codes and objectives. Where it and this file disagree on Kane CLI usage, the guide wins. Rules in this file about this repo still apply on top of it: approvals, the seed, memory and ports.

**People who run Kane themselves** can use `kane-cli --tui`, the interactive terminal app. It needs a real terminal, so agents always use `--agent` instead.

Any change to how the app behaves goes through this loop. The `kane-cli` skill has the details for each command.

1. **Requirement first.** Write the expected behaviour in `kane/requirements/<area>.md`: plain sentences with the labels users see. Never hand-write tests or Kane objectives for new behaviour.
2. **Give it to Kane.** A new file: `kane-cli context ingest kane/requirements/<area>.md --mode agent`. A changed file: `kane-cli maintain reconcile --from kane/requirements/<area>.md --source-id <area> --mode agent`.
3. **Checkpoint: the user approves the use-cases.** List them with `kane-cli context list --json --inferred`, show the titles, then `kane-cli context review --approve <refs>`. Never approve on the user's behalf.
4. **Design**, one use-case at a time: `kane-cli design tests --use-case <uc> --mode agent --max 4`. Never run two Kane commands that write the store at once.
5. **Checkpoint: the user approves the designed tests.** Show the test titles, gaps and the variables that need values, then record the decision with `kane-cli context review`.
6. **Test data.** Values for the variables Kane declares go in `scripts/seed-e2e.ts`, which writes `.testmuai/variables/assurance.json` (gitignored; passwords `secret: true`). Run `bun run e2e:seed` before every run.
7. **First run, then batches.** Run each new test once with `kane-cli testmd run .testmuai/tests/<t>_test.md --agent --headless`. After that, replay together: `kane-cli testrun run <paths> --agent --headless < /dev/null`.
8. **Coverage.** After a suite run, run `kane-cli cover gaps` and report the figure.
9. **A test fails: classify it before touching anything.**
   - App bug: post it on the board (hearloop's own loop), fix it, then rerun the failing test so it goes from fail to pass.
   - The requirement changed: update the requirements file, then `maintain reconcile`.
   - The test is wrong (no start page, wrong assertion, wrong data): `kane-cli maintain evolve <test-ref>` or `design tests --use-case <uc> --force`. Never edit a `_test.md` by hand.
   - Kane or the environment failed: say so, and don't rerun a paid command blindly.
   - Kane's verdict is a hint, not proof. An "automation_bug" can still be an app bug, so check the app.
   - Never weaken a test's expected result to get a pass.
   - A replayed recording doesn't prove a fix: it can pass before and after. After a fix, run a fresh check.
10. **Before a commit:** `bun run check`, then replay the suites for the areas you touched.
11. **CI** (`.github/workflows/ci.yml`) runs `check` and `build` on every PR, then replays every designed test against a fresh local app. It needs the repository secrets `LT_USERNAME` and `LT_ACCESS_KEY`.

The older objectives in `kane/suite.ts` (`bun run kane run|record <area>`) are regression replays. New behaviour goes through steps 1–9.

### Guardrails

- **Credits.** Say the cost before a paid step: design is about 15–20 credits a use-case, a first run about 25–45 a test, and replays are cheap.
- **Memory.** The machine has 16 GB. Run one browser at a time, always `--headless`, never in parallel. Check `memory_pressure` before each run and stop below 20% free.
- **Browser.** Helium: `KANE_CLI_CHROME_PATH=/Applications/Helium.app/Contents/MacOS/Helium` (`bun run kane` sets it).
- **Sleep.** Run long suites under `caffeinate -i`, and keep the lid open: a sleeping Mac stalls the dev server and expires Kane's sign-in mid-run.
- **Results.** When a failing command's output is cut off, read the verdict from Kane's own log, `~/.testmuai/kaneai/sessions/<id>/events.ndjson`.
- **Ports.** Test servers use 3002 and up. Never 4000s or 5174.
- **Git.** Commit each test's `output-<test>/` folder with its `_test.md`; replays need it. Never commit `.testmuai/evidence/` or `.testmuai/variables/`.

## Development process

- Work on a branch, never `main`. One commit per logical change. Open a PR and get a review before merging.
- Every bug is posted on the board, claimed, fixed, and shipped by a passing Kane verdict, just like a feature request.
- Migrations run locally only. Apply them to production, and deploy, only when the user asks. List new migrations in the commit message.

MCP server (`/mcp`, `features/mcp`): `bun run e2e:seed && bun run e2e:mcp` checks every protocol edge case; the Kane `mcp` area needs `bun run e2e:mcp --prep` after the seed (fresh OAuth clients each run).
