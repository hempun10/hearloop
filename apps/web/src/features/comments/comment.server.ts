import { and, asc, eq } from 'drizzle-orm'
import { db } from '#/db/client.server'
import { comments, posts } from '#/db/schema'

/** A request's comments, oldest first; internal notes only for members. */
export function listComments(postId: number, withInternal: boolean) {
  return db.query.comments.findMany({
    where: withInternal ? eq(comments.postId, postId) : and(eq(comments.postId, postId), eq(comments.internal, false)),
    orderBy: asc(comments.id),
  })
}

export async function addComment(orgId: number, postId: number, c: { userId: string; author: string; team: boolean; internal: boolean; body: string }) {
  const post = await db.query.posts.findFirst({ where: and(eq(posts.id, postId), eq(posts.orgId, orgId)), columns: { id: true, mergedIntoId: true } })
  if (!post) return null
  const [row] = await db.insert(comments).values({ postId: post.mergedIntoId ?? postId, ...c, internal: c.team && c.internal }).returning()
  return row
}

export async function deleteComment(orgId: number, id: number) {
  const c = await db.select({ id: comments.id }).from(comments).innerJoin(posts, eq(posts.id, comments.postId)).where(and(eq(comments.id, id), eq(posts.orgId, orgId)))
  if (!c.length) return false
  await db.delete(comments).where(eq(comments.id, id))
  return true
}
