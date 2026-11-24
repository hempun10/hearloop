import { and, asc, eq, sql } from 'drizzle-orm'
import { db } from '#/db/client.server'
import { POST_STATUSES, posts, statuses, type PostStatus } from '#/db/schema'

export function listStatuses(orgId: number) {
  return db.query.statuses.findMany({ where: eq(statuses.orgId, orgId), orderBy: [asc(statuses.position), asc(statuses.id)] })
}

/** The board's status with this id, or null. */
export function findStatusDef(orgId: number, id: number) {
  return db.query.statuses.findFirst({ where: and(eq(statuses.orgId, orgId), eq(statuses.id, id)) })
}

/** A status key (a built-in kind, or c<id>) as the kind to store and the board's own status, if any. */
export async function resolveStatus(orgId: number, key: string): Promise<{ status: PostStatus; custom: { id: number; name: string } | null }> {
  if ((POST_STATUSES as readonly string[]).includes(key)) return { status: key as PostStatus, custom: null }
  const id = /^c(\d+)$/.exec(key)?.[1]
  const row = id ? await findStatusDef(orgId, Number(id)) : null
  if (!row) throw new Error('That status is not on this board.')
  return { status: row.kind, custom: { id: row.id, name: row.name } }
}

const taken = (e: unknown) => e instanceof Error && /UNIQUE/i.test(String(e.cause ?? e.message))

export async function addStatus(orgId: number, s: { name: string; color: string; kind: PostStatus }) {
  const [{ next }] = await db.select({ next: sql<number>`coalesce(max(${statuses.position}), -1) + 1` }).from(statuses).where(eq(statuses.orgId, orgId))
  try {
    const [row] = await db.insert(statuses).values({ orgId, ...s, position: next }).returning()
    return row
  } catch (e) {
    if (taken(e)) throw new Error(`There is already a status called "${s.name}".`)
    throw e
  }
}

/** Renames or recolours one; its kind stays, so the roadmap and changelog stay right. */
export async function editStatus(orgId: number, id: number, s: { name: string; color: string }) {
  try {
    const [row] = await db.update(statuses).set(s).where(and(eq(statuses.orgId, orgId), eq(statuses.id, id))).returning()
    return row ?? null
  } catch (e) {
    if (taken(e)) throw new Error(`There is already a status called "${s.name}".`)
    throw e
  }
}

/** Removes one; its requests keep their kind and show the built-in name again. */
export async function removeStatus(orgId: number, id: number) {
  const row = await findStatusDef(orgId, id)
  if (!row) return false
  await db.batch([db.update(posts).set({ statusId: null }).where(eq(posts.statusId, id)), db.delete(statuses).where(eq(statuses.id, id))])
  return true
}

/** Swaps a status with its neighbour of the same kind. */
export async function moveStatus(orgId: number, id: number, dir: -1 | 1) {
  const row = await findStatusDef(orgId, id)
  if (!row) return
  const peers = (await listStatuses(orgId)).filter((s) => s.kind === row.kind)
  const i = peers.findIndex((s) => s.id === id)
  const other = peers[i + dir]
  if (!other) return
  // positions may tie (all 0 from older rows): renumber the kind, then swap
  const order = peers.map((s) => s.id)
  ;[order[i], order[i + dir]] = [order[i + dir], order[i]]
  await db.batch(order.map((sid, n) => db.update(statuses).set({ position: n }).where(eq(statuses.id, sid))) as [never, ...never[]])
}
