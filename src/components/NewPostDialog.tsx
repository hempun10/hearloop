import { Link, useNavigate, useRouter } from '@tanstack/react-router'
import { useEffect, useMemo, useRef, useState } from 'react'
import { createPost } from '#/lib/fns'
import type { Post } from '#/lib/types'
import { Kbd } from './Footer'

const STOP = new Set(['the', 'and', 'for', 'with', 'add', 'make', 'can', 'when', 'from', 'that', 'this', 'should', 'would', 'please', 'able'])
const words = (s: string) => s.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 2 && !STOP.has(w))

// existing posts that share words with the draft title, best match first
function similar(title: string, posts: Post[]) {
  const want = new Set(words(title))
  if (title.trim().length < 4 || !want.size) return []
  return posts
    .map((p) => ({ p, score: words(p.title).filter((w) => want.has(w)).length }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || b.p.votes - a.p.votes)
    .slice(0, 3)
    .map((x) => x.p)
}

export default function NewPostDialog({ org, posts, open, onClose, mustSignIn }: {
  org: string
  posts: Post[]
  open: boolean
  onClose: () => void
  mustSignIn: boolean
}) {
  const ref = useRef<HTMLDialogElement>(null)
  const router = useRouter()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const matches = useMemo(() => similar(title, posts), [title, posts])

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  async function submit() {
    if (title.trim().length < 4) return setError('Give it a title of a few words.')
    setBusy(true)
    setError('')
    try {
      const post = await createPost({ data: { org, title, body } })
      setTitle('')
      setBody('')
      onClose()
      await router.invalidate()
      if (post) navigate({ to: '/$org/posts/$id', params: { org, id: String(post.id) } })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not post. Try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <dialog ref={ref} onClose={onClose} aria-labelledby="new-post-title"
      className="m-auto w-[min(560px,calc(100vw-2rem))] rounded-2xl border border-line-strong bg-surface p-0 text-fg shadow-[0_30px_80px_-20px_rgb(0_0_0/0.6)]">
      {mustSignIn ? (
        <div className="p-6">
          <h2 id="new-post-title" className="m-0 text-[17px] font-semibold">Sign in to post</h2>
          <p className="mt-2 text-[14px] text-muted">This board asks people to sign in before posting. Voting stays open to everyone.</p>
          <div className="mt-6 flex justify-end gap-2">
            <button onClick={onClose} className="h-9 rounded-md px-3 text-[13px] text-muted hover:bg-hover">Cancel</button>
            <Link to="/login" search={{ next: `/${org}` }} className="inline-flex h-9 items-center rounded-md bg-fg px-4 text-[13px] font-semibold text-bg hover:opacity-90">Sign in</Link>
          </div>
        </div>
      ) : (
        <form method="dialog" onSubmit={(e) => { e.preventDefault(); submit() }}
          onKeyDown={(e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); submit() } }}>
          <div className="flex items-center justify-between border-b border-line px-5 py-3">
            <h2 id="new-post-title" className="m-0 text-[14px] font-semibold">New post</h2>
            <button type="button" onClick={onClose} aria-label="Close" className="flex size-7 items-center justify-center rounded-md text-faint hover:bg-hover hover:text-fg">
              <svg viewBox="0 0 12 12" className="size-3"><path d="M2.5 2.5l7 7m0-7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
            </button>
          </div>
          <div className="px-5 pt-4">
            <input autoFocus value={title} onChange={(e) => setTitle(e.target.value)} maxLength={140} aria-label="Title"
              placeholder="Short, specific title" className="w-full bg-transparent text-[18px] font-semibold outline-none placeholder:text-faint" />
            <textarea value={body} onChange={(e) => setBody(e.target.value)} maxLength={4000} rows={5} aria-label="Details"
              placeholder="What should happen, and how would you know it works?"
              className="mt-3 w-full resize-none bg-transparent text-[14px] leading-6 text-muted outline-none placeholder:text-faint" />
          </div>
          {matches.length > 0 && (
            <div className="mx-5 mb-3 rounded-lg border border-line bg-bg/60 p-3" aria-live="polite">
              <p className="m-0 text-[12px] font-medium text-muted">Similar requests. Vote on one instead?</p>
              <ul className="mt-2 mb-0 grid list-none gap-1 p-0">
                {matches.map((p) => (
                  <li key={p.id}>
                    <Link to="/$org/posts/$id" params={{ org, id: String(p.id) }} onClick={onClose}
                      className="flex items-center gap-2 rounded-md px-2 py-1.5 text-[13px] hover:bg-hover">
                      <span className="min-w-0 flex-1 truncate">{p.title}</span>
                      <span className="text-[12px] text-faint tabular-nums">▲ {p.votes}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex items-center gap-3 border-t border-line px-5 py-3">
            {error ? <span role="alert" className="text-[12px] text-planned">{error}</span> : <span className="text-[12px] text-faint"><Kbd>⌘</Kbd> <Kbd>enter</Kbd> to post</span>}
            <button type="button" onClick={onClose} className="ml-auto h-9 rounded-md px-3 text-[13px] text-muted hover:bg-hover">Cancel</button>
            <button disabled={busy} className="h-9 rounded-md bg-fg px-4 text-[13px] font-semibold text-bg hover:opacity-90 disabled:opacity-50">
              {busy ? 'Posting' : 'Post'}
            </button>
          </div>
        </form>
      )}
    </dialog>
  )
}
