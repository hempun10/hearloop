import { DndContext, type DragEndEvent, KeyboardSensor, PointerSensor, useDraggable, useDroppable, useSensor, useSensors } from '@dnd-kit/core'
import { ChevronUp, GripVertical } from 'lucide-react'
import type { Post } from '#/db/schema'
import { cn } from '@hearloop/ui/lib/utils'
import { POST_STATUSES, STATUS_LABEL, type PostStatus } from '../status'
import { useSetPostStatus } from '../use-post-mutations'
import { StatusIcon } from './status-icon'
import { StatusSelect } from './status-select'

/** Drag cards between status columns; each card also has a status dropdown for keyboard and touch users. */
export function RoadmapBoard({ org, posts }: { org: string; posts: Post[] }) {
  const setStatus = useSetPostStatus(org)
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }), useSensor(KeyboardSensor))
  const move = (id: number, status: PostStatus) => {
    if (posts.find((p) => p.id === id)?.status !== status) setStatus.mutate({ id, status })
  }
  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (over) move(Number(active.id), over.id as PostStatus)
  }

  return (
    <DndContext sensors={sensors} onDragEnd={onDragEnd}>
      <div className="scrollbar-thin flex h-full overflow-x-auto px-5 pt-3 pb-5">
        {POST_STATUSES.map((status) => (
          <Column key={status} status={status} posts={posts.filter((p) => p.status === status)} onMove={move} />
        ))}
      </div>
    </DndContext>
  )
}

function Column({ status, posts, onMove }: { status: PostStatus; posts: Post[]; onMove: (id: number, s: PostStatus) => void }) {
  const { setNodeRef, isOver } = useDroppable({ id: status })
  return (
    <section aria-label={STATUS_LABEL[status]} className="flex min-w-[260px] flex-1 flex-col">
      <h2 className="flex h-10 shrink-0 items-center gap-2 px-3">
        <StatusIcon status={status} />
        <span className="text-[14px] font-semibold">{STATUS_LABEL[status]}</span>
        <span className="text-[13px] font-normal text-faint tabular-nums">{posts.length}</span>
      </h2>
      <ul ref={setNodeRef} className={cn('flex flex-1 flex-col gap-2 rounded-lg p-1.5 transition-colors', isOver && 'bg-accent/40')}>
        {posts.map((p) => <Card key={p.id} post={p} onMove={onMove} />)}
        {posts.length === 0 && (
          <li className="flex items-center justify-center rounded-lg border border-dashed py-8 text-[13px] text-faint">Nothing {STATUS_LABEL[status].toLowerCase()} yet</li>
        )}
      </ul>
    </section>
  )
}

function Card({ post, onMove }: { post: Post; onMove: (id: number, s: PostStatus) => void }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: post.id })
  return (
    <li ref={setNodeRef} style={transform ? { transform: `translate(${transform.x}px, ${transform.y}px)` } : undefined}
      className={cn('group/card flex flex-col gap-2 rounded-lg border bg-card p-3', isDragging && 'relative z-10 rotate-[2deg] shadow-[0_8px_24px_rgba(0,0,0,.4)] ring-2 ring-brand/40')}>
      <div className="flex items-start gap-2">
        <p className="min-w-0 flex-1 text-[14px] leading-[1.35] font-semibold">{post.title}</p>
        <button type="button" {...listeners} {...attributes} aria-label={`Drag ${post.title}`}
          className="mt-0.5 inline-flex size-5 shrink-0 cursor-grab items-center justify-center rounded text-faint opacity-0 group-hover/card:opacity-100 focus-visible:opacity-100 active:cursor-grabbing">
          <GripVertical className="size-3.5" />
        </button>
      </div>
      <div className="flex items-center gap-2 text-[12px]">
        <StatusSelect value={post.status} label={`Move ${post.title}`} onChange={(s) => onMove(post.id, s)}
          className="h-[22px] w-auto gap-1.5 rounded-md border-0 bg-secondary px-2 text-[12px] font-medium text-muted-foreground shadow-none" />
        <span className="flex-1" />
        <span className="inline-flex items-center gap-1 text-faint tabular-nums"><ChevronUp className="size-3" strokeWidth={2.5} />{post.votes}</span>
      </div>
    </li>
  )
}
