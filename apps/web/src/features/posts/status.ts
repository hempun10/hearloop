import type { CustomStatus, PostStatus } from '#/db/schema'

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

/** One status a post can be in: a built-in (id null) or a board's own, which belongs to a built-in kind. */
export type StatusOption = { key: string; kind: PostStatus; id: number | null; label: string; color: string | null }

export const statusKey = (p: { status: PostStatus; statusId: number | null }) =>
  p.statusId ? `c${p.statusId}` : p.status

/** Built-ins in roadmap order, each followed by the board's own statuses of that kind. */
export function statusOptions(
  custom: Pick<CustomStatus, 'id' | 'name' | 'color' | 'kind' | 'position'>[],
): StatusOption[] {
  const sorted = [...custom].sort((a, b) => a.position - b.position || a.id - b.id)
  return (Object.keys(STATUS_LABEL) as PostStatus[]).flatMap((kind) => [
    { key: kind, kind, id: null, label: STATUS_LABEL[kind], color: null },
    ...sorted
      .filter((s) => s.kind === kind)
      .map((s) => ({ key: `c${s.id}`, kind, id: s.id, label: s.name, color: s.color })),
  ])
}

export const findStatus = (options: StatusOption[], p: { status: PostStatus; statusId: number | null }) =>
  options.find((o) => o.key === statusKey(p)) ?? options.find((o) => o.key === p.status)!
