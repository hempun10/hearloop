import type { QueryClient } from '@tanstack/react-query'
import type { Post } from '#/db/schema'
import { postKeys } from './post.queries'

type Detail = { post: Post } | null

/** Applies a change to one post in every cached list and detail for the board. Returns an undo. */
export function patchPostInCache(qc: QueryClient, org: string, id: number, patch: (p: Post) => Post) {
  const snapshot = qc.getQueriesData({ queryKey: postKeys.all(org) })
  qc.setQueriesData<Post[] | Detail>({ queryKey: postKeys.all(org) }, (data) => {
    if (!data) return data
    if (Array.isArray(data)) return data.map((p) => (p.id === id ? patch(p) : p))
    return data.post.id === id ? { ...data, post: patch(data.post) } : data
  })
  return () => {
    for (const [key, data] of snapshot) qc.setQueryData(key, data)
  }
}
