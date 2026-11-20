import { and, desc, eq, inArray, isNull, lt, or, sql } from 'drizzle-orm'
import { db } from '#/db/client.server'
import { changelog, postVotes, posts, runs, type PostStatus } from '#/db/schema'
import type { Actor } from '#/features/tokens/tokens.server'

/** How long a loop's claim lasts without a renewal; the CLI renews every minute. */
export const CLAIM_LEASE_MS = 15 * 60_000

const noClaim = { claimTokenId: null, claimedBy: null, claimExpiresAt: null }

/** A claim held by someone else that hasn't expired. */
const heldByOther = (p: { claimTokenId: number | null; claimExpiresAt: Date | null }, actor: Actor) =>
  p.claimTokenId !== null && p.claimTokenId !== actor.tokenId && !!p.claimExpiresAt && p.claimExpiresAt > new Date()

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

/** Counts one vote per voter; a repeat returns the current count unchanged. */
export async function addVote(id: number, voter: string) {
  const post = await db.query.posts.findFirst({ where: eq(posts.id, id), columns: { votes: true } })
  if (!post) return null
  const [fresh] = await db.insert(postVotes).values({ postId: id, voter }).onConflictDoNothing().returning({ postId: postVotes.postId })
  if (!fresh) return { votes: post.votes }
  const [row] = await db.update(posts).set({ votes: sql`${posts.votes} + 1` }).where(eq(posts.id, id)).returning({ votes: posts.votes })
  return row ?? null
}

/**
 * A member moving a post by hand. It drops any loop's claim, and keeps the public changelog honest:
 * shipping by hand publishes an entry without the Kane label; leaving Shipped takes the entry down.
 */
export async function updateStatus(orgId: number, id: number, status: PostStatus) {
  const before = await db.query.posts.findFirst({ where: and(eq(posts.id, id), eq(posts.orgId, orgId)) })
  if (!before) return null
  const move = db.update(posts).set({ status, ...noClaim }).where(eq(posts.id, id)).returning()
  const [[post]] = before.status === status ? await db.batch([move])
    : status === 'shipped' ? await db.batch([move, db.insert(changelog).values({ postId: id, title: before.title, body: before.body, verified: false })])
    : before.status === 'shipped' ? await db.batch([move, db.delete(changelog).where(eq(changelog.postId, id))])
    : await db.batch([move])
  return post ?? null
}

/**
 * Claims a post for one loop, or renews the claim. One conditional UPDATE, so two loops can never both win.
 * Free when unclaimed, already ours, or the lease ran out.
 */
export async function claimPost(orgId: number, id: number, actor: Actor) {
  const now = new Date()
  const [post] = await db
    .update(posts)
    .set({ status: 'building', claimTokenId: actor.tokenId, claimedBy: actor.label, claimExpiresAt: new Date(now.getTime() + CLAIM_LEASE_MS) })
    .where(and(
      eq(posts.id, id), eq(posts.orgId, orgId), inArray(posts.status, ['planned', 'building']),
      or(isNull(posts.claimTokenId), eq(posts.claimTokenId, actor.tokenId), lt(posts.claimExpiresAt, now)),
    ))
    .returning()
  if (post) return { post }
  const current = await db.query.posts.findFirst({ where: and(eq(posts.id, id), eq(posts.orgId, orgId)) })
  if (!current) return null
  const conflict = {
    open: 'This request is still Open, not approved. A member has to move it to Planned before an agent can build it.',
    shipped: 'This request already shipped.',
  }[current.status as 'open' | 'shipped'] ?? `${current.claimedBy ?? 'Someone'} is building this.`
  return { conflict }
}

/** Lets go of our claim (the loop gave up or crashed): back to planned. */
export async function releasePost(orgId: number, id: number, actor: Actor) {
  const [post] = await db
    .update(posts)
    .set({ status: 'planned', ...noClaim })
    .where(and(eq(posts.id, id), eq(posts.orgId, orgId), eq(posts.claimTokenId, actor.tokenId), eq(posts.status, 'building')))
    .returning()
  return post ?? null
}

export async function deletePost(orgId: number, id: number) {
  const post = await db.query.posts.findFirst({ where: and(eq(posts.id, id), eq(posts.orgId, orgId)), columns: { id: true } })
  if (!post) return false
  await db.batch([
    db.delete(runs).where(eq(runs.postId, id)),
    db.delete(changelog).where(eq(changelog.postId, id)),
    db.delete(postVotes).where(eq(postVotes.postId, id)),
    db.delete(posts).where(eq(posts.id, id)),
  ])
  return true
}

/** A Kane verdict. Pass: shipped plus a changelog entry. Fail: back to planned so the agent retries. */
export async function recordRun(orgId: number, id: number, run: { passed: boolean; summary: string; changelog?: string }, actor: Actor) {
  const post = await db.query.posts.findFirst({ where: and(eq(posts.id, id), eq(posts.orgId, orgId)) })
  if (!post) return null
  if (heldByOther(post, actor)) return { conflict: `${post.claimedBy} is building this; only their loop can report.` }
  // a report ships the post, so it must come from whoever claimed it (and so it was approved)
  if (post.claimTokenId !== actor.tokenId) return { conflict: 'Claim this request before reporting on it.' }
  const insertRun = db.insert(runs).values({ postId: id, passed: run.passed, summary: run.summary })
  const setStatus = db.update(posts).set({ status: run.passed ? 'shipped' : 'planned', ...noClaim }).where(eq(posts.id, id))
  if (run.passed) {
    await db.batch([insertRun, setStatus, db.insert(changelog).values({ postId: id, title: post.title, body: run.changelog ?? run.summary })])
  } else {
    await db.batch([insertRun, setStatus])
  }
  return getPostWithRuns(orgId, id)
}
