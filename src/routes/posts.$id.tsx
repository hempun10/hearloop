import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import StatusPill, { STATUS_LABEL } from '#/components/StatusPill'
import VoteButton from '#/components/VoteButton'
import { STATUSES } from '#/lib/types'
import { getPost } from '#/lib/fns'
import { ago } from '#/lib/time'

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
  const step = STATUSES.indexOf(post.status)
  return (
    <main className="mx-auto flex max-w-[1008px] flex-col gap-12 px-4 pt-10 md:flex-row md:px-0">
      <section className="min-w-0 flex-1 md:max-w-[720px]">
        <Link to="/board" className="text-[13px] text-muted hover:text-fg">← Board</Link>
        <div className="mt-5 flex items-start gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="m-0 text-[24px] font-semibold">{post.title}</h1>
            <p className="mt-2 mb-0 text-[12px] text-faint tabular-nums">Posted {ago(post.created_at)} ago</p>
          </div>
          <VoteButton id={post.id} count={post.votes} />
        </div>
        {post.body && <p className="mt-5 whitespace-pre-wrap text-[15px] leading-7 text-muted">{post.body}</p>}

        <ol className="mt-8 flex list-none items-center gap-0 p-0" aria-label="Status timeline">
          {STATUSES.map((s, i) => (
            <li key={s} className="flex flex-1 items-center gap-2 last:flex-none">
              <span className={`size-2 shrink-0 rounded-full ${i <= step ? `bg-${s}` : 'bg-line-strong'}`}
                style={i === step ? { boxShadow: `0 0 0 4px color-mix(in oklch, var(--color-${s}) 20%, transparent)` } : undefined} />
              <span className={`text-[12px] ${i <= step ? 'text-fg' : 'text-faint'}`}>{STATUS_LABEL[s]}</span>
              {i < STATUSES.length - 1 && <span className="mx-2 h-px flex-1 bg-line" />}
            </li>
          ))}
        </ol>

        <h2 className="mt-12 mb-3 text-[15px] font-semibold">Kane CLI verifications</h2>
        {runs.length === 0 ? (
          <p className="border-t border-line pt-4 text-[14px] text-muted">Not verified yet. It ships once a Kane run passes.</p>
        ) : (
          <ol className="m-0 list-none p-0" aria-label="Verifications">
            {runs.map((r) => (
              <li key={r.id} data-testid="run" className="border-t border-line py-4">
                <p className="m-0 flex items-center gap-2 text-[13px] font-medium">
                  <span className={`size-1.5 rounded-full ${r.passed ? 'bg-shipped' : 'bg-planned'}`} />
                  {r.passed ? 'Passed' : 'Failed'}
                  <span className="font-normal text-faint tabular-nums">{ago(r.created_at)} ago</span>
                </p>
                {r.summary && <pre className="mt-2 mb-0 overflow-x-auto rounded-lg bg-surface p-3 font-mono text-[12px] leading-5 whitespace-pre-wrap text-muted">{r.summary}</pre>}
              </li>
            ))}
          </ol>
        )}
      </section>

      <aside className="w-full shrink-0 text-[13px] md:w-[240px]">
        <p className="mb-2 text-[12px] font-medium text-muted">Details</p>
        <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
          <dt className="text-faint">Status</dt><dd className="m-0"><StatusPill status={post.status} chip /></dd>
          <dt className="text-faint">Votes</dt><dd className="m-0 tabular-nums">{post.votes}</dd>
          <dt className="text-faint">Kane runs</dt><dd className="m-0 tabular-nums">{runs.length}</dd>
        </dl>
      </aside>
    </main>
  )
}
