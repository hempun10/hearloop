import { useNavigate } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import type { Post } from '#/db/schema'

/** j/k move, v vote, enter open, c compose. Ignored while typing (react-hotkeys-hook skips form fields). */
export function useBoardShortcuts({ org, posts, onCompose, enabled }: { org: string; posts: Post[]; onCompose: () => void; enabled: boolean }) {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(-1)
  const rows = useRef<(HTMLLIElement | null)[]>([])
  const opts = { enabled, preventDefault: true }

  useHotkeys('c', onCompose, opts, [onCompose])
  useHotkeys('j', () => setSelected((i) => Math.min(posts.length - 1, i + 1)), opts, [posts.length])
  useHotkeys('k', () => setSelected((i) => Math.max(0, i - 1)), opts)
  useHotkeys('v', () => rows.current[selected]?.querySelector<HTMLButtonElement>('[data-vote]')?.click(), opts, [selected])
  useHotkeys('enter', () => {
    const post = posts[selected]
    if (post) navigate({ to: '/$org/posts/$id', params: { org, id: String(post.id) } })
  }, opts, [selected, posts, org])

  useEffect(() => rows.current[selected]?.scrollIntoView({ block: 'nearest' }), [selected])

  return { selected, resetSelection: () => setSelected(-1), rowRef: (i: number) => (el: HTMLLIElement | null) => { rows.current[i] = el } }
}
