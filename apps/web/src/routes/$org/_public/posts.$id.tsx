import { useSuspenseQuery } from '@tanstack/react-query'
import { Link, createFileRoute, notFound, useNavigate } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { Button } from '@hearloop/ui/components/button'
import { EditPostForm } from '#/features/posts/components/edit-post-form'
import { Comments } from '#/features/comments/components/comments'
import { commentsQuery } from '#/features/comments/comment.queries'
import { useSession } from '#/features/auth/use-session'
import { orgQuery } from '#/features/orgs/org.queries'
import { MergePostDialog } from '#/features/posts/components/merge-post-dialog'
import { TagEditor, TagList } from '#/features/posts/components/post-tags'
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
    await context.queryClient.query(commentsQuery(params.org, Number(params.id)))
  },
  component: PostPage,
})

function PostPage() {
  const { org, id } = Route.useParams()
  const { data } = useSuspenseQuery(postQuery(org, Number(id)))
  const { data: board } = useSuspenseQuery(orgQuery(org))
  const session = useSession()
  const isMember = !!board?.isMember
  const [editing, setEditing] = useState(false)
  const navigate = useNavigate()
  const backToBoard = () => navigate({ to: '/$org', params: { org } })
  // Esc does what the Board link does (react-hotkeys-hook ignores it while typing in a field)
  useHotkeys('escape', backToBoard, [org])
  if (!data) return null
  const { post, runs, tags, mergedInto } = data
  const canEdit = !mergedInto && (isMember || (!!session && post.authorId === session.user.id && post.status === 'open'))

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-12 px-4 pt-10 md:flex-row md:px-0">
      <section className="min-w-0 flex-1 md:max-w-[720px]">
        <Link to="/$org" params={{ org }} onClick={(e) => { e.preventDefault(); backToBoard() }} className="inline-flex items-center gap-1 text-[13px] text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-3.5" /> Board
        </Link>
        {mergedInto && (
          <p role="status" className="mt-5 rounded-md border bg-card px-3 py-2 text-[13px] text-muted-foreground">
            Merged into <Link to="/$org/posts/$id" params={{ org, id: String(mergedInto.id) }} className="font-medium text-foreground underline">{mergedInto.title}</Link>. Vote and comment there.
          </p>
        )}
        {editing ? <EditPostForm org={org} post={post} onDone={() => setEditing(false)} /> : (
        <div className="mt-5 flex items-start gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-semibold">{post.title}</h1>
            <p className="mt-2 flex items-center gap-3 text-xs text-faint">
              Posted {timeAgo(post.createdAt)}
              {canEdit && <Button variant="link" size="sm" className="h-auto p-0 text-xs" onClick={() => setEditing(true)}>Edit</Button>}
            </p>
          </div>
          {!mergedInto && <VoteButton org={org} post={post} />}
        </div>
        )}
        {!isMember && tags.length > 0 && <div className="mt-3"><TagList tags={tags} /></div>}
        {!editing && post.body && <p className="mt-5 text-[15px] leading-7 whitespace-pre-wrap text-muted-foreground">{post.body}</p>}

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

        <Comments org={org} postId={post.id} signedIn={!!session} isMember={isMember} />
      </section>

      <aside className="w-full shrink-0 text-[13px] md:w-60">
        <p className="mb-2 text-xs font-medium text-muted-foreground">Details</p>
        <dl className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-2">
          <dt className="text-faint">Status</dt><dd><StatusBadge status={post.status} />{post.status === 'building' && post.claimedBy ? <span className="ml-2 text-muted-foreground">by {post.claimedBy}</span> : null}</dd>
          <dt className="text-faint">Votes</dt><dd className="tabular-nums">{post.votes}</dd>
          <dt className="text-faint">Kane runs</dt><dd className="tabular-nums">{runs.length}</dd>
        </dl>
        {isMember && (
          <div className="mt-6 grid gap-4">
            <div>
              <p className="mb-2 text-xs font-medium text-muted-foreground">Tags</p>
              <TagEditor org={org} id={post.id} tags={tags} />
            </div>
            {!mergedInto && (post.status === 'open' || post.status === 'planned') && <MergePostDialog org={org} post={post} />}
          </div>
        )}
      </aside>
    </main>
  )
}
