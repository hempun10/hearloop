import { useSuspenseQuery } from '@tanstack/react-query'
import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowUpDown, Check, ChevronDown, ChevronUp, Inbox as InboxIcon, ListFilter, X } from 'lucide-react'
import { useState } from 'react'
import { z } from 'zod'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '#/components/ui/dropdown-menu'
import type { Post } from '#/db/schema'
import { Panel } from '#/features/dashboard/components/panel'
import { DeletePostButton } from '#/features/posts/components/delete-post-button'
import { StatusIcon } from '#/features/posts/components/status-icon'
import { StatusSelect } from '#/features/posts/components/status-select'
import { postListQuery } from '#/features/posts/post.queries'
import { POST_STATUSES, STATUS_LABEL, type PostStatus } from '#/features/posts/status'
import { useSetPostStatus } from '#/features/posts/use-post-mutations'
import { timeAgo } from '#/lib/format'
import { cn } from '#/lib/utils'

export const Route = createFileRoute('/$org/dashboard/')({
  validateSearch: z.object({
    status: z.enum(POST_STATUSES).optional().catch(undefined),
    sort: z.literal('new').optional().catch(undefined),
  }),
  loader: ({ context, params }) => context.queryClient.query(postListQuery(params.org)),
  component: Inbox,
})

const SORTS = { top: 'Most votes', new: 'Newest' } as const
const toolbarButton = 'inline-flex h-8 items-center gap-1.5 rounded-md px-2.5 text-[13px] outline-none hover:bg-accent hover:text-foreground'

function Inbox() {
  const { org } = Route.useParams()
  const { status, sort } = Route.useSearch()
  const navigate = Route.useNavigate()
  const { data: all } = useSuspenseQuery(postListQuery(org))
  const setStatus = useSetPostStatus(org)
  const [search, setSearch] = useState('')

  const needle = search.trim().toLowerCase()
  let posts = all.filter((p) => (!status || p.status === status) && (!needle || p.title.toLowerCase().includes(needle)))
  if (sort === 'new') posts = [...posts].sort((a, b) => b.id - a.id)

  return (
    <Panel title={status ? STATUS_LABEL[status] : 'Posts'} className="flex flex-col" aside={<FilterColumn org={org} all={all} status={status} sort={sort} />} onSearch={setSearch}>
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
        <DropdownMenu>
          <DropdownMenuTrigger className={cn(toolbarButton, status ? 'text-foreground' : 'text-muted-foreground')}>
            <ListFilter className="size-3.5" />Filter<ChevronDown className="size-3 text-faint" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-48">
            <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">Status</DropdownMenuLabel>
            {POST_STATUSES.map((s) => (
              <DropdownMenuItem key={s} onSelect={() => navigate({ search: (p) => ({ ...p, status: p.status === s ? undefined : s }) })}>
                <StatusIcon status={s} className="size-3.5" /><span className="flex-1">{STATUS_LABEL[s]}</span>
                {status === s && <Check className="size-3" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <span className="flex-1" />
        <span className="text-xs text-faint tabular-nums">{posts.length}</span>
      </div>
      {status && (
        <div className="flex flex-wrap gap-1.5 px-4 pb-2.5 animate-in fade-in-0 slide-in-from-top-1 duration-150 motion-reduce:animate-none">
          <span className="inline-flex h-[26px] items-center gap-1.5 rounded-md border bg-card pr-1 pl-2 text-xs">
            <StatusIcon status={status} className="size-3" />{STATUS_LABEL[status]}
            <Link to="/$org/dashboard" params={{ org }} search={{ sort }} aria-label="Clear status filter" className="inline-flex size-5 items-center justify-center rounded text-faint hover:bg-accent hover:text-foreground">
              <X className="size-3" />
            </Link>
          </span>
        </div>
      )}
      {posts.length === 0 ? (
        <p className="px-5 py-12 text-center text-sm text-faint">
          {needle ? `Nothing matches “${search}”.` : status ? `Nothing ${STATUS_LABEL[status].toLowerCase()} right now.` : 'No posts yet. Share your board link to get the first one.'}
        </p>
      ) : (
        <ul aria-label="Posts">
          {posts.map((p) => (
            <li key={p.id} data-testid="inbox-row" className="group relative flex h-[50px] shrink-0 items-center gap-3.5 border-t px-5 transition-colors duration-100 hover:bg-accent/50">
              <StatusIcon status={p.status} className="size-[17px]" />
              <a href={`/${org}/posts/${p.id}`} target="_blank" rel="noreferrer" className="min-w-0 truncate text-[14px] font-medium hover:underline">{p.title}</a>
              <span className="flex-1" />
              <span className="hidden text-[12px] whitespace-nowrap text-faint tabular-nums sm:inline">{timeAgo(p.createdAt)}</span>
              <StatusSelect value={p.status} label={`Status of ${p.title}`} onChange={(s) => setStatus.mutate({ id: p.id, status: s })}
                className="h-7 w-[124px] rounded-md border-input bg-card text-[12px] shadow-none" />
              <span className="inline-flex h-7 min-w-11 items-center justify-center gap-1 rounded-md border border-input px-2 text-[12px] tabular-nums">
                <ChevronUp className="size-3 text-muted-foreground" strokeWidth={2.5} />{p.votes}
              </span>
              <DeletePostButton org={org} post={p} className="size-7 text-faint opacity-0 group-hover:opacity-100 focus-visible:opacity-100" />
            </li>
          ))}
        </ul>
      )}
    </Panel>
  )
}

/** The 220px column beside the list: all posts, then one row per status with its count. */
function FilterColumn({ org, all, status, sort }: { org: string; all: Post[]; status?: PostStatus; sort?: 'new' }) {
  const row = (on: boolean) => cn(
    'flex h-8 w-full items-center gap-2.5 rounded-md px-2 text-[13px] font-medium select-none',
    on ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground',
  )
  return (
    <nav aria-label="Filter by status" className="hidden h-full w-[220px] shrink-0 flex-col overflow-y-auto border-r px-3 pt-[15px] pb-4 [scrollbar-width:none] lg:flex">
      <div className="flex h-7 items-center pl-2"><span className="text-[15px] font-semibold">Posts</span></div>
      <div className="flex flex-col gap-1 pt-3">
        <Link to="/$org/dashboard" params={{ org }} search={{ sort }} className={row(!status)}>
          <InboxIcon className="size-4 shrink-0" /><span className="flex-1">All posts</span>
          <span className="text-[13px] text-faint tabular-nums">{all.length}</span>
        </Link>
      </div>
      <div className="flex flex-col gap-1 pt-4">
        <p className="px-2 pb-1 text-[13px] text-faint">Status</p>
        {POST_STATUSES.map((s) => (
          <Link key={s} to="/$org/dashboard" params={{ org }} search={{ status: s, sort }} className={row(status === s)}>
            <StatusIcon status={s} /><span className="flex-1">{STATUS_LABEL[s]}</span>
            <span className="text-[13px] text-faint tabular-nums">{all.filter((p) => p.status === s).length}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
