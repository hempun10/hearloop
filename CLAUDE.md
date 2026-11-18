# hearloop-v2

TanStack Start (React 19) on Cloudflare Workers, D1 via Drizzle, Better Auth, shadcn/ui, TanStack Query. Bun.

## Structure

```
src/
  routes/                 thin: loader primes the query cache, guards in beforeLoad, page = feature components
  features/<domain>/      orgs, posts, changelog, runs, landing, auth, api
    <x>.schema.ts         zod schemas, shared by forms and server-function validators (client-safe)
    <x>.server.ts         Drizzle queries; server-only, never import from components
    <x>.functions.ts      createServerFn wrappers (validator + middleware); import .server lazily inside handlers
    <x>.queries.ts        queryOptions factories (query keys live here)
    use-*.ts              hooks: mutations with optimistic updates, shortcuts
    components/           feature UI
  components/ui/          shadcn primitives (add with `bunx shadcn@latest add <name>`; don't hand-roll inputs/dialogs)
  components/             app-wide pieces (headers, nav-link, page-header, user-menu)
  middleware/auth.ts      sessionMiddleware (user | null), authMiddleware (requires user)
  db/schema.ts            Drizzle schema (single source of types: Post, Org, Run…)
```

## Rules

- Forms: react-hook-form + zodResolver with the feature's schema, rendered with shadcn `Field`.
- Server functions validate input with zod and authorize in the handler (`requireMembership`); a route guard is only UX.
- Data in components comes from `useSuspenseQuery(xQuery(...))`; mutations invalidate or patch the cache.
- Icons from lucide-react; toasts via sonner; confirmations via AlertDialog, never `confirm()`.
- Colours via theme tokens (`bg-card`, `text-muted-foreground`, `text-faint`, `bg-brand`, `bg-status-shipped`), not hex.
- Schema change: edit `src/db/schema.ts`, `bun run db:generate`, `bun run db:migrate`.
- Keep visible labels stable: Kane tests in `kane/` find elements by their text.

## Check

`bunx tsc --noEmit && bun run build`, then `bun run kane run <area>` for the area you touched.
