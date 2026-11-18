import { useSuspenseQuery } from '@tanstack/react-query'
import { Link, createFileRoute } from '@tanstack/react-router'
import { ChevronUp, LayoutList, Search } from 'lucide-react'
import { useState } from 'react'
import { z } from 'zod'
import { PageHeader } from '#/components/page-header'
import { InputGroup, InputGroupAddon, InputGroupInput } from '#/components/ui/input-group'
import { DeletePostButton } from '#/features/posts/components/delete-post-button'
import { StatusIcon } from '#/features/posts/components/status-icon'
import { StatusSelect } from '#/features/posts/components/status-select'
import { postListQuery } from '#/features/posts/post.queries'
import { POST_STATUSES, STATUS_LABEL } from '#/features/posts/status'
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

const filterLink = (active: boolean) =>
  cn('flex h-8 items-center gap-2.5 rounded-md px-2 text-[13px]', active ? 'bg-accent font-medium text-foreground' : 'text-muted-foreground hover:bg-accent/60')

function Inbox() {
  const { org } = Route.useParams()
  const { status, sort } = Route.useSearch()
  const { data: all } = useSuspenseQuery(postListQuery(org))
  const setStatus = useSetPostStatus(org)
  const [search, setSearch] = useState('')

  const needle = search.trim().toLowerCase()
  let posts = all.filter((p) => (!status || p.status === status) && (!needle || p.title.toLowerCase().includes(needle)))
  if (sort === 'new') posts = [...posts].sort((a, b) => b.id - a.id)

  return (
    <div className="flex min-h-svh">
      <nav className="hidden w-52 shrink-0 border-r p-3 lg:block" aria-label="Filter by status">
        <p className="mt-2 mb-2 px-2 text-[15px] font-semibold">Posts</p>
        <Link to="/$org/dashboard" params={{ org }} search={{ sort }} className={filterLink(!status)}>
          <LayoutList className="size-4" />All posts
          <span className="ml-auto text-xs text-faint tabular-nums">{all.length}</span>
        </Link>
        <p className="mt-5 mb-1 px-2 text-xs font-medium text-faint">Status</p>
        {POST_STATUSES.map((s) => (
          <Link key={s} to="/$org/dashboard" params={{ org }} search={{ status: s, sort }} className={filterLink(status === s)}>
            <StatusIcon status={s} className="size-3.5" />{STATUS_LABEL[s]}
            <span className="ml-auto text-xs text-faint tabular-nums">{all.filter((p) => p.status === s).length}</span>
          </Link>
        ))}
      </nav>

      <section className="min-w-0 flex-1">
        <PageHeader title={status ? STATUS_LABEL[status] : 'All posts'}>
          <InputGroup className="h-8 w-56">
            <InputGroupAddon><Search /></InputGroupAddon>
            <InputGroupInput type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search posts" aria-label="Search posts" className="text-[13px]" />
          </InputGroup>
        </PageHeader>
        <div className="flex h-11 items-center gap-4 border-b px-6 text-[13px]">
          <Link to="/$org/dashboard" params={{ org }} search={{ status }} className={!sort ? 'font-medium' : 'text-muted-foreground hover:text-foreground'}>Top</Link>
          <Link to="/$org/dashboard" params={{ org }} search={{ status, sort: 'new' }} className={sort ? 'font-medium' : 'text-muted-foreground hover:text-foreground'}>Newest</Link>
          <span className="ml-auto text-xs text-faint tabular-nums">{posts.length}</span>
        </div>
        {posts.length === 0 ? (
          <p className="px-6 py-10 text-sm text-muted-foreground">{needle || status ? 'Nothing matches.' : 'No posts yet. Share your board link to get the first one.'}</p>
        ) : (
          <ul aria-label="Posts">
            {posts.map((p) => (
              <li key={p.id} data-testid="inbox-row" className="group flex h-[52px] items-center gap-3 border-b px-6 hover:bg-card/60">
                <StatusIcon status={p.status} />
                <a href={`/${org}/posts/${p.id}`} target="_blank" rel="noreferrer" className="min-w-0 flex-1 truncate text-sm font-medium hover:underline">{p.title}</a>
                <span className="hidden text-xs text-faint sm:inline">{timeAgo(p.createdAt)}</span>
                <StatusSelect value={p.status} label={`Status of ${p.title}`} onChange={(s) => setStatus.mutate({ id: p.id, status: s })} />
                <span className="flex h-7 min-w-11 items-center justify-center gap-0.5 rounded-md border px-2 text-xs font-semibold tabular-nums">
                  <ChevronUp className="size-3" />{p.votes}
                </span>
                <DeletePostButton org={org} post={p} className="text-faint opacity-0 group-hover:opacity-100 focus-visible:opacity-100" />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
