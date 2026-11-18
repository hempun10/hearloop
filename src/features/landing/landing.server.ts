import { and, count, desc, eq, ne, sum } from 'drizzle-orm'
import { db } from '#/db/client.server'
import { posts, runs } from '#/db/schema'
import { listChangelog } from '#/features/changelog/changelog.server'

export async function landingData(orgId: number) {
  const [[stats], [shipped], [runCount], top, [lastPass], entries] = await Promise.all([
    db.select({ posts: count(), votes: sum(posts.votes) }).from(posts).where(eq(posts.orgId, orgId)),
    db.select({ n: count() }).from(posts).where(and(eq(posts.orgId, orgId), eq(posts.status, 'shipped'))),
    db.select({ n: count() }).from(runs).innerJoin(posts, eq(posts.id, runs.postId)).where(eq(posts.orgId, orgId)),
    db.query.posts.findMany({ where: and(eq(posts.orgId, orgId), ne(posts.status, 'shipped')), orderBy: desc(posts.votes), limit: 3 }),
    db
      .select({ title: posts.title, summary: runs.summary })
      .from(runs)
      .innerJoin(posts, eq(posts.id, runs.postId))
      .where(and(eq(posts.orgId, orgId), eq(runs.passed, true)))
      .orderBy(desc(runs.id))
      .limit(1),
    listChangelog(orgId, 6),
  ])
  return {
    stats: { posts: stats.posts, votes: Number(stats.votes ?? 0), runs: runCount.n, shipped: shipped.n },
    top,
    lastPass: lastPass ?? null,
    shipped: entries,
  }
}
