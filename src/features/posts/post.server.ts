import { and, desc, eq, sql } from 'drizzle-orm'
import { db } from '#/db/client.server'
import { changelog, posts, runs, type PostStatus } from '#/db/schema'

export function listPosts(orgId: number, status?: PostStatus) {
  return db.query.posts.findMany({
    where: status ? and(eq(posts.orgId, orgId), eq(posts.status, status)) : eq(posts.orgId, orgId),
    orderBy: [desc(posts.votes), desc(posts.id)],
  })
}

export async function getPostWithRuns(orgId: number, id: number) {
  const post = await db.query.posts.findFirst({ where: and(eq(posts.id, id), eq(posts.orgId, orgId)) })
  if (!post) return null
  const postRuns = await db.query.runs.findMany({ where: eq(runs.postId, id), orderBy: desc(runs.id) })
  return { post, runs: postRuns }
}

export async function insertPost(orgId: number, title: string, body: string) {
  const [post] = await db.insert(posts).values({ orgId, title, body }).returning()
  return post
}

export async function addVote(id: number) {
  const [row] = await db
    .update(posts)
    .set({ votes: sql`${posts.votes} + 1` })
    .where(eq(posts.id, id))
    .returning({ votes: posts.votes })
  return row ?? null
}

export async function updateStatus(orgId: number, id: number, status: PostStatus) {
  const [post] = await db.update(posts).set({ status }).where(and(eq(posts.id, id), eq(posts.orgId, orgId))).returning()
  return post ?? null
}

export async function deletePost(orgId: number, id: number) {
  const post = await db.query.posts.findFirst({ where: and(eq(posts.id, id), eq(posts.orgId, orgId)), columns: { id: true } })
  if (!post) return false
  await db.batch([
    db.delete(runs).where(eq(runs.postId, id)),
    db.delete(changelog).where(eq(changelog.postId, id)),
    db.delete(posts).where(eq(posts.id, id)),
  ])
  return true
}

/** A Kane verdict. Pass: shipped plus a changelog entry. Fail: back to planned so the agent retries. */
export async function recordRun(orgId: number, id: number, run: { passed: boolean; summary: string; changelog?: string }) {
  const post = await db.query.posts.findFirst({ where: and(eq(posts.id, id), eq(posts.orgId, orgId)) })
  if (!post) return null
  const insertRun = db.insert(runs).values({ postId: id, passed: run.passed, summary: run.summary })
  const setStatus = db.update(posts).set({ status: run.passed ? 'shipped' : 'planned' }).where(eq(posts.id, id))
  if (run.passed) {
    await db.batch([insertRun, setStatus, db.insert(changelog).values({ postId: id, title: post.title, body: run.changelog ?? run.summary })])
  } else {
    await db.batch([insertRun, setStatus])
  }
  return getPostWithRuns(orgId, id)
}
