import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { CircleUserRound, LayoutGrid, Tag } from 'lucide-react'
import type { Post } from '#/db/schema'
import { useOrg } from '#/features/orgs/use-org'
import { teamQuery } from '#/features/team/team.queries'
import { tagsQuery } from '../post.queries'
import { findStatus } from '../status'
import { useMovePost } from '../use-move-post'
import { useSetAssignee, useSetCategory, useSetTags } from '../use-post-mutations'
import { useStatuses } from '../use-statuses'
import { assigneeKeyOf, assigneeOptions } from './assignee-select'
import { TagChip } from './post-tags'
import { PropertyPicker } from './property-picker'
import { StatusIconFor } from './status-icon'

const faint = 'text-muted-foreground'
const heading = 'mb-1 px-2 text-xs font-medium text-muted-foreground'

/** Status, assignee, board and tags of one request, each a Linear-style picker. Members only. */
export function PostProperties({ org, post, tags }: { org: string; post: Post; tags: string[] }) {
  const { categories } = useOrg()
  const statuses = useStatuses()
  const { data: team } = useSuspenseQuery(teamQuery(org))
  const { data: allTags = [] } = useQuery(tagsQuery(org))
  const { move, dialog } = useMovePost(org)
  const assign = useSetAssignee(org, post.id)
  const setBoard = useSetCategory(org, post.id)
  const setTags = useSetTags(org, post.id)
  const status = findStatus(statuses, post)
  const people = assigneeOptions(team, 'size-4')
  const assignee = people.find((o) => o.value === assigneeKeyOf(post))
  const board = categories.find((c) => c.id === post.categoryId)
  const tagNames = [...new Set([...allTags.map((t) => t.name), ...tags])]
  const toggleTag = (t: string) => setTags.mutate(tags.includes(t) ? tags.filter((x) => x !== t) : [...tags, t])

  return (
    <div className="grid gap-5 text-[13px]">
      <div>
        <p className={heading}>Properties</p>
        <div className="flex flex-col items-start">
          <PropertyPicker what="status" hint="S" selected={[status.key]}
            trigger={<><StatusIconFor option={status} className="size-4" />{status.label}</>}
            options={statuses.map((s) => ({ value: s.key, label: s.label, icon: <StatusIconFor option={s} className="size-4" /> }))}
            onSelect={(k) => move(post, statuses.find((s) => s.key === k)!)} />
          <PropertyPicker what="assignee" hint="A" selected={[assigneeKeyOf(post) ?? 'none']}
            trigger={assignee ? <>{assignee.icon}{assignee.label}</> : <><CircleUserRound className={`size-4 ${faint}`} /><span className={faint}>Assign</span></>}
            options={[{ value: 'none', label: 'No assignee', icon: <CircleUserRound className={`size-4 ${faint}`} /> }, ...people]}
            onSelect={(v) => assign.mutate(v === 'none' ? null : v)} />
        </div>
      </div>
      {categories.length > 0 && (
        <div>
          <p className={heading}>Board</p>
          <PropertyPicker what="board" hint="B" selected={[String(post.categoryId ?? 'none')]}
            trigger={<><LayoutGrid className={`size-4 ${faint}`} />{board ? board.name : <span className={faint}>Add to board</span>}</>}
            options={[{ value: 'none', label: 'No board', icon: <LayoutGrid className={`size-4 ${faint}`} /> }, ...categories.map((c) => ({ value: String(c.id), label: c.name, icon: <LayoutGrid className={`size-4 ${faint}`} /> }))]}
            onSelect={(v) => setBoard.mutate(v === 'none' ? null : Number(v))} />
        </div>
      )}
      <div>
        <p className={heading}>Tags</p>
        {tags.length > 0 && <ul aria-label="Tags" className="flex flex-wrap gap-1.5 px-2 pb-1">{tags.map((t) => <li key={t}><TagChip>{t}</TagChip></li>)}</ul>}
        <PropertyPicker what="tags" hint="L" multi selected={tags}
          trigger={<><Tag className={`size-4 ${faint}`} /><span className={faint}>{tags.length ? 'Edit tags' : 'Add tag'}</span></>}
          options={tagNames.map((t) => ({ value: t, label: t, icon: <span className="size-2 rounded-full bg-muted-foreground/60" /> }))}
          onSelect={toggleTag} onCreate={(t) => setTags.mutate([...tags, t])} />
      </div>
      {dialog}
    </div>
  )
}
