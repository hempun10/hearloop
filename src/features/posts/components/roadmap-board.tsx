import { DndContext, type DragEndEvent, KeyboardSensor, PointerSensor, useDraggable, useDroppable, useSensor, useSensors } from '@dnd-kit/core'
import { ChevronUp, GripVertical } from 'lucide-react'
import type { Post } from '#/db/schema'
import { cn } from '#/lib/utils'
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
      <div className="grid gap-4 p-6 md:grid-cols-2 xl:grid-cols-4">
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
    <section ref={setNodeRef} aria-label={STATUS_LABEL[status]}
      className={cn('min-h-60 rounded-xl border p-3 transition-colors', isOver ? 'border-brand bg-brand/5' : 'bg-card/40')}>
      <h2 className="mb-3 flex items-center gap-2 px-1 text-[13px] font-semibold">
        <StatusIcon status={status} className="size-3.5" />
        {STATUS_LABEL[status]}
        <span className="ml-auto text-xs font-normal text-faint tabular-nums">{posts.length}</span>
      </h2>
      <ul className="grid gap-2">
        {posts.map((p) => <Card key={p.id} post={p} onMove={onMove} />)}
      </ul>
    </section>
  )
}

function Card({ post, onMove }: { post: Post; onMove: (id: number, s: PostStatus) => void }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: post.id })
  return (
    <li ref={setNodeRef} style={transform ? { transform: `translate(${transform.x}px, ${transform.y}px)` } : undefined}
      className={cn('rounded-lg border bg-background p-3', isDragging && 'relative z-10 shadow-lg')}>
      <div className="flex items-start gap-2">
        <p className="min-w-0 flex-1 text-[13px] leading-5 font-medium">{post.title}</p>
        <button type="button" {...listeners} {...attributes} aria-label={`Drag ${post.title}`}
          className="-mr-1 cursor-grab rounded p-0.5 text-faint hover:text-foreground active:cursor-grabbing">
          <GripVertical className="size-4" />
        </button>
      </div>
      <div className="mt-2 flex items-center justify-between text-xs text-faint">
        <span className="inline-flex items-center tabular-nums"><ChevronUp className="size-3" />{post.votes}</span>
        <StatusSelect value={post.status} label={`Move ${post.title}`} onChange={(s) => onMove(post.id, s)} className="h-6 w-[120px]" />
      </div>
    </li>
  )
}
