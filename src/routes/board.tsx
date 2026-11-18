import { Link, createFileRoute, useNavigate, useRouter } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import PrimaryButton from '#/components/PrimaryButton'
import StatusPill, { STATUS_DOT, STATUS_LABEL } from '#/components/StatusPill'
import VoteButton from '#/components/VoteButton'
import { STATUSES } from '#/lib/types'
import { createPost, listPosts } from '#/lib/fns'
import { ago } from '#/lib/time'

type Sort = 'top' | 'new'

export const Route = createFileRoute('/board')({
  validateSearch: (s: Record<string, unknown>): { sort?: Sort } => (s.sort === 'new' ? { sort: 'new' } : {}),
  loader: () => listPosts(),
  component: Board,
})

function Board() {
  const all = Route.useLoaderData()
  const { sort = 'top' } = Route.useSearch()
  const [q, setQ] = useState('')
  const sorted = sort === 'new' ? [...all].sort((a, b) => b.id - a.id) : all
  const needle = q.trim().toLowerCase()
  const posts = needle ? sorted.filter((p) => p.title.toLowerCase().includes(needle)) : sorted
  const [composing, setComposing] = useState(false)
  const [sel, setSel] = useState(-1)
  const navigate = useNavigate()
  const router = useRouter()
  const rows = useRef<(HTMLLIElement | null)[]>([])

  // j k move, v vote, enter open, c new post
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement
      if (t.closest('input, textarea') || e.metaKey || e.ctrlKey) return
      if (e.key === 'c') { e.preventDefault(); setComposing(true) }
      else if (e.key === 'j') setSel((i) => Math.min(posts.length - 1, i + 1))
      else if (e.key === 'k') setSel((i) => Math.max(0, i - 1))
      else if (e.key === 'v' && posts[sel]) rows.current[sel]?.querySelector<HTMLButtonElement>('[data-vote]')?.click()
      else if (e.key === 'Enter' && posts[sel]) navigate({ to: '/posts/$id', params: { id: String(posts[sel].id) } })
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [posts, sel, navigate])
  useEffect(() => rows.current[sel]?.scrollIntoView({ block: 'nearest' }), [sel])

  const counts = Object.fromEntries(STATUSES.map((s) => [s, all.filter((p) => p.status === s).length]))

  return (
    <main className="mx-auto flex max-w-[1008px] flex-col gap-12 px-4 pt-10 md:flex-row md:px-0">
      <section className="min-w-0 flex-1 md:max-w-[720px]">
        <div className="mb-4 flex items-center gap-5 text-[14px]">
          {(['top', 'new'] as const).map((s) => (
            <Link key={s} to="/board" search={s === 'top' ? {} : { sort: s }}
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

        {composing && <Composer onDone={() => { setComposing(false); router.invalidate() }} />}

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
                  <Link to="/posts/$id" params={{ id: String(p.id) }} className="text-[15px] font-semibold hover:underline">
                    {p.title}
                  </Link>
                  {p.body && <p className="mt-1.5 mb-0 line-clamp-2 text-[14px] leading-6 text-muted">{p.body}</p>}
                  <div className="mt-2 flex items-center gap-3 text-[12px] text-faint">
                    {p.status !== 'open' && <StatusPill status={p.status} />}
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
        <p className="mt-8 mb-2 px-2.5 text-[12px] font-medium text-muted">Roadmap</p>
        <ul className="m-0 list-none p-0">
          {STATUSES.filter((s) => s !== 'open').map((s) => (
            <li key={s} className="flex h-9 items-center gap-2.5 px-2.5 text-[14px] text-muted">
              <span className={`size-1.5 rounded-full ${STATUS_DOT[s]}`} />
              {STATUS_LABEL[s]}
              <span className="ml-auto text-[12px] tabular-nums">{counts[s]}</span>
            </li>
          ))}
        </ul>
        <p className="mt-8 px-2.5 text-[12px] leading-5 text-faint">
          The top request is picked up by a coding agent. It ships only after Kane CLI verifies it in a real browser.
        </p>
      </aside>
    </main>
  )
}

function Composer({ onDone }: { onDone: () => void }) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function submit(e: { preventDefault(): void }) {
    e.preventDefault()
    if (!title.trim()) return setError('Give it a title.')
    setBusy(true)
    try {
      await createPost({ data: { title, body } })
      onDone()
    } catch {
      setError('Could not post. Try again.')
      setBusy(false)
    }
  }

  return (
    <form onSubmit={submit} aria-label="New request" className="mb-6 rounded-xl border border-line bg-surface p-4"
      onKeyDown={(e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) submit(e); if (e.key === 'Escape') onDone() }}>
      <input autoFocus name="title" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={140} placeholder="Short title"
        aria-label="Title" className="w-full bg-transparent text-[15px] font-semibold outline-none placeholder:text-faint" />
      <textarea name="body" value={body} onChange={(e) => setBody(e.target.value)} maxLength={4000} rows={3}
        aria-label="Details" placeholder="What should happen, and how would you know it works?"
        className="mt-2 w-full resize-none bg-transparent text-[14px] leading-6 text-muted outline-none placeholder:text-faint" />
      <div className="mt-2 flex items-center gap-3">
        {error && <span role="alert" className="text-[12px] text-planned">{error}</span>}
        <button type="button" onClick={onDone} className="ml-auto h-8 rounded-md px-3 text-[13px] text-muted hover:bg-hover">Cancel</button>
        <button disabled={busy} className="h-8 rounded-md bg-fg px-3 text-[13px] font-semibold text-bg disabled:opacity-50">
          {busy ? 'Posting' : 'Post request'}
        </button>
      </div>
    </form>
  )
}
