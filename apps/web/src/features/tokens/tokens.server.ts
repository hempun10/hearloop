import { and, desc, eq, isNull } from 'drizzle-orm'
import { db } from '#/db/client.server'
import { apiTokens, oauthClient, user } from '#/db/schema'
import { randomToken, sha256 } from '#/lib/crypto.server'
import { agentName } from '#/lib/oauth-client-name'

/** Who is calling the API: one token, and a label for the board ("Asha · laptop"). */
export type Actor = { tokenId: number; label: string }

export function listTokens(orgId: number) {
  return db
    .select({
      id: apiTokens.id, name: apiTokens.name, hint: apiTokens.hint, createdAt: apiTokens.createdAt,
      lastUsedAt: apiTokens.lastUsedAt, revokedAt: apiTokens.revokedAt, createdBy: user.name, icon: apiTokens.icon,
    })
    .from(apiTokens)
    .leftJoin(user, eq(user.id, apiTokens.createdBy))
    .where(eq(apiTokens.orgId, orgId))
    .orderBy(desc(apiTokens.id))
}

/** Issues a token; only its hash is stored, so this is the one time it can be read. */
export async function createToken(orgId: number, userId: string, name: string) {
  const token = randomToken()
  await db.insert(apiTokens).values({ orgId, name, createdBy: userId, tokenHash: await sha256(token), hint: token.slice(-4) })
  return token
}

export async function setTokenIcon(orgId: number, id: number, icon: string | null) {
  await db.update(apiTokens).set({ icon }).where(and(eq(apiTokens.id, id), eq(apiTokens.orgId, orgId)))
}

export async function revokeToken(orgId: number, id: number) {
  await db.update(apiTokens).set({ revokedAt: new Date() }).where(and(eq(apiTokens.id, id), eq(apiTokens.orgId, orgId), isNull(apiTokens.revokedAt)))
}

/** Marks rows that stand for an MCP connection; never a valid bearer token (those are hashed to hex). */
export const MCP_HINT = 'mcp'

/**
 * The actor for an MCP client acting for a user on one board. The first call creates the row, so the
 * connection shows up under Settings → Loop API tokens; once revoked there, it stays revoked (null).
 */
export async function resolveMcpActor(orgId: number, userId: string, clientId: string): Promise<Actor | null> {
  const key = `oauth:${orgId}:${clientId}:${userId}`
  const find = () => db
    .select({ id: apiTokens.id, name: apiTokens.name, by: user.name, revokedAt: apiTokens.revokedAt })
    .from(apiTokens).leftJoin(user, eq(user.id, apiTokens.createdBy)).where(eq(apiTokens.tokenHash, key))
  let [row] = await find()
  if (!row) {
    const client = await db.query.oauthClient.findFirst({ where: eq(oauthClient.clientId, clientId), columns: { name: true } })
    await db.insert(apiTokens).values({ orgId, name: agentName(client?.name).slice(0, 40), createdBy: userId, tokenHash: key, hint: MCP_HINT }).onConflictDoNothing()
    ;[row] = await find()
  }
  if (!row || row.revokedAt) return null
  await db.update(apiTokens).set({ lastUsedAt: new Date() }).where(eq(apiTokens.id, row.id))
  return { tokenId: row.id, label: row.by ? `${row.by} · ${row.name}` : row.name }
}

/** The live token behind a bearer value for this board, or null. Tokens are random 192-bit values, so a lookup by hash is safe. */
export async function resolveToken(orgId: number, raw: string): Promise<Actor | null> {
  const [row] = await db
    .select({ id: apiTokens.id, name: apiTokens.name, by: user.name })
    .from(apiTokens)
    .leftJoin(user, eq(user.id, apiTokens.createdBy))
    .where(and(eq(apiTokens.tokenHash, await sha256(raw)), eq(apiTokens.orgId, orgId), isNull(apiTokens.revokedAt)))
  if (!row) return null
  await db.update(apiTokens).set({ lastUsedAt: new Date() }).where(eq(apiTokens.id, row.id))
  return { tokenId: row.id, label: row.by ? `${row.by} · ${row.name}` : row.name }
}
