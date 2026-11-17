import type { Status } from '#/lib/db'

const tone: Record<Status, string> = {
  open: 'bg-[var(--chip-bg)] text-[var(--sea-ink-soft)]',
  planned: 'bg-amber-500/15 text-amber-700 dark:text-amber-300',
  building: 'bg-sky-500/15 text-sky-700 dark:text-sky-300',
  shipped: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
}

export default function StatusPill({ status }: { status: Status }) {
  return (
    <span data-testid="status" className={`rounded-full border border-[var(--line)] px-2.5 py-0.5 text-xs font-semibold ${tone[status]}`}>
      {status}
    </span>
  )
}
