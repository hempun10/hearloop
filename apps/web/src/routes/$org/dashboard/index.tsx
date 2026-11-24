import { useSuspenseQuery } from '@tanstack/react-query'
import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowUpDown, Check, ChevronDown, ChevronRight, ChevronUp, Inbox as InboxIcon, LayoutGrid, Tag } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@hearloop/ui/components/collapsible'
import { z } from 'zod'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@hearloop/ui/components/dropdown-menu'
import type { Post } from '#/db/schema'
import { Panel } from '#/features/dashboard/components/panel'
import { DeletePostButton } from '#/features/posts/components/delete-post-button'
import { StatusIcon, StatusIconFor } from '#/features/posts/components/status-icon'
import { useOrg } from '#/features/orgs/use-org'
import { findStatus, statusKey } from '#/features/posts/status'
import { useStatuses } from '#/features/posts/use-statuses'
import { StatusSelect } from '#/features/posts/components/status-select'
import { FILTER_ICONS, FilterChips, FilterMenu, type FilterField, type FilterValue } from '#/features/posts/components/inbox-filters'
import { postListQuery } from '#/features/posts/post.queries'
import { POST_STATUSES, STATUS_LABEL, type PostStatus } from '#/features/posts/status'
import { useMovePost } from '#/features/posts/use-move-post'
import { timeAgo } from '#/lib/format'
import { cn } from '@hearloop/ui/lib/utils'

// a filter can hold several values; a single one (?status=planned) still works
const list = <T extends z.ZodType>(t: T) =>
  z.preprocess((v) => (v === undefined ? undefined : [v].flat()), z.array(t).optional()).catch(undefined)

export const Route = createFileRoute('/$org/dashboard/')({
  validateSearch: z.object({
    status: list(z.enum(POST_STATUSES)),
    sort: z.literal('new').optional().catch(undefined),
    q: z.string().optional().catch(undefined),
    category: list(z.coerce.number().int().positive()),
    tag: list(z.string()),
  }),
  loader: ({ context, params }) => context.queryClient.query(postListQuery(params.org)),
  component: Inbox,
})

const SORTS = { top: 'Most votes', new: 'Newest' } as const
const toolbarButton = 'inline-flex h-8 items-center gap-1.5 rounded-md px-2.5 text-[13px] outline-none hover:bg-accent hover:text-foreground'

function Inbox() {
  const { org } = Route.useParams()
  const { status, sort, q = '', category, tag } = Route.useSearch()
  const { categories } = useOrg()
  const options = useStatuses()
  const categoryName = (id: number | null) => categories.find((c) => c.id === id)?.name
  const navigate = Route.useNavigate()
  const { data: all } = useSuspenseQuery(postListQuery(org))
  const { move, dialog } = useMovePost(org)
  const setSearch = (v: string) => navigate({ search: (p) => ({ ...p, q: v || undefined }), replace: true })

  const needle = q.trim().toLowerCase()
  let posts = all.filter((p) => (!status?.length || status.includes(p.status))
    && (!category?.length || (p.categoryId !== null && category.includes(p.categoryId)))
    && (!tag?.length || p.tags.some((t) => tag.includes(t)))
    && (!needle || p.title.toLowerCase().includes(needle)))
  const one = status?.length === 1 ? status[0] : undefined
  const fields: FilterField[] = [
    { key: 'status', label: 'Status', plural: 'statuses', icon: FILTER_ICONS.status, options: POST_STATUSES.map((s) => ({ value: s, label: STATUS_LABEL[s], icon: <StatusIcon status={s} className="size-3.5" /> })) },
    { key: 'category', label: 'Board', plural: 'boards', icon: FILTER_ICONS.board, options: categories.map((c) => ({ value: c.id, label: c.name })) },
    { key: 'tag', label: 'Tags', plural: 'tags', icon: FILTER_ICONS.tag, options: [...new Set(all.flatMap((p) => p.tags))].sort().map((t) => ({ value: t, label: t })) },
  ]
  const filterValue = { status, category, tag } as Record<string, FilterValue[] | undefined>
  const setFilter = (key: string, values: FilterValue[]) => navigate({ search: (p) => ({ ...p, [key]: values.length ? values : undefined }) })
  const clearFilters = () => navigate({ search: (p) => ({ ...p, status: undefined, category: undefined, tag: undefined }) })
  if (sort === 'new') posts = [...posts].sort((a, b) => b.id - a.id)

  return (
    <Panel title={one && !category?.length && !tag?.length ? STATUS_LABEL[one] : 'Posts'} className="flex flex-col" aside={<FilterColumn org={org} all={all} status={status} sort={sort} q={q} category={category} tag={tag} />} onSearch={setSearch} search={q}>
      <div className="flex items-center gap-1.5 px-3 pt-3 pb-2.5">
        <DropdownMenu>
          <DropdownMenuTrigger className={cn(toolbarButton, 'text-muted-foreground')}>
            <ArrowUpDown className="size-3.5" />{SORTS[sort ?? 'top']}<ChevronDown className="size-3 text-faint" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-36">
            {(['top', 'new'] as const).map((s) => (
              <DropdownMenuItem key={s} onSelect={() => navigate({ search: (p) => ({ ...p, sort: s === 'new' ? s : undefined }) })}>
                {SORTS[s]}{(sort ?? 'top') === s && <Check className="ml-auto size-3" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <FilterMenu fields={fields} value={filterValue} onChange={setFilter} className={toolbarButton} />
        <span className="flex-1" />
        <span className="text-xs text-faint tabular-nums">{posts.length}</span>
      </div>
      <FilterChips fields={fields} value={filterValue} onChange={setFilter} onClearAll={clearFilters} />
      {posts.length === 0 ? (
        <p className="px-5 py-12 text-center text-sm text-faint">
          {needle ? `Nothing matches “${q}”.` : one && !category?.length && !tag?.length ? `Nothing ${STATUS_LABEL[one].toLowerCase()} right now.` : status || category || tag ? 'Nothing matches these filters.' : 'No posts yet. Share your board link to get the first one.'}
        </p>
      ) : (
        <ul aria-label="Posts">
          {posts.map((p) => (
            <li key={p.id} data-testid="inbox-row" className="group relative flex h-[50px] shrink-0 items-center gap-3.5 border-t px-5 transition-colors duration-100 hover:bg-accent/50">
              <StatusIconFor option={findStatus(options, p)} className="size-[17px]" />
              <a href={`/${org}/posts/${p.id}`} target="_blank" rel="noreferrer" className="min-w-0 truncate text-[14px] font-medium hover:underline">{p.title}</a>
              <span className="flex-1" />
              {categoryName(p.categoryId) && <span className="hidden text-[12px] whitespace-nowrap text-muted-foreground sm:inline">{categoryName(p.categoryId)}</span>}
              <span className="hidden text-[12px] whitespace-nowrap text-faint tabular-nums sm:inline">{timeAgo(p.createdAt)}</span>
              <StatusSelect value={statusKey(p)} label={`Status of ${p.title}`} onChange={(s) => move(p, s)}
                className="h-7 w-[124px] rounded-md border-input bg-card text-[12px] shadow-none" />
              <span className="inline-flex h-7 min-w-11 items-center justify-center gap-1 rounded-md border border-input px-2 text-[12px] tabular-nums">
                <ChevronUp className="size-3 text-muted-foreground" strokeWidth={2.5} />{p.votes}
              </span>
              <DeletePostButton org={org} post={p} className="size-7 text-faint opacity-0 group-hover:opacity-100 focus-visible:opacity-100" />
            </li>
          ))}
        </ul>
      )}
      {dialog}
    </Panel>
  )
}

/** The 220px column beside the list: all posts, one row per status with its count, then quick filters by category and tag. */
function FilterColumn({ org, all, status, sort, q, category, tag }: { org: string; all: (Post & { tags: string[] })[]; status?: PostStatus[]; sort?: 'new'; q: string; category?: number[]; tag?: string[] }) {
  const only = <T,>(list: T[] | undefined, v: T) => list?.length === 1 && list[0] === v
  const { categories } = useOrg()
  const tags = [...new Set(all.flatMap((p) => p.tags))].sort()
  const row = (on: boolean) => cn(
    'flex h-8 w-full items-center gap-2.5 rounded-md px-2 text-[13px] font-medium select-none',
    on ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground',
  )
  const sub = (on: boolean) => cn(row(on), 'h-7 pl-[34px] font-normal')
  return (
    <nav aria-label="Filter by status" className="hidden h-full w-[220px] shrink-0 flex-col overflow-y-auto border-r px-3 pt-[15px] pb-4 [scrollbar-width:none] lg:flex">
      <div className="flex h-7 items-center pl-2"><span className="text-[15px] font-semibold">Posts</span></div>
      <div className="flex flex-col gap-1 pt-3">
        <Link to="/$org/dashboard" params={{ org }} search={{ sort, q: q || undefined }} className={row(!status?.length && !category?.length && !tag?.length)}>
          <InboxIcon className="size-4 shrink-0" /><span className="flex-1">All posts</span>
          <span className="text-[13px] text-faint tabular-nums">{all.length}</span>
        </Link>
      </div>
      <div className="flex flex-col gap-1 pt-4">
        <p className="px-2 pb-1 text-[13px] text-faint">Status</p>
        {POST_STATUSES.map((s) => (
          <Link key={s} to="/$org/dashboard" params={{ org }} search={{ status: [s], sort, q: q || undefined }} className={row(only(status, s))}>
            <StatusIcon status={s} /><span className="flex-1">{STATUS_LABEL[s]}</span>
            <span className="text-[13px] text-faint tabular-nums">{all.filter((p) => p.status === s).length}</span>
          </Link>
        ))}
      </div>
      <div className="flex flex-col gap-1 pt-4">
        <p className="px-2 pb-1 text-[13px] text-faint">Quick filters</p>
        <Collapsible defaultOpen={!!category?.length}>
          <CollapsibleTrigger className={cn(row(false), 'group')}>
            <LayoutGrid className="size-4 shrink-0" /><span className="flex-1 text-left">Boards</span>
            <ChevronRight className="size-3 text-faint transition-transform group-data-[state=open]:rotate-90" />
          </CollapsibleTrigger>
          <CollapsibleContent className="flex flex-col gap-0.5 pt-0.5">
            {categories.length === 0 && <span className="py-1 pl-[34px] text-xs text-faint">No boards yet</span>}
            {categories.map((c) => (
              <Link key={c.id} to="/$org/dashboard" params={{ org }} search={{ status, category: [c.id], sort, q: q || undefined }} className={sub(only(category, c.id))}>
                <span className="flex-1 truncate">{c.name}</span>
                <span className="text-[13px] text-faint tabular-nums">{all.filter((p) => p.categoryId === c.id).length}</span>
              </Link>
            ))}
          </CollapsibleContent>
        </Collapsible>
        <Collapsible defaultOpen={!!tag?.length}>
          <CollapsibleTrigger className={cn(row(false), 'group')}>
            <Tag className="size-4 shrink-0" /><span className="flex-1 text-left">Tags</span>
            <ChevronRight className="size-3 text-faint transition-transform group-data-[state=open]:rotate-90" />
          </CollapsibleTrigger>
          <CollapsibleContent className="flex flex-col gap-0.5 pt-0.5">
            {tags.length === 0 && <span className="py-1 pl-[34px] text-xs text-faint">No tags yet</span>}
            {tags.map((t) => (
              <Link key={t} to="/$org/dashboard" params={{ org }} search={{ status, tag: [t], sort, q: q || undefined }} className={sub(only(tag, t))}>
                <span className="flex-1 truncate">{t}</span>
              </Link>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </div>
    </nav>
  )
}
