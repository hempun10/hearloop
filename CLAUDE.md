# hearloop

Bun workspaces + Turborepo monorepo.

```
apps/
  web/                  @hearloop/web   boards, dashboard, agent API (TanStack Start on Cloudflare Workers + D1). Conventions: apps/web/CLAUDE.md
  docs/                 @hearloop/docs  Fumadocs site, content in apps/docs/content/docs (own Worker)
packages/
  ui/                   @hearloop/ui    shadcn primitives, magic/ motion components, brand-mark, cn(), globals.css (theme tokens)
  typescript-config/    @hearloop/typescript-config  base.json, react.json
```

## Where code goes

- Used by more than one app, or a design-system piece → `packages/ui`. App features stay in the app.
- Import shared code through package exports: `@hearloop/ui/components/button`, `@hearloop/ui/lib/utils`, `@hearloop/ui/globals.css`. Never `../../packages/...`.
- Internal packages are just-in-time: they export TypeScript source, no build step.
- New shadcn component: run `bunx shadcn@latest add <name>` in `apps/web`; it installs into `packages/ui`.
- Every package's tsconfig extends `@hearloop/typescript-config`; every package declares the deps it imports.
- Coding agents build requests through the MCP server (`/mcp`). A repo's `hearloop.json` names its board and app URL: `apps/web/hearloop.json` (local), `hearloop.prod.json` (live).
- Cross-app links use env: `VITE_DOCS_URL` (web), `VITE_WEB_URL` (docs), in each app's `.env.development` / `.env.production`.

## Commands (root)

`bun run dev` (web :3000, docs :3001) · `build` · `typecheck` · `test` · `check` · `deploy:web` · `deploy:docs` · `kane run|record <area>` · `e2e:seed` · `db:migrate`

## Check

`bun run check && bun run build`, then `bun run kane run <area>` for the app area you touched.

Before any Kane CLI command, read https://www.testmuai.com/kane-cli-agent/AGENTS.md and follow it.

Testing and the development process (Kane CLI requirements → designed tests → coverage, bugs through the board, branches and PRs): follow `apps/web/CLAUDE.md` § Testing with Kane CLI, every time.
