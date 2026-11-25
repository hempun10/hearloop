import { and, asc, eq, or } from 'drizzle-orm'
import { db } from '#/db/client.server'
import { comments, posts } from '#/db/schema'

/** A request's comments, oldest first; internal notes only for members. */
export function listComments(postId: number, withInternal: boolean) {
  return db.query.comments.findMany({
    where: withInternal ? eq(comments.postId, postId) : and(eq(comments.postId, postId), eq(comments.internal, false)),
    orderBy: asc(comments.id),
  })
}

export async function addComment(
  orgId: number,
  postId: number,
  c: { userId: string; author: string; team: boolean; internal: boolean; body: string; parentId?: number },
) {
  const post = await db.query.posts.findFirst({
    where: and(eq(posts.id, postId), eq(posts.orgId, orgId)),
    columns: { id: true, mergedIntoId: true },
  })
  if (!post) return null
  const target = post.mergedIntoId ?? postId
  let { internal, parentId } = c
  if (parentId) {
    const parent = await db.query.comments.findFirst({
      where: and(eq(comments.id, parentId), eq(comments.postId, target)),
    })
    if (!parent || (parent.internal && !c.team)) throw new Error('That comment is gone.')
    parentId = parent.parentId ?? parent.id // replies stay one level deep
    internal = parent.internal // a reply to an internal note stays internal, and only there
  }
  const [row] = await db
    .insert(comments)
    .values({ postId: target, ...c, parentId: parentId ?? null, internal: c.team && internal })
    .returning()
  return row
}

export async function deleteComment(orgId: number, id: number) {
  const c = await db
    .select({ id: comments.id })
    .from(comments)
    .innerJoin(posts, eq(posts.id, comments.postId))
    .where(and(eq(comments.id, id), eq(posts.orgId, orgId)))
  if (!c.length) return false
  await db.delete(comments).where(or(eq(comments.id, id), eq(comments.parentId, id)))
  return true
}
