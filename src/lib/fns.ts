import { createServerFn } from '@tanstack/react-start'
import { getRequestHeaders } from '@tanstack/react-start/server'
import { auth } from './auth'
import { randomToken, sha256 } from './crypto'
import * as db from './db'
import { RESERVED, SLUG_RE, type Me } from './types'

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
  .handler(async ({ data }) => db.createPost((await requireOrg(data.org)).id, data.title, data.body))

export const vote = createServerFn({ method: 'POST' })
  .validator((id: number) => num(id))
  .handler(({ data }) => db.vote(data))
