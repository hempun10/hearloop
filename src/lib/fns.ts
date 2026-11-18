import { createServerFn } from '@tanstack/react-start'
import { getRequestHeaders } from '@tanstack/react-start/server'
import { auth } from './auth'
import { randomToken, sha256 } from './crypto'
import * as db from './db'
import { RESERVED, SLUG_RE, STATUSES, type Me, type OrgPatch, type Status } from './types'

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')
const num = (v: unknown) => {
  const n = Number(v)
  if (!Number.isInteger(n) || n < 1) throw new Error('bad id')
  return n
}
const slug = (v: unknown) => {
  const s = str(v, 64).toLowerCase()
  if (!s) throw new Error('org required')
  return s
}

async function session() {
  return auth.api.getSession({ headers: getRequestHeaders() as unknown as Headers })
}
async function requireOrg(s: string) {
  const org = await db.orgBySlug(s)
  if (!org) throw new Error('org not found')
  return org
}
async function requireMember(s: string) {
  const [sess, org] = await Promise.all([session(), requireOrg(s)])
  if (!sess || !(await db.isMember(org.id, sess.user.id))) throw new Error('not a member')
  return { org, user: sess.user }
}

// ---- session
export const me = createServerFn().handler(async (): Promise<Me | null> => {
  const s = await session()
  if (!s) return null
  return { user: { id: s.user.id, email: s.user.email, name: s.user.name }, orgs: await db.userOrgs(s.user.id) }
})

// ---- orgs
export const getOrg = createServerFn()
  .validator(slug)
  .handler(async ({ data }) => {
    const org = await db.orgBySlug(data)
    if (!org) return null
    const s = await session()
    return { org, member: !!s && (await db.isMember(org.id, s.user.id)) }
  })

export const createOrg = createServerFn({ method: 'POST' })
  .validator((d: { slug: string; name: string }) => {
    const s = str(d?.slug, 32).toLowerCase()
    const name = str(d?.name, 60)
    if (!name) throw new Error('Give your board a name.')
    if (!SLUG_RE.test(s)) throw new Error('Use 3 to 32 lowercase letters, numbers or dashes.')
    if (RESERVED.includes(s)) throw new Error('That address is reserved. Try another.')
    return { slug: s, name }
  })
  .handler(async ({ data }) => {
    const s = await session()
    if (!s) throw new Error('Sign in first.')
    if (!(await db.createOrg(s.user.id, data.slug, data.name))) return { ok: false as const, error: 'That address is taken. Try another.' }
    return { ok: true as const, slug: data.slug }
  })

// shows the new token once; only its hash is stored
export const regenerateToken = createServerFn({ method: 'POST' })
  .validator(slug)
  .handler(async ({ data }) => {
    const { org } = await requireMember(data)
    const token = randomToken()
    await db.setOrgTokenHash(org.id, await sha256(token))
    return token
  })

export const hasToken = createServerFn()
  .validator(slug)
  .handler(async ({ data }) => {
    const { org } = await requireMember(data)
    return !!(await db.orgTokenHash(org.id))
  })

// ---- board
export const listPosts = createServerFn()
  .validator(slug)
  .handler(async ({ data }) => db.listPosts((await requireOrg(data)).id))

export const listChangelog = createServerFn()
  .validator(slug)
  .handler(async ({ data }) => db.listChangelog((await requireOrg(data)).id))

export const landing = createServerFn()
  .validator(slug)
  .handler(async ({ data }) => db.landing((await requireOrg(data)).id))

export const getPost = createServerFn()
  .validator((d: { org: string; id: number }) => ({ org: slug(d?.org), id: num(d?.id) }))
  .handler(async ({ data }) => db.getPost((await requireOrg(data.org)).id, data.id))

export const createPost = createServerFn({ method: 'POST' })
  .validator((d: { org: string; title: string; body: string }) => {
    const title = str(d?.title, 140)
    if (!title) throw new Error('title required')
    return { org: slug(d?.org), title, body: str(d?.body, 4000) }
  })
  .handler(async ({ data }) => {
    const org = await requireOrg(data.org)
    if (org.who_can_post === 'signed_in' && !(await session())) throw new Error('Sign in to post.')
    return db.createPost(org.id, data.title, data.body)
  })

export const vote = createServerFn({ method: 'POST' })
  .validator((id: number) => num(id))
  .handler(({ data }) => db.vote(data))

// ---- dashboard (members only)
const orgId = (d: { org: string }) => slug(d?.org)

export const setPostStatus = createServerFn({ method: 'POST' })
  .validator((d: { org: string; id: number; status: Status }) => {
    if (!STATUSES.includes(d?.status)) throw new Error('bad status')
    return { org: orgId(d), id: num(d?.id), status: d.status }
  })
  .handler(async ({ data }) => db.setStatus((await requireMember(data.org)).org.id, data.id, data.status))

export const removePost = createServerFn({ method: 'POST' })
  .validator((d: { org: string; id: number }) => ({ org: orgId(d), id: num(d?.id) }))
  .handler(async ({ data }) => db.deletePost((await requireMember(data.org)).org.id, data.id))

export const removeEntry = createServerFn({ method: 'POST' })
  .validator((d: { org: string; id: number }) => ({ org: orgId(d), id: num(d?.id) }))
  .handler(async ({ data }) => db.deleteEntry((await requireMember(data.org)).org.id, data.id))

export const listRuns = createServerFn()
  .validator(slug)
  .handler(async ({ data }) => db.listRuns((await requireMember(data)).org.id))

const HEX = /^#[0-9a-f]{6}$/i
export const updateOrg = createServerFn({ method: 'POST' })
  .validator((d: { org: string; patch: OrgPatch }) => {
    const p = d?.patch ?? {}
    const out: OrgPatch = {}
    if ('name' in p) { out.name = str(p.name, 60); if (!out.name) throw new Error('Name can’t be empty.') }
    if ('tagline' in p) out.tagline = str(p.tagline, 160)
    if ('accent' in p) {
      if (p.accent && !HEX.test(p.accent)) throw new Error('Accent must be a hex colour like #6e8bff.')
      out.accent = p.accent || null
    }
    if ('logo_url' in p) {
      const u = str(p.logo_url, 500)
      if (u && !/^https:\/\/[^\s"'<>]+$/.test(u)) throw new Error('Logo must be an https:// image URL.')
      out.logo_url = u || null
    }
    if ('theme' in p) out.theme = p.theme === 'light' ? 'light' : 'dark'
    for (const k of ['powered_by', 'show_roadmap', 'show_changelog'] as const) if (k in p) out[k] = p[k] ? 1 : 0
    if ('who_can_post' in p) out.who_can_post = p.who_can_post === 'signed_in' ? 'signed_in' : 'anyone'
    return { org: orgId(d), patch: out }
  })
  .handler(async ({ data }) => {
    const { org } = await requireMember(data.org)
    await db.updateOrg(org.id, data.patch)
    return true
  })
