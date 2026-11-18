import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#/components/ui/select'
import { cn } from '#/lib/utils'
import { POST_STATUSES, STATUS_LABEL, type PostStatus } from '../status'
import { StatusIcon } from './status-icon'

export function StatusSelect({ value, onChange, label, className }: {
  value: PostStatus
  onChange: (s: PostStatus) => void
  label: string
  className?: string
}) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as PostStatus)}>
      <SelectTrigger size="sm" aria-label={label} className={cn('h-7 w-[132px] text-xs', className)}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {POST_STATUSES.map((s) => (
          <SelectItem key={s} value={s} className="text-xs">
            <StatusIcon status={s} className="size-3.5" />
            {STATUS_LABEL[s]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
