import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@hearloop/ui/components/select'
import { cn } from '@hearloop/ui/lib/utils'
import type { StatusOption } from '../status'
import { useStatuses } from '../use-statuses'
import { StatusIconFor } from './status-icon'

/** value is a status key: a built-in kind, or c<id> for the board's own. */
export function StatusSelect({ value, onChange, label, className }: {
  value: string
  onChange: (s: StatusOption) => void
  label: string
  className?: string
}) {
  const options = useStatuses()
  return (
    <Select value={value} onValueChange={(v) => onChange(options.find((o) => o.key === v)!)}>
      <SelectTrigger size="sm" aria-label={label} className={cn('h-7 w-[132px] text-xs', className)}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((s) => (
          <SelectItem key={s.key} value={s.key} className="text-xs">
            <StatusIconFor option={s} className="size-3.5" />
            {s.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
