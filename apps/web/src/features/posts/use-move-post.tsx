import { useState } from 'react'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@hearloop/ui/components/alert-dialog'
import type { Post } from '#/db/schema'
import { type StatusOption, statusKey } from './status'
import { useSetPostStatus } from './use-post-mutations'

const heldByAgent = (p: Post) => p.claimTokenId !== null && !!p.claimExpiresAt && new Date(p.claimExpiresAt) > new Date()

/** Moves a post by hand; asks first when a coding agent is building it, since moving drops its claim. Render `dialog` once. */
export function useMovePost(org: string) {
  const setStatus = useSetPostStatus(org)
  const [pending, setPending] = useState<{ post: Post; to: StatusOption } | null>(null)

  const move = (post: Post, to: StatusOption) => {
    if (statusKey(post) === to.key) return
    if (heldByAgent(post)) setPending({ post, to })
    else setStatus.mutate({ id: post.id, to })
  }

  const dialog = (
    <AlertDialog open={!!pending} onOpenChange={(open) => !open && setPending(null)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{pending?.post.claimedBy ?? 'A coding agent'} is building this</AlertDialogTitle>
          <AlertDialogDescription>
            Moving it stops that work. “{pending?.post.title}” goes to {pending?.to.label}, and the agent sees the change on its next check-in.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => pending && setStatus.mutate({ id: pending.post.id, to: pending.to })}>Move it</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )

  return { move, dialog }
}
