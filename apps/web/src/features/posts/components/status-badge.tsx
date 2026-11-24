import { cn } from '@hearloop/ui/lib/utils'
import type { Post } from '#/db/schema'
import type { StatusOption } from '../status'
import { useStatusOf } from '../use-statuses'
import { StatusIconFor } from './status-icon'

/** A status's colour: its own hex, or the theme token for a built-in. */
export const statusColor = (s: StatusOption) => s.color ?? `var(--status-${s.kind})`

/** Dot and name on a 15% tint of the status colour (the request page, timelines). */
export function StatusBadge({ post, className }: { post: Pick<Post, 'status' | 'statusId'>; className?: string }) {
  const s = useStatusOf(post)
  const c = statusColor(s)
  return (
    <span data-status={post.status} className={cn('inline-flex h-[22px] items-center gap-1.5 rounded-full px-2.5 pl-2 text-xs font-semibold', className)}
      style={{ background: `color-mix(in oklab, ${c} 15%, transparent)`, color: c }}>
      <span className="size-[7px] rounded-full" style={{ background: c }} />
      {s.label}
    </span>
  )
}

/** Icon and name, for rows and cards. */
export function StatusLabel({ post, className }: { post: Pick<Post, 'status' | 'statusId'>; className?: string }) {
  const s = useStatusOf(post)
  return (
    <span data-testid="status" className={cn('inline-flex items-center gap-1.5 font-medium text-foreground', className)}>
      <StatusIconFor option={s} className="size-3.5" />{s.label}
    </span>
  )
}
