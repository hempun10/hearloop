import { and, eq } from 'drizzle-orm'
import { db } from '#/db/client.server'
import { members, orgs } from '#/db/schema'
import { randomToken, sha256 } from '#/lib/crypto.server'
import type { CreateOrgInput, OrgSettings } from './org.schema'

export async function findOrg(slug: string) {
  const org = await db.query.orgs.findFirst({ where: eq(orgs.slug, slug) })
  if (!org) return null
  const { tokenHash, ...rest } = org
  return { ...rest, hasToken: !!tokenHash }
}
export type PublicOrg = NonNullable<Awaited<ReturnType<typeof findOrg>>>

export async function findOrgOrThrow(slug: string) {
  const org = await findOrg(slug)
  if (!org) throw new Error('Board not found.')
  return org
}

export async function isMember(orgId: number, userId: string) {
  return !!(await db.query.members.findFirst({ where: and(eq(members.orgId, orgId), eq(members.userId, userId)) }))
}

/** The org, if this user may manage it; throws otherwise. */
export async function requireMembership(slug: string, userId: string) {
  const org = await findOrgOrThrow(slug)
  if (!(await isMember(org.id, userId))) throw new Error('You are not a member of this board.')
  return org
}

export async function orgsForUser(userId: string) {
  return db
    .select({ slug: orgs.slug, name: orgs.name, role: members.role })
    .from(members)
    .innerJoin(orgs, eq(orgs.id, members.orgId))
    .where(eq(members.userId, userId))
    .orderBy(orgs.id)
}

export async function createOrgForUser(userId: string, input: CreateOrgInput) {
  const taken = await db.query.orgs.findFirst({ where: eq(orgs.slug, input.slug), columns: { id: true } })
  if (taken) throw new Error('That address is taken. Try another.')
  const [org] = await db.insert(orgs).values(input).returning({ id: orgs.id, slug: orgs.slug })
  await db.insert(members).values({ orgId: org.id, userId, role: 'owner' })
  return org
}

export async function updateOrgSettings(orgId: number, s: OrgSettings) {
  await db
    .update(orgs)
    .set({ ...s, accent: s.accent || null, logoUrl: s.logoUrl || null })
    .where(eq(orgs.id, orgId))
}

/** Issues a new loop token; only its hash is stored, so this is the one time it can be read. */
export async function rotateToken(orgId: number) {
  const token = randomToken()
  await db.update(orgs).set({ tokenHash: await sha256(token) }).where(eq(orgs.id, orgId))
  return token
}

export async function tokenHashFor(orgId: number) {
  return (await db.query.orgs.findFirst({ where: eq(orgs.id, orgId), columns: { tokenHash: true } }))?.tokenHash ?? null
}
