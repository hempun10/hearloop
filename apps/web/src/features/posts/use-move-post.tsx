import { useState } from 'react'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@hearloop/ui/components/alert-dialog'
import type { Post } from '#/db/schema'
import { STATUS_LABEL, type PostStatus } from './status'
import { useSetPostStatus } from './use-post-mutations'

const heldByAgent = (p: Post) => p.claimTokenId !== null && !!p.claimExpiresAt && new Date(p.claimExpiresAt) > new Date()

/** Moves a post by hand; asks first when a coding agent is building it, since moving drops its claim. Render `dialog` once. */
export function useMovePost(org: string) {
  const setStatus = useSetPostStatus(org)
  const [pending, setPending] = useState<{ post: Post; status: PostStatus } | null>(null)

  const move = (post: Post, status: PostStatus) => {
    if (post.status === status) return
    if (heldByAgent(post)) setPending({ post, status })
    else setStatus.mutate({ id: post.id, status })
  }

  const dialog = (
    <AlertDialog open={!!pending} onOpenChange={(open) => !open && setPending(null)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{pending?.post.claimedBy ?? 'A coding agent'} is building this</AlertDialogTitle>
          <AlertDialogDescription>
            Moving “{pending?.post.title}” to {pending && STATUS_LABEL[pending.status]} stops that work. The agent sees the change on its next check-in.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => pending && setStatus.mutate({ id: pending.post.id, status: pending.status })}>Move it</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )

  return { move, dialog }
}
