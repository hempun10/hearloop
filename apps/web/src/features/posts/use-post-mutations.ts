import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { Post, PostStatus } from '#/db/schema'
import { patchPostInCache } from './post.cache'
import { createPost, deletePost, setPostStatus, votePost } from './post.functions'
import { postKeys } from './post.queries'
import type { NewPostInput } from './post.schema'

const errorToast = (e: Error) => toast.error(e.message || 'Something went wrong.')

export function useCreatePost(org: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (input: NewPostInput) => createPost({ data: { org, ...input } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: postKeys.all(org) }),
  })
}

export function useVotePost(org: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => votePost({ data: { id } }),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: postKeys.all(org) })
      return { undo: patchPostInCache(qc, org, id, (p) => ({ ...p, votes: p.votes + 1 })) }
    },
    onError: (e, _id, ctx) => { ctx?.undo(); errorToast(e) },
    onSettled: () => qc.invalidateQueries({ queryKey: postKeys.all(org) }),
  })
}

export function useSetPostStatus(org: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: PostStatus }) => setPostStatus({ data: { org, id, status } }),
    onMutate: async ({ id, status }) => {
      await qc.cancelQueries({ queryKey: postKeys.all(org) })
      return { undo: patchPostInCache(qc, org, id, (p) => ({ ...p, status })) }
    },
    onError: (e, _v, ctx) => { ctx?.undo(); errorToast(e) },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: postKeys.all(org) })
      qc.invalidateQueries({ queryKey: ['changelog', org] }) // shipping or un-shipping adds or removes an entry
    },
  })
}

export function useDeletePost(org: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (post: Pick<Post, 'id' | 'title'>) => deletePost({ data: { org, id: post.id } }),
    onSuccess: (_r, post) => {
      toast.success(`Deleted “${post.title}”`)
      qc.invalidateQueries({ queryKey: postKeys.all(org) })
      qc.invalidateQueries({ queryKey: ['changelog', org] })
      qc.invalidateQueries({ queryKey: ['runs', org] })
    },
    onError: errorToast,
  })
}
