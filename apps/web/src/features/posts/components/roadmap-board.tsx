import { DndContext, type DragEndEvent, KeyboardSensor, PointerSensor, useDraggable, useDroppable, useSensor, useSensors } from '@dnd-kit/core'
import { useQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { ChevronUp, GripVertical } from 'lucide-react'
import { teamQuery } from '#/features/team/team.queries'
import { Initials } from './assignee-select'
import type { Post } from '#/db/schema'
import { cn } from '@hearloop/ui/lib/utils'
import { type StatusOption, statusKey } from '../status'
import { useMovePost } from '../use-move-post'
import { useStatuses } from '../use-statuses'
import { StatusIconFor } from './status-icon'
import { StatusSelect } from './status-select'

/** Drag cards between status columns (the board's own statuses sit after their kind); each card also has a status dropdown for keyboard and touch users. */
export function RoadmapBoard({ org, posts, onOpen }: { org: string; posts: Post[]; onOpen: (id: number) => void }) {
  const { move: movePost, dialog } = useMovePost(org)
  const options = useStatuses()
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }), useSensor(KeyboardSensor))
  const move = (id: number, to: StatusOption) => {
    const post = posts.find((p) => p.id === id)
    if (post) movePost(post, to)
  }
  const onDragEnd = ({ active, over }: DragEndEvent) => {
    const to = over && options.find((o) => o.key === over.id)
    if (to) move(Number(active.id), to)
  }

  return (
    <DndContext sensors={sensors} onDragEnd={onDragEnd}>
      <div className="scrollbar-thin flex h-full overflow-x-auto px-5 pt-3 pb-5">
        {options.map((s) => (
          <Column key={s.key} status={s} posts={posts.filter((p) => statusKey(p) === s.key)} onMove={move} onOpen={onOpen} />
        ))}
      </div>
      {dialog}
    </DndContext>
  )
}

type CardActions = { onMove: (id: number, s: StatusOption) => void; onOpen: (id: number) => void }

function Column({ status, posts, onMove, onOpen }: { status: StatusOption; posts: Post[] } & CardActions) {
  const { setNodeRef, isOver } = useDroppable({ id: status.key })
  return (
    <section aria-label={status.label} className="flex min-w-[260px] flex-1 flex-col">
      <h2 className="flex h-10 shrink-0 items-center gap-2 px-3">
        <StatusIconFor option={status} />
        <span className="text-[14px] font-semibold">{status.label}</span>
        <span className="text-[13px] font-normal text-faint tabular-nums">{posts.length}</span>
      </h2>
      <ul ref={setNodeRef} className={cn('flex flex-1 flex-col gap-2 rounded-lg p-1.5 transition-colors', isOver && 'bg-accent/40')}>
        {posts.map((p) => <Card key={p.id} post={p} onMove={onMove} onOpen={onOpen} />)}
        {posts.length === 0 && (
          <li className="flex items-center justify-center rounded-lg border border-dashed py-8 text-[13px] text-faint">Nothing {status.label.toLowerCase()} yet</li>
        )}
      </ul>
    </section>
  )
}

function Card({ post, onMove, onOpen }: { post: Post } & CardActions) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: post.id })
  const { data: team } = useQuery(teamQuery(useParams({ strict: false }).org ?? ''))
  const assignee = team?.members.find((m) => m.id === post.assigneeId)
  return (
    <li ref={setNodeRef} style={transform ? { transform: `translate(${transform.x}px, ${transform.y}px)` } : undefined}
      onClick={() => onOpen(post.id)} data-testid="roadmap-card"
      className={cn('group/card flex cursor-pointer flex-col gap-2 rounded-lg border bg-card p-3 hover:border-foreground/20', isDragging && 'relative z-10 rotate-[2deg] shadow-[0_8px_24px_rgba(0,0,0,.4)] ring-2 ring-brand/40')}>
      <div className="flex items-start gap-2">
        <button type="button" onClick={(e) => { e.stopPropagation(); onOpen(post.id) }} className="min-w-0 flex-1 text-left text-[14px] leading-[1.35] font-semibold outline-none focus-visible:underline">{post.title}</button>
        <button type="button" {...listeners} {...attributes} onClick={(e) => e.stopPropagation()} aria-label={`Drag ${post.title}`}
          className="mt-0.5 inline-flex size-5 shrink-0 cursor-grab items-center justify-center rounded text-faint opacity-0 group-hover/card:opacity-100 focus-visible:opacity-100 active:cursor-grabbing">
          <GripVertical className="size-3.5" />
        </button>
      </div>
      {/* the status menu's clicks (portalled, but they bubble through React) must not open the card */}
      <div className="flex items-center gap-2 text-[12px]" onClick={(e) => e.stopPropagation()}>
        <StatusSelect value={statusKey(post)} label={`Move ${post.title}`} onChange={(s) => onMove(post.id, s)}
          className="h-[22px] w-auto gap-1.5 rounded-md border-0 bg-secondary px-2 text-[12px] font-medium text-muted-foreground shadow-none" />
        <span className="flex-1" />
        <span className="inline-flex items-center gap-1 text-faint tabular-nums"><ChevronUp className="size-3" strokeWidth={2.5} />{post.votes}</span>
        {assignee && <Initials name={assignee.name} />}
      </div>
    </li>
  )
}
