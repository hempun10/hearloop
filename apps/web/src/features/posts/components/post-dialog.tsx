import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { ChevronUp, ExternalLink } from 'lucide-react'
import { Suspense, useState } from 'react'
import { Button } from '@hearloop/ui/components/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@hearloop/ui/components/dialog'
import { Skeleton } from '@hearloop/ui/components/skeleton'
import { useSession } from '#/features/auth/use-session'
import { Comments } from '#/features/comments/components/comments'
import { postQuery } from '../post.queries'
import { EditPostForm } from './edit-post-form'
import { PostProperties } from './post-properties'
import { timeAgo } from '#/lib/format'

/** A request opened from the roadmap: details and comments on the left, properties on the right, as in Linear. */
export function PostDialog({ org, id, onClose }: { org: string; id: number | undefined; onClose: () => void }) {
  return (
    <Dialog open={!!id} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[88vh] gap-0 overflow-hidden p-0 sm:max-w-4xl">
        {id && <Body org={org} id={id} />}
      </DialogContent>
    </Dialog>
  )
}

function Body({ org, id }: { org: string; id: number }) {
  const { data, isPending } = useQuery(postQuery(org, id))
  const session = useSession()
  const [editing, setEditing] = useState(false)
  if (isPending) return <div className="p-8"><DialogTitle className="sr-only">Loading</DialogTitle><Skeleton className="h-8 w-2/3" /><Skeleton className="mt-4 h-24" /></div>
  if (!data) return <p className="p-8 text-sm text-muted-foreground"><DialogTitle>That request is gone.</DialogTitle></p>
  const { post, tags } = data
  return (
    <div className="flex max-h-[88vh] flex-col md:flex-row">
      <section className="min-w-0 flex-1 overflow-y-auto px-8 pt-8 pb-8">
        {editing ? <EditPostForm org={org} post={post} onDone={() => setEditing(false)} /> : (
          <>
            <DialogTitle className="text-2xl font-semibold">{post.title}</DialogTitle>
            <DialogDescription asChild>
              <p className="mt-4 text-[15px] leading-7 whitespace-pre-wrap text-muted-foreground">{post.body || <span className="text-faint">No description.</span>}</p>
            </DialogDescription>
            <p className="mt-4 flex items-center gap-3 text-xs text-faint">
              Posted {timeAgo(post.createdAt)}
              <Button variant="link" size="sm" className="h-auto p-0 text-xs" onClick={() => setEditing(true)}>Edit</Button>
            </p>
          </>
        )}
        <Suspense fallback={<Skeleton className="mt-12 h-20" />}>
          <Comments org={org} postId={post.id} signedIn={!!session} isMember />
        </Suspense>
      </section>
      <aside aria-label="Properties" className="w-full shrink-0 overflow-y-auto border-t bg-card/40 px-5 pt-8 pb-6 text-[13px] md:w-64 md:border-t-0 md:border-l">
        <Suspense fallback={<Skeleton className="h-40" />}><PostProperties org={org} post={post} tags={tags} /></Suspense>
        <div className="mt-6 grid gap-3 px-2">
          <p className="flex items-center gap-1.5 text-muted-foreground"><ChevronUp className="size-3.5" strokeWidth={2.5} /><span className="tabular-nums">{post.votes}</span> votes</p>
          <Link to="/$org/posts/$id" params={{ org, id: String(post.id) }} target="_blank" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground">
            <ExternalLink className="size-3.5" />Open public page
          </Link>
        </div>
      </aside>
    </div>
  )
}
