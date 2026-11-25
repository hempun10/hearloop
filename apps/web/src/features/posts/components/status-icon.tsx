import { cn } from '@hearloop/ui/lib/utils'
import { STATUS_LABEL, type PostStatus, type StatusOption } from '../status'

export const StatusIconFor = ({ option, className }: { option: StatusOption; className?: string }) => (
  <StatusIcon status={option.kind} color={option.color} label={option.label} className={className} />
)

/** Ring icons per status: dashed (open), half (planned), arc (in progress), check (shipped). */
export function StatusIcon({
  status,
  color,
  label,
  className,
}: {
  status: PostStatus
  color?: string | null
  label?: string
  className?: string
}) {
  const c = color ?? `var(--status-${status})`
  return (
    <svg
      viewBox="0 0 16 16"
      className={cn('size-4 shrink-0', className)}
      aria-label={label ?? STATUS_LABEL[status]}
      role="img"
    >
      {status === 'open' && (
        <circle cx="8" cy="8" r="6" fill="none" stroke={c} strokeWidth="1.6" strokeDasharray="2.4 2.2" />
      )}
      {status === 'planned' && (
        <>
          <circle cx="8" cy="8" r="6" fill="none" stroke={c} strokeWidth="1.6" />
          <path d="M8 3.5a4.5 4.5 0 0 1 0 9z" fill={c} />
        </>
      )}
      {status === 'building' && (
        <>
          <circle cx="8" cy="8" r="6" fill="none" stroke={c} strokeWidth="1.6" opacity=".35" />
          <path d="M8 2a6 6 0 0 1 6 6" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" />
        </>
      )}
      {status === 'shipped' && (
        <>
          <circle cx="8" cy="8" r="6.8" fill={c} />
          <path
            d="M5.2 8.2 7.1 10l3.7-4"
            fill="none"
            stroke="var(--background)"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
    </svg>
  )
}
