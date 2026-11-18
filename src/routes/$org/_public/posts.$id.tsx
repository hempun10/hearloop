import { useSuspenseQuery } from '@tanstack/react-query'
import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { StatusBadge } from '#/features/posts/components/status-badge'
import { StatusTimeline } from '#/features/posts/components/status-timeline'
import { VoteButton } from '#/features/posts/components/vote-button'
import { postQuery } from '#/features/posts/post.queries'
import { RunReport, RunResult } from '#/features/runs/components/run-result'
import { timeAgo } from '#/lib/format'

export const Route = createFileRoute('/$org/_public/posts/$id')({
  loader: async ({ context, params }) => {
    const data = await context.queryClient.query(postQuery(params.org, Number(params.id)))
    if (!data) throw notFound()
  },
  component: PostPage,
})

function PostPage() {
  const { org, id } = Route.useParams()
  const { data } = useSuspenseQuery(postQuery(org, Number(id)))
  if (!data) return null
  const { post, runs } = data

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-12 px-4 pt-10 md:flex-row md:px-0">
      <section className="min-w-0 flex-1 md:max-w-[720px]">
        <Link to="/$org" params={{ org }} className="inline-flex items-center gap-1 text-[13px] text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-3.5" /> Board
        </Link>
        <div className="mt-5 flex items-start gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-semibold">{post.title}</h1>
            <p className="mt-2 text-xs text-faint">Posted {timeAgo(post.createdAt)}</p>
          </div>
          <VoteButton org={org} post={post} />
        </div>
        {post.body && <p className="mt-5 text-[15px] leading-7 whitespace-pre-wrap text-muted-foreground">{post.body}</p>}

        <div className="mt-8"><StatusTimeline status={post.status} /></div>

        <h2 className="mt-12 mb-3 text-[15px] font-semibold">Kane CLI verifications</h2>
        {runs.length === 0 ? (
          <p className="border-t pt-4 text-sm text-muted-foreground">Not verified yet. It ships once a Kane run passes.</p>
        ) : (
          <ol aria-label="Verifications">
            {runs.map((r) => (
              <li key={r.id} data-testid="run" className="border-t py-4">
                <p className="flex items-center gap-2">
                  <RunResult passed={r.passed} />
                  <span className="text-[13px] text-faint">{timeAgo(r.createdAt)}</span>
                </p>
                {r.summary && <RunReport summary={r.summary} className="mt-2" />}
              </li>
            ))}
          </ol>
        )}
      </section>

      <aside className="w-full shrink-0 text-[13px] md:w-60">
        <p className="mb-2 text-xs font-medium text-muted-foreground">Details</p>
        <dl className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-2">
          <dt className="text-faint">Status</dt><dd><StatusBadge status={post.status} /></dd>
          <dt className="text-faint">Votes</dt><dd className="tabular-nums">{post.votes}</dd>
          <dt className="text-faint">Kane runs</dt><dd className="tabular-nums">{runs.length}</dd>
        </dl>
      </aside>
    </main>
  )
}
