import { Link, createFileRoute, useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { STATUS_LABEL, StatusIcon } from '#/components/StatusPill'
import { listPosts, removePost, setPostStatus } from '#/lib/fns'
import { ago } from '#/lib/time'
import { STATUSES, type Status } from '#/lib/types'
import { PageHead } from '../dashboard'

type Search = { status?: Status; sort?: 'new' }

export const Route = createFileRoute('/$org/dashboard/')({
  validateSearch: (s: Record<string, unknown>): Search => ({
    status: STATUSES.includes(s.status as Status) ? (s.status as Status) : undefined,
    sort: s.sort === 'new' ? 'new' : undefined,
  }),
  loader: ({ params }) => listPosts({ data: params.org }),
  component: Inbox,
})

function Inbox() {
  const all = Route.useLoaderData()
  const { org } = Route.useParams()
  const { status, sort } = Route.useSearch()
  const router = useRouter()
  const [q, setQ] = useState('')
  const [pending, setPending] = useState<Record<number, Status>>({}) // optimistic status changes
  const withPending = all.map((p) => (pending[p.id] ? { ...p, status: pending[p.id] } : p))
  const needle = q.trim().toLowerCase()
  let posts = withPending.filter((p) => (!status || p.status === status) && (!needle || p.title.toLowerCase().includes(needle)))
  if (sort === 'new') posts = [...posts].sort((a, b) => b.id - a.id)

  async function change(id: number, s: Status) {
    setPending((m) => ({ ...m, [id]: s }))
    try {
      await setPostStatus({ data: { org, id, status: s } })
      await router.invalidate()
    } finally {
      setPending((m) => { const n = { ...m }; delete n[id]; return n })
    }
  }

  async function remove(id: number, title: string) {
    if (!confirm(`Delete "${title}"? Its votes and Kane runs go too.`)) return
    await removePost({ data: { org, id } })
    router.invalidate()
  }

  return (
    <div className="flex min-h-screen">
      <nav className="hidden w-[200px] shrink-0 border-r border-line p-3 lg:block" aria-label="Filter by status">
        <p className="mt-2 mb-2 px-2 text-[15px] font-semibold">Posts</p>
        <Link to="/$org/dashboard" params={{ org }} search={{ sort }} className={`flex h-8 items-center gap-2.5 rounded-md px-2 text-[13px] ${!status ? 'bg-hover font-medium text-fg' : 'text-muted hover:bg-hover/60'}`}>
          <svg viewBox="0 0 16 16" className="size-4" aria-hidden><rect x="2.5" y="3" width="11" height="10" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.3" /></svg>
          All posts <span className="ml-auto text-[12px] text-faint tabular-nums">{withPending.length}</span>
        </Link>
        <p className="mt-5 mb-1 px-2 text-[12px] font-medium text-faint">Status</p>
        {STATUSES.map((s) => (
          <Link key={s} to="/$org/dashboard" params={{ org }} search={{ status: s, sort }}
            className={`flex h-8 items-center gap-2.5 rounded-md px-2 text-[13px] ${status === s ? 'bg-hover font-medium text-fg' : 'text-muted hover:bg-hover/60'}`}>
            <StatusIcon status={s} className="size-3.5" />{STATUS_LABEL[s]}
            <span className="ml-auto text-[12px] text-faint tabular-nums">{withPending.filter((p) => p.status === s).length}</span>
          </Link>
        ))}
      </nav>

      <section className="min-w-0 flex-1">
        <PageHead title={status ? STATUS_LABEL[status] : 'All posts'}>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search posts" aria-label="Search posts"
            className="h-8 w-[220px] rounded-md border border-line bg-surface px-3 text-[13px] outline-none placeholder:text-faint focus:border-muted" />
        </PageHead>
        <div className="flex h-11 items-center gap-4 border-b border-line px-6 text-[13px]">
          <Link to="/$org/dashboard" params={{ org }} search={{ status }} className={!sort ? 'font-medium text-fg' : 'text-muted hover:text-fg'}>Top</Link>
          <Link to="/$org/dashboard" params={{ org }} search={{ status, sort: 'new' }} className={sort ? 'font-medium text-fg' : 'text-muted hover:text-fg'}>Newest</Link>
          <span className="ml-auto text-[12px] text-faint tabular-nums">{posts.length}</span>
        </div>
        {posts.length === 0 ? (
          <p className="px-6 py-10 text-[14px] text-muted">{needle || status ? 'Nothing matches.' : 'No posts yet. Share your board link to get the first one.'}</p>
        ) : (
          <ul className="m-0 list-none p-0" aria-label="Posts">
            {posts.map((p) => (
              <li key={p.id} data-testid="inbox-row" className="group flex h-[52px] items-center gap-3 border-b border-line px-6 hover:bg-surface/60">
                <StatusIcon status={p.status} />
                <a href={`/${org}/posts/${p.id}`} target="_blank" rel="noreferrer" className="min-w-0 flex-1 truncate text-[14px] font-medium hover:underline">{p.title}</a>
                <span className="hidden text-[12px] text-faint tabular-nums sm:inline">{ago(p.created_at)}</span>
                <select value={p.status} onChange={(e) => change(p.id, e.target.value as Status)} aria-label={`Status of ${p.title}`}
                  className="h-7 rounded-md border border-line bg-surface px-2 text-[12px] text-muted outline-none hover:border-line-strong">
                  {STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
                </select>
                <span className="flex h-7 min-w-11 items-center justify-center gap-1 rounded-md border border-line px-2 text-[12px] font-semibold tabular-nums">▲ {p.votes}</span>
                <button onClick={() => remove(p.id, p.title)} aria-label={`Delete ${p.title}`}
                  className="flex size-7 items-center justify-center rounded-md text-faint opacity-0 group-hover:opacity-100 hover:bg-hover hover:text-fg focus:opacity-100">
                  <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden><path d="M3 4.5h10M6.5 4.5V3h3v1.5M4.5 4.5l.6 8.5h5.8l.6-8.5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
