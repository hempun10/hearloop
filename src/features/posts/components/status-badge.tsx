import { Badge } from '#/components/ui/badge'
import { cn } from '#/lib/utils'
import { STATUS_COLOR, STATUS_LABEL, type PostStatus } from '../status'

export function StatusBadge({ status, className }: { status: PostStatus; className?: string }) {
  return (
    <Badge variant="secondary" data-status={status} className={cn('gap-1.5 rounded-md font-medium text-foreground', STATUS_COLOR[status].tint, className)}>
      <span className={cn('size-1.5 rounded-full', STATUS_COLOR[status].bg)} />
      {STATUS_LABEL[status]}
    </Badge>
  )
}
