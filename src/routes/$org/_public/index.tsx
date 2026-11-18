import { Link, createFileRoute, useLoaderData, useNavigate, useRouteContext } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import NewPostDialog from '#/components/NewPostDialog'
import PrimaryButton from '#/components/PrimaryButton'
import { STATUS_LABEL, StatusIcon } from '#/components/StatusPill'
import VoteButton from '#/components/VoteButton'
import { listPosts } from '#/lib/fns'
import { ago } from '#/lib/time'
import { STATUSES } from '#/lib/types'

type Sort = 'top' | 'new'

export const Route = createFileRoute('/$org/_public/')({
  validateSearch: (s: Record<string, unknown>): { sort?: Sort } => (s.sort === 'new' ? { sort: 'new' } : {}),
  loader: ({ params }) => listPosts({ data: params.org }),
  component: Board,
})

function Board() {
  const all = Route.useLoaderData()
  const { org } = useLoaderData({ from: '/$org' })
  const { me } = useRouteContext({ from: '__root__' })
  const { sort = 'top' } = Route.useSearch()
  const [q, setQ] = useState('')
  const [composing, setComposing] = useState(false)
  const [sel, setSel] = useState(-1)
  const navigate = useNavigate()
  const rows = useRef<(HTMLLIElement | null)[]>([])
  const sorted = sort === 'new' ? [...all].sort((a, b) => b.id - a.id) : all
  const needle = q.trim().toLowerCase()
  const posts = needle ? sorted.filter((p) => p.title.toLowerCase().includes(needle)) : sorted
  const slug = org.slug

  // j k move, v vote, enter open, c new post
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement
      if (t.closest('input, textarea, dialog') || e.metaKey || e.ctrlKey) return
      if (e.key === 'c') { e.preventDefault(); setComposing(true) }
      else if (e.key === 'j') setSel((i) => Math.min(posts.length - 1, i + 1))
      else if (e.key === 'k') setSel((i) => Math.max(0, i - 1))
      else if (e.key === 'v' && posts[sel]) rows.current[sel]?.querySelector<HTMLButtonElement>('[data-vote]')?.click()
      else if (e.key === 'Enter' && posts[sel]) navigate({ to: '/$org/posts/$id', params: { org: slug, id: String(posts[sel].id) } })
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [posts, sel, navigate, slug])
  useEffect(() => rows.current[sel]?.scrollIntoView({ block: 'nearest' }), [sel])

  const counts = Object.fromEntries(STATUSES.map((s) => [s, all.filter((p) => p.status === s).length]))

  return (
    <main className="mx-auto max-w-[1008px] px-4 pt-10 md:px-0">
      <div className="mb-8">
        <h1 className="m-0 text-[24px] font-semibold">{org.name}</h1>
        {org.tagline && <p className="mt-1.5 mb-0 max-w-xl text-[14px] leading-6 text-muted">{org.tagline}</p>}
      </div>
      <div className="flex flex-col gap-12 md:flex-row">
        <section className="min-w-0 flex-1 md:max-w-[720px]">
          <div className="mb-4 flex items-center gap-5 text-[14px]">
            {(['top', 'new'] as const).map((s) => (
              <Link key={s} to="/$org" params={{ org: slug }} search={s === 'top' ? {} : { sort: s }}
                className={sort === s ? 'font-semibold text-fg' : 'text-muted hover:text-fg'}>
                {s === 'top' ? 'Top' : 'New'}
              </Link>
            ))}
            <span className="ml-auto text-[12px] text-muted tabular-nums">{all.length} posts</span>
          </div>

          <input type="search" value={q} onChange={(e) => { setQ(e.target.value); setSel(-1) }}
            onKeyDown={(e) => { if (e.key === 'Escape') setQ('') }}
            placeholder="Search requests" aria-label="Search requests"
            className="mb-4 h-9 w-full rounded-md border border-line bg-surface px-3 text-[14px] outline-none placeholder:text-faint focus:border-muted" />

          {posts.length === 0 ? (
            <p className="border-t border-line py-10 text-[14px] text-muted">
              {needle ? `No requests match "${q.trim()}".` : 'No requests yet. Post the first idea.'}
            </p>
          ) : (
            <ol className="m-0 list-none p-0" aria-label="Requests">
              {posts.map((p, i) => (
                <li key={p.id} ref={(el) => { rows.current[i] = el }} data-testid="post"
                  className={`flex gap-4 border-t border-line py-4 transition-colors duration-150 first:border-t-0 ${sel === i ? 'bg-surface' : ''}`}>
                  <span className="w-8 shrink-0 pt-0.5 text-[12px] text-faint tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  <div className="min-w-0 flex-1">
                    <Link to="/$org/posts/$id" params={{ org: slug, id: String(p.id) }} className="text-[15px] font-semibold hover:underline">
                      {p.title}
                    </Link>
                    {p.body && <p className="mt-1.5 mb-0 line-clamp-2 text-[14px] leading-6 text-muted">{p.body}</p>}
                    <div className="mt-2 flex items-center gap-3 text-[12px] text-faint">
                      {p.status !== 'open' && (
                        <span data-testid="status" className="inline-flex items-center gap-1.5 font-medium text-fg"><StatusIcon status={p.status} className="size-3.5" />{STATUS_LABEL[p.status]}</span>
                      )}
                      <span className="tabular-nums">{ago(p.created_at)}</span>
                    </div>
                  </div>
                  <VoteButton id={p.id} count={p.votes} />
                </li>
              ))}
            </ol>
          )}
        </section>

        <aside className="w-full shrink-0 md:w-[240px]">
          <PrimaryButton onClick={() => setComposing(true)}>Post idea</PrimaryButton>
          {!!org.show_roadmap && (
            <>
              <p className="mt-8 mb-2 px-2.5 text-[12px] font-medium text-muted">Roadmap</p>
              <ul className="m-0 list-none p-0">
                {STATUSES.filter((s) => s !== 'open').map((s) => (
                  <li key={s}>
                    <Link to="/$org/roadmap" params={{ org: slug }} className="flex h-9 items-center gap-2.5 rounded-md px-2.5 text-[14px] text-muted hover:bg-hover hover:text-fg">
                      <StatusIcon status={s} className="size-3.5" />
                      {STATUS_LABEL[s]}
                      <span className="ml-auto text-[12px] tabular-nums">{counts[s]}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
          <p className="mt-8 px-2.5 text-[12px] leading-5 text-faint">
            The top request is picked up by a coding agent. It ships only after Kane CLI verifies it in a real browser.
          </p>
        </aside>
      </div>

      <NewPostDialog org={slug} posts={all} open={composing} onClose={() => setComposing(false)}
        mustSignIn={org.who_can_post === 'signed_in' && !me} />
    </main>
  )
}
