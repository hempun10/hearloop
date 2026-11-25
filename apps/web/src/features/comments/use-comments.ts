import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { postComment, removeComment } from './comment.functions'
import { commentKeys } from './comment.queries'
import type { NewCommentInput } from './comment.schema'

export function useAddComment(org: string, id: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (input: NewCommentInput) => postComment({ data: { org, id, ...input } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: commentKeys.post(org, id) }),
  })
}

export function useRemoveComment(org: string, postId: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => removeComment({ data: { org, id } }),
    onSuccess: () => {
      toast.success('Comment removed')
      qc.invalidateQueries({ queryKey: commentKeys.post(org, postId) })
    },
    onError: (e: Error) => toast.error(e.message),
  })
}
