import type { Status } from '#/lib/types'

export const STATUS_LABEL: Record<Status, string> = {
  open: 'Open',
  planned: 'Planned',
  building: 'In progress',
  shipped: 'Shipped',
}
export const STATUS_DOT: Record<Status, string> = {
  open: 'bg-open',
  planned: 'bg-planned',
  building: 'bg-building',
  shipped: 'bg-shipped',
}

// dot + label; chip variant adds a 10% tint of the status colour
export default function StatusPill({ status, chip }: { status: Status; chip?: boolean }) {
  return (
    <span
      data-testid="status"
      data-status={status}
      className={`inline-flex items-center gap-1.5 text-[12px] font-medium text-fg ${chip ? 'rounded-md px-2 py-0.5' : ''}`}
      style={chip ? { background: `color-mix(in oklch, var(--color-${status}) 10%, transparent)` } : undefined}
    >
      <span className={`size-1.5 rounded-full ${STATUS_DOT[status]}`} />
      {STATUS_LABEL[status]}
    </span>
  )
}

// ring icons per status, as in the dashboard
export function StatusIcon({ status, className = 'size-4' }: { status: Status; className?: string }) {
  const c = `var(--color-${status})`
  return (
    <svg viewBox="0 0 16 16" className={`shrink-0 ${className}`} aria-label={STATUS_LABEL[status]} role="img">
      {status === 'open' && <circle cx="8" cy="8" r="6" fill="none" stroke={c} strokeWidth="1.6" strokeDasharray="2.4 2.2" />}
      {status === 'planned' && (<><circle cx="8" cy="8" r="6" fill="none" stroke={c} strokeWidth="1.6" /><path d="M8 3.5a4.5 4.5 0 0 1 0 9z" fill={c} /></>)}
      {status === 'building' && (<><circle cx="8" cy="8" r="6" fill="none" stroke={c} strokeWidth="1.6" opacity=".35" /><path d="M8 2a6 6 0 0 1 6 6" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" /></>)}
      {status === 'shipped' && (<><circle cx="8" cy="8" r="6.8" fill={c} /><path d="M5.2 8.2 7.1 10l3.7-4" fill="none" stroke="var(--color-bg)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></>)}
    </svg>
  )
}
