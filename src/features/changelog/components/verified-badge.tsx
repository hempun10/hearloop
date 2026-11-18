import { Link } from '@tanstack/react-router'
import { cn } from '#/lib/utils'

/** Links a changelog entry back to the post whose Kane run proved it. */
export function VerifiedBadge({ org, postId, className }: { org: string; postId: number; className?: string }) {
  return (
    <Link to="/$org/posts/$id" params={{ org, id: String(postId) }}
      className={cn('inline-flex items-center gap-1.5 rounded-md bg-status-shipped/10 px-2 py-0.5 text-xs font-medium text-foreground hover:bg-status-shipped/20', className)}>
      <span className="size-1.5 rounded-full bg-status-shipped" />
      Verified with Kane CLI · from post #{postId}
    </Link>
  )
}
