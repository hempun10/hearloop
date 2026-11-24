import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { Post, PostStatus } from '#/db/schema'
import { patchPostInCache } from './post.cache'
import { createPost, deletePost, mergePost, setPostStatus, setTags, votePost } from './post.functions'
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

export function useSetTags(org: string, id: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (tags: string[]) => setTags({ data: { org, id, tags } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: postKeys.detail(org, id) })
      qc.invalidateQueries({ queryKey: ['tags', org] })
    },
    onError: errorToast,
  })
}

export function useMergePost(org: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, into }: { id: number; into: number }) => mergePost({ data: { org, id, into } }),
    onSuccess: (r) => {
      toast.success(r.already ? 'Already merged.' : `Merged. ${r.votesAdded} vote${r.votesAdded === 1 ? '' : 's'} moved over.`)
      qc.invalidateQueries({ queryKey: postKeys.all(org) })
      qc.invalidateQueries({ queryKey: ['comments', org] })
    },
    onError: errorToast,
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
