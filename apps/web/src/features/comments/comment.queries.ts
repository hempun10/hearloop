import { queryOptions } from '@tanstack/react-query'
import { getComments } from './comment.functions'

export const commentKeys = { post: (org: string, id: number) => ['comments', org, id] as const }

export const commentsQuery = (org: string, id: number) =>
  queryOptions({ queryKey: commentKeys.post(org, id), queryFn: () => getComments({ data: { org, id } }) })
