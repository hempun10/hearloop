import { queryOptions } from '@tanstack/react-query'
import { getPost, getTags, listPosts } from './post.functions'

export const postKeys = {
  all: (org: string) => ['posts', org] as const,
  list: (org: string) => [...postKeys.all(org), 'list'] as const,
  detail: (org: string, id: number) => [...postKeys.all(org), 'detail', id] as const,
}

export const postListQuery = (org: string) =>
  queryOptions({ queryKey: postKeys.list(org), queryFn: () => listPosts({ data: { org } }) })

export const tagsQuery = (org: string) =>
  queryOptions({ queryKey: ['tags', org], queryFn: () => getTags({ data: { org } }) })

export const postQuery = (org: string, id: number) =>
  queryOptions({ queryKey: postKeys.detail(org, id), queryFn: () => getPost({ data: { org, id } }) })
