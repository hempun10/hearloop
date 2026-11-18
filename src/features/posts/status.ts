import type { PostStatus } from '#/db/schema'

export { POST_STATUSES } from '#/db/schema'
export type { PostStatus }

export const STATUS_LABEL: Record<PostStatus, string> = {
  open: 'Open',
  planned: 'Planned',
  building: 'In progress',
  shipped: 'Shipped',
}

/** Static class names so Tailwind can see them. */
export const STATUS_COLOR: Record<PostStatus, { text: string; bg: string; tint: string }> = {
  open: { text: 'text-status-open', bg: 'bg-status-open', tint: 'bg-status-open/10' },
  planned: { text: 'text-status-planned', bg: 'bg-status-planned', tint: 'bg-status-planned/10' },
  building: { text: 'text-status-building', bg: 'bg-status-building', tint: 'bg-status-building/10' },
  shipped: { text: 'text-status-shipped', bg: 'bg-status-shipped', tint: 'bg-status-shipped/10' },
}
