import { Link, createFileRoute } from '@tanstack/react-router'
import { listChangelog } from '#/lib/fns'

export const Route = createFileRoute('/changelog')({
  loader: () => listChangelog(),
  component: Changelog,
})

function Changelog() {
  const entries = Route.useLoaderData()
  return (
    <main className="page-wrap px-4 pb-8 pt-10">
      <h1 className="mb-2 text-3xl font-bold tracking-tight">Changelog</h1>
      <p className="mb-6 text-[var(--sea-ink-soft)]">Every entry here passed a Kane CLI verification before it was published.</p>
      {entries.length === 0 ? (
        <p className="text-[var(--sea-ink-soft)]">Nothing shipped yet.</p>
      ) : (
        <ul className="m-0 grid list-none gap-4 p-0">
          {entries.map((e) => (
            <li key={e.id} data-testid="entry" className="island-shell rounded-2xl p-5">
              <p className="m-0 text-xs text-[var(--sea-ink-soft)]">{new Date(e.created_at * 1000).toLocaleDateString()} · Verified with Kane CLI</p>
              <h2 className="my-1 text-lg font-semibold">
                <Link to="/posts/$id" params={{ id: String(e.post_id) }} className="text-[var(--sea-ink)]">{e.title}</Link>
              </h2>
              <p className="m-0 whitespace-pre-wrap text-sm">{e.body}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
