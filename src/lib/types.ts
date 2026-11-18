export type Status = 'open' | 'planned' | 'building' | 'shipped'
export const STATUSES: Status[] = ['open', 'planned', 'building', 'shipped']

export type Post = {
  id: number
  org_id: number
  title: string
  body: string
  status: Status
  votes: number
  created_at: number
}
export type Run = { id: number; post_id: number; passed: number; summary: string; created_at: number }
export type Entry = { id: number; post_id: number; title: string; body: string; created_at: number }
export type Org = {
  id: number
  slug: string
  name: string
  tagline: string
  accent: string | null
  logo_url: string | null
  theme: 'dark' | 'light'
  powered_by: number
  show_roadmap: number
  show_changelog: number
  who_can_post: 'anyone' | 'signed_in'
  created_at: number
}
export type OrgPatch = Partial<Pick<Org, 'name' | 'tagline' | 'accent' | 'logo_url' | 'theme' | 'powered_by' | 'show_roadmap' | 'show_changelog' | 'who_can_post'>>
export type RunRow = Run & { title: string }
export type Me = { user: { id: string; email: string; name: string }; orgs: { slug: string; name: string; role: string }[] }

// slugs that would shadow app routes
export const RESERVED = ['api', 'login', 'new', 'demo', 'settings', 'admin', 'assets', 'changelog', 'board', 'posts']
export const SLUG_RE = /^[a-z0-9][a-z0-9-]{1,30}[a-z0-9]$/
