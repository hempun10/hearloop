import { and, asc, eq } from 'drizzle-orm'
import { db } from '#/db/client.server'
import { categories, posts } from '#/db/schema'

export function listCategories(orgId: number) {
  return db.query.categories.findMany({ where: eq(categories.orgId, orgId), orderBy: [asc(categories.position), asc(categories.id)] })
}

export function findCategory(orgId: number, id: number) {
  return db.query.categories.findFirst({ where: and(eq(categories.orgId, orgId), eq(categories.id, id)) })
}

const taken = (e: unknown) => e instanceof Error && /UNIQUE/i.test(String(e.cause ?? e.message))
const named = (name: string) => new Error(`There is already a board called "${name}".`)

export async function addCategory(orgId: number, c: { name: string; description: string }) {
  try {
    const [row] = await db.insert(categories).values({ orgId, ...c }).returning()
    return row
  } catch (e) {
    if (taken(e)) throw named(c.name)
    throw e
  }
}

export async function editCategory(orgId: number, id: number, c: { name: string; description: string }) {
  try {
    const [row] = await db.update(categories).set(c).where(and(eq(categories.orgId, orgId), eq(categories.id, id))).returning()
    return row ?? null
  } catch (e) {
    if (taken(e)) throw named(c.name)
    throw e
  }
}

/** Removes one; its requests stay on the board without a category. */
export async function removeCategory(orgId: number, id: number) {
  if (!(await findCategory(orgId, id))) return false
  await db.batch([db.update(posts).set({ categoryId: null }).where(eq(posts.categoryId, id)), db.delete(categories).where(eq(categories.id, id))])
  return true
}
