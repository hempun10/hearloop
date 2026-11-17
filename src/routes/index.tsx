import { Link, createFileRoute, useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import StatusPill from '#/components/StatusPill'
import { createPost, listPosts, vote } from '#/lib/fns'

export const Route = createFileRoute('/')({
  loader: () => listPosts(),
  component: Board,
})

// ponytail: per-browser vote dedupe via localStorage; add accounts if abuse matters
const voted = () => new Set<number>(JSON.parse(localStorage.getItem('voted') ?? '[]'))

function Board() {
  const posts = Route.useLoaderData()
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    setBusy(true)
    await createPost({ data: { title, body } })
    setTitle('')
    setBody('')
    setBusy(false)
    router.invalidate()
  }

  async function upvote(id: number) {
    const v = voted()
    if (v.has(id)) return
    v.add(id)
    localStorage.setItem('voted', JSON.stringify([...v]))
    await vote({ data: id })
    router.invalidate()
  }

  return (
    <main className="page-wrap px-4 pb-8 pt-10">
      <h1 className="mb-2 text-3xl font-bold tracking-tight">Feedback</h1>
      <p className="mb-6 text-[var(--sea-ink-soft)]">Ask for something. The top request gets built by an agent and verified by Kane CLI before it ships.</p>

      <form onSubmit={submit} className="island-shell mb-8 grid gap-3 rounded-2xl p-5" aria-label="New request">
        <label className="grid gap-1 text-sm font-semibold">
          Title
          <input name="title" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={140} required
            className="rounded-lg border border-[var(--line)] bg-[var(--surface-strong)] px-3 py-2 font-normal" placeholder="Dark mode toggle in the header" />
        </label>
        <label className="grid gap-1 text-sm font-semibold">
          Details
          <textarea name="body" value={body} onChange={(e) => setBody(e.target.value)} maxLength={4000} rows={3}
            className="rounded-lg border border-[var(--line)] bg-[var(--surface-strong)] px-3 py-2 font-normal" placeholder="What should happen, and how would you know it works?" />
        </label>
        <button disabled={busy} className="justify-self-start rounded-full bg-[var(--lagoon-deep)] px-5 py-2 text-sm font-semibold text-white disabled:opacity-50">
          {busy ? 'Posting…' : 'Post request'}
        </button>
      </form>

      {posts.length === 0 ? (
        <p className="text-[var(--sea-ink-soft)]">No requests yet. Be the first.</p>
      ) : (
        <ul className="m-0 grid list-none gap-3 p-0" aria-label="Requests">
          {posts.map((p) => (
            <li key={p.id} data-testid="post" className="island-shell flex items-center gap-4 rounded-2xl p-4">
              <button onClick={() => upvote(p.id)} aria-label={`Upvote ${p.title}`}
                className="flex w-14 shrink-0 flex-col items-center rounded-xl border border-[var(--line)] py-1.5 text-sm font-bold hover:bg-[var(--link-bg-hover)]">
                ▲<span data-testid="votes">{p.votes}</span>
              </button>
              <div className="min-w-0 flex-1">
                <Link to="/posts/$id" params={{ id: String(p.id) }} className="font-semibold text-[var(--sea-ink)] no-underline hover:underline">
                  {p.title}
                </Link>
                {p.body && <p className="m-0 truncate text-sm text-[var(--sea-ink-soft)]">{p.body}</p>}
              </div>
              <StatusPill status={p.status} />
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
