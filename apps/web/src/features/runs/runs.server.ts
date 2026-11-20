import { desc, eq } from 'drizzle-orm'
import { db } from '#/db/client.server'
import { posts, runs } from '#/db/schema'

export function listRuns(orgId: number, limit = 200) {
  return db
    .select({ id: runs.id, postId: runs.postId, passed: runs.passed, summary: runs.summary, createdAt: runs.createdAt, title: posts.title })
    .from(runs)
    .innerJoin(posts, eq(posts.id, runs.postId))
    .where(eq(posts.orgId, orgId))
    .orderBy(desc(runs.id))
    .limit(limit)
}
