import { and, asc, eq, gt, isNull } from 'drizzle-orm'
import { db } from '#/db/client.server'
import { apiTokens, invites, members, orgs, user } from '#/db/schema'
import { randomToken, sha256 } from '#/lib/crypto.server'

const INVITE_DAYS = 7

export async function listTeam(orgId: number) {
  const [people, pending, agents] = await Promise.all([
    db.select({ id: user.id, name: user.name, email: user.email }).from(members).innerJoin(user, eq(user.id, members.userId)).where(eq(members.orgId, orgId)).orderBy(asc(user.name)),
    db.select({ id: invites.id, expiresAt: invites.expiresAt, createdAt: invites.createdAt, by: user.name }).from(invites).leftJoin(user, eq(user.id, invites.createdBy))
      .where(and(eq(invites.orgId, orgId), isNull(invites.acceptedAt), gt(invites.expiresAt, new Date()))).orderBy(asc(invites.id)),
    // coding agents: every live token and MCP connection can be assigned work
    db.select({ id: apiTokens.id, name: apiTokens.name, icon: apiTokens.icon }).from(apiTokens).where(and(eq(apiTokens.orgId, orgId), isNull(apiTokens.revokedAt))).orderBy(asc(apiTokens.name)),
  ])
  return { members: people, invites: pending, agents }
}

/** A single-use link, valid for a week. Only its hash is kept, so this is the one time it can be read. */
export async function createInvite(orgId: number, userId: string) {
  const token = randomToken().replace('hl_', 'inv_')
  await db.insert(invites).values({ orgId, createdBy: userId, tokenHash: await sha256(token), expiresAt: new Date(Date.now() + INVITE_DAYS * 864e5) })
  return token
}

export async function revokeInvite(orgId: number, id: number) {
  await db.delete(invites).where(and(eq(invites.id, id), eq(invites.orgId, orgId), isNull(invites.acceptedAt)))
}

async function liveInvite(token: string) {
  const [row] = await db.select({ id: invites.id, orgId: invites.orgId, slug: orgs.slug, name: orgs.name }).from(invites).innerJoin(orgs, eq(orgs.id, invites.orgId))
    .where(and(eq(invites.tokenHash, await sha256(token)), isNull(invites.acceptedAt), gt(invites.expiresAt, new Date())))
  return row ?? null
}

export async function peekInvite(token: string) {
  const row = await liveInvite(token)
  return row ? { slug: row.slug, name: row.name } : null
}

/** Makes the user a member. One conditional UPDATE marks the link used, so two people can't both take it. */
export async function acceptInvite(token: string, userId: string) {
  const row = await liveInvite(token)
  if (!row) return { error: 'This invite link was already used or has expired. Ask for a new one.' }
  const existing = await db.query.members.findFirst({ where: and(eq(members.orgId, row.orgId), eq(members.userId, userId)) })
  if (existing) return { slug: row.slug }
  const [taken] = await db.update(invites).set({ acceptedBy: userId, acceptedAt: new Date() })
    .where(and(eq(invites.id, row.id), isNull(invites.acceptedAt))).returning({ id: invites.id })
  if (!taken) return { error: 'This invite link was already used. Ask for a new one.' }
  await db.insert(members).values({ orgId: row.orgId, userId, role: 'owner' }).onConflictDoNothing()
  return { slug: row.slug }
}

export async function removeMember(orgId: number, userId: string) {
  const all = await db.select({ id: members.userId }).from(members).where(eq(members.orgId, orgId))
  if (!all.some((m) => m.id === userId)) return { error: 'Not a member of this board.' }
  if (all.length === 1) return { error: 'A board needs at least one member.' }
  await db.delete(members).where(and(eq(members.orgId, orgId), eq(members.userId, userId)))
  return {}
}

/** An assignee key ("u:…" member, "a:…" agent) checked against this board; null key clears, null result means not allowed. */
export async function resolveAssignee(orgId: number, key: string | null) {
  if (!key) return { assigneeId: null, assigneeTokenId: null }
  if (key.startsWith('u:')) {
    const m = await db.query.members.findFirst({ where: and(eq(members.orgId, orgId), eq(members.userId, key.slice(2))) })
    return m ? { assigneeId: m.userId, assigneeTokenId: null } : null
  }
  const t = await db.query.apiTokens.findFirst({ where: and(eq(apiTokens.orgId, orgId), eq(apiTokens.id, Number(key.slice(2))), isNull(apiTokens.revokedAt)) })
  return t ? { assigneeId: null, assigneeTokenId: t.id } : null
}
