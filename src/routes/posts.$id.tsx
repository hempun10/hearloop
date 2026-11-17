import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import StatusPill from '#/components/StatusPill'
import { getPost } from '#/lib/fns'

export const Route = createFileRoute('/posts/$id')({
  loader: async ({ params }) => {
    const r = await getPost({ data: Number(params.id) })
    if (!r) throw notFound()
    return r
  },
  component: PostPage,
})

function PostPage() {
  const { post, runs } = Route.useLoaderData()
  return (
    <main className="page-wrap px-4 pb-8 pt-10">
      <Link to="/" className="text-sm text-[var(--sea-ink-soft)]">← Board</Link>
      <div className="mt-4 flex items-center gap-3">
        <h1 className="m-0 text-2xl font-bold tracking-tight">{post.title}</h1>
        <StatusPill status={post.status} />
      </div>
      <p className="text-sm text-[var(--sea-ink-soft)]">{post.votes} votes</p>
      {post.body && <p className="whitespace-pre-wrap">{post.body}</p>}

      <h2 className="mt-10 text-lg font-semibold">Kane CLI verifications</h2>
      {runs.length === 0 ? (
        <p className="text-sm text-[var(--sea-ink-soft)]">Not verified yet.</p>
      ) : (
        <ol className="m-0 grid list-none gap-3 p-0" aria-label="Verifications">
          {runs.map((r) => (
            <li key={r.id} data-testid="run" className="island-shell rounded-xl p-4">
              <p className="m-0 font-semibold">
                {r.passed ? '✅ Passed' : '❌ Failed'}{' '}
                <span className="text-sm font-normal text-[var(--sea-ink-soft)]">{new Date(r.created_at * 1000).toLocaleString()}</span>
              </p>
              {r.summary && <pre className="mt-2 overflow-x-auto whitespace-pre-wrap text-xs">{r.summary}</pre>}
            </li>
          ))}
        </ol>
      )}
    </main>
  )
}
