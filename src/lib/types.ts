export type Status = 'open' | 'planned' | 'building' | 'shipped'
export const STATUSES: Status[] = ['open', 'planned', 'building', 'shipped']

export type Post = {
  id: number
  title: string
  body: string
  status: Status
  votes: number
  created_at: number
}
export type Run = { id: number; post_id: number; passed: number; summary: string; created_at: number }
export type Entry = { id: number; post_id: number; title: string; body: string; created_at: number }
