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
