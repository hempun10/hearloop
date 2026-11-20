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

MCP server (`/mcp`, `features/mcp`): `bun run e2e:seed && bun run e2e:mcp` checks every protocol edge case; the Kane `mcp` area needs `bun run e2e:mcp --prep` after the seed (fresh OAuth clients each run).
