import { Link } from '@tanstack/react-router'
import { cn } from '@hearloop/ui/lib/utils'

/** Links a changelog entry back to its post: "Verified with Kane CLI" when a Kane run shipped it, "Shipped" when a member did. */
export function VerifiedBadge({ org, postId, verified, className }: { org: string; postId: number; verified: boolean; className?: string }) {
  return (
    <Link to="/$org/posts/$id" params={{ org, id: String(postId) }}
      className={cn('inline-flex items-center gap-1.5 rounded-md bg-status-shipped/10 px-2 py-0.5 text-xs font-medium text-foreground hover:bg-status-shipped/20', className)}>
      <span className="size-1.5 rounded-full bg-status-shipped" />
      {verified ? 'Verified with Kane CLI' : 'Shipped'} · from post #{postId}
    </Link>
  )
}
