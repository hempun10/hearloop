import { and, desc, eq, inArray } from 'drizzle-orm'
import { db } from '#/db/client.server'
import { changelog, posts } from '#/db/schema'

export function listChangelog(orgId: number, limit = 200) {
  return db
    .select({ id: changelog.id, postId: changelog.postId, title: changelog.title, body: changelog.body, verified: changelog.verified, createdAt: changelog.createdAt })
    .from(changelog)
    .innerJoin(posts, eq(posts.id, changelog.postId))
    .where(eq(posts.orgId, orgId))
    .orderBy(desc(changelog.id))
    .limit(limit)
}

export async function deleteEntry(orgId: number, id: number) {
  const orgPosts = db.select({ id: posts.id }).from(posts).where(eq(posts.orgId, orgId))
  const gone = await db.delete(changelog).where(and(eq(changelog.id, id), inArray(changelog.postId, orgPosts))).returning({ id: changelog.id })
  if (!gone.length) throw new Error('That entry was already removed. Reload to see the current changelog.')
}
