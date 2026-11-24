import { and, asc, desc, eq, inArray, isNull, lt, or, sql } from 'drizzle-orm'
import { db } from '#/db/client.server'
import { changelog, comments, postTags, postVotes, posts, runs, tags, type PostStatus } from '#/db/schema'
import type { Actor } from '#/features/tokens/tokens.server'

/** How long a claim lasts without a renewal; claiming the same request again renews it. */
export const CLAIM_LEASE_MS = 15 * 60_000

const noClaim = { claimTokenId: null, claimedBy: null, claimExpiresAt: null }

/** A claim held by someone else that hasn't expired. */
const heldByOther = (p: { claimTokenId: number | null; claimExpiresAt: Date | null }, actor: Actor) =>
  p.claimTokenId !== null && p.claimTokenId !== actor.tokenId && !!p.claimExpiresAt && p.claimExpiresAt > new Date()

export function listPosts(orgId: number, status?: PostStatus) {
  return db.query.posts.findMany({
    where: and(eq(posts.orgId, orgId), isNull(posts.mergedIntoId), status ? eq(posts.status, status) : undefined),
    orderBy: [desc(posts.votes), desc(posts.id)],
  })
}

export async function getPostWithRuns(orgId: number, id: number) {
  const post = await db.query.posts.findFirst({ where: and(eq(posts.id, id), eq(posts.orgId, orgId)) })
  if (!post) return null
  const [postRuns, tagRows, mergedInto] = await Promise.all([
    db.query.runs.findMany({ where: eq(runs.postId, id), orderBy: desc(runs.id) }),
    db.select({ name: tags.name }).from(postTags).innerJoin(tags, eq(tags.id, postTags.tagId)).where(eq(postTags.postId, id)).orderBy(asc(tags.name)),
    post.mergedIntoId ? db.query.posts.findFirst({ where: eq(posts.id, post.mergedIntoId), columns: { id: true, title: true } }) : null,
  ])
  return { post, runs: postRuns, tags: tagRows.map((t) => t.name), mergedInto: mergedInto ?? null }
}

/** Tag names per post on a board, for lists. */
export async function tagsByPost(orgId: number) {
  const rows = await db.select({ postId: postTags.postId, name: tags.name }).from(postTags).innerJoin(tags, eq(tags.id, postTags.tagId)).where(eq(tags.orgId, orgId)).orderBy(asc(tags.name))
  const map = new Map<number, string[]>()
  for (const r of rows) map.set(r.postId, [...(map.get(r.postId) ?? []), r.name])
  return map
}

export async function listTags(orgId: number) {
  return db.select({ name: tags.name, posts: sql<number>`count(${postTags.postId})` }).from(tags)
    .leftJoin(postTags, eq(postTags.tagId, tags.id)).where(eq(tags.orgId, orgId)).groupBy(tags.id).orderBy(asc(tags.name))
}

export const cleanTag = (s: string) => s.trim().toLowerCase().replace(/\s+/g, '-').slice(0, 32)

/** Replaces a post's tags with these names, creating tags the board doesn't have yet. */
export async function setPostTags(orgId: number, id: number, names: string[]) {
  const post = await db.query.posts.findFirst({ where: and(eq(posts.id, id), eq(posts.orgId, orgId)), columns: { id: true } })
  if (!post) return null
  const clean = [...new Set(names.map(cleanTag).filter(Boolean))]
  if (clean.length) await db.insert(tags).values(clean.map((name) => ({ orgId, name }))).onConflictDoNothing()
  const ids = clean.length ? (await db.select({ id: tags.id }).from(tags).where(and(eq(tags.orgId, orgId), inArray(tags.name, clean)))).map((t) => t.id) : []
  const clear = db.delete(postTags).where(eq(postTags.postId, id))
  if (ids.length) await db.batch([clear, db.insert(postTags).values(ids.map((tagId) => ({ postId: id, tagId })))])
  else await db.batch([clear])
  return clean.sort()
}

export async function deleteTag(orgId: number, name: string) {
  const tag = await db.query.tags.findFirst({ where: and(eq(tags.orgId, orgId), eq(tags.name, cleanTag(name))) })
  if (!tag) return false
  await db.batch([db.delete(postTags).where(eq(postTags.tagId, tag.id)), db.delete(tags).where(eq(tags.id, tag.id))])
  return true
}

/**
 * Merges a duplicate into the request that stays: votes (each voter once), comments and tags move over,
 * and the duplicate leaves every list. Only Open or Planned requests can be merged away.
 */
export async function mergePosts(orgId: number, from: number, into: number) {
  if (from === into) return { error: 'Pick a different request to merge into.' }
  const [src, dst] = await Promise.all([from, into].map((id) => db.query.posts.findFirst({ where: and(eq(posts.id, id), eq(posts.orgId, orgId)) })))
  if (!src || !dst) return { error: `No request #${!src ? from : into} on this board.` }
  if (src.mergedIntoId === into) return { votesAdded: 0, already: true }
  if (src.mergedIntoId || dst.mergedIntoId) return { error: `#${src.mergedIntoId ? from : into} was already merged into #${src.mergedIntoId ?? dst.mergedIntoId}.` }
  if (src.status === 'building' || src.status === 'shipped') return { error: `Only Open or Planned requests can be merged; #${from} is ${src.status}.` }
  // voters on both count once; seeded or imported counts without voter rows still carry over
  const [{ overlap }] = await db.select({ overlap: sql<number>`count(*)` }).from(postVotes)
    .where(and(eq(postVotes.postId, from), inArray(postVotes.voter, db.select({ v: postVotes.voter }).from(postVotes).where(eq(postVotes.postId, into)))))
  const votesAdded = Math.max(0, src.votes - overlap)
  await db.batch([
    db.insert(postVotes).select(db.select({ postId: sql`${into}`.as('post_id'), voter: postVotes.voter, createdAt: postVotes.createdAt }).from(postVotes).where(eq(postVotes.postId, from))).onConflictDoNothing(),
    db.insert(postTags).select(db.select({ postId: sql`${into}`.as('post_id'), tagId: postTags.tagId }).from(postTags).where(eq(postTags.postId, from))).onConflictDoNothing(),
    db.update(posts).set({ votes: sql`${posts.votes} + ${votesAdded}` }).where(eq(posts.id, into)),
    db.update(comments).set({ postId: into }).where(eq(comments.postId, from)),
    db.update(posts).set({ mergedIntoId: into, ...noClaim }).where(eq(posts.id, from)),
  ])
  return { votesAdded, already: false }
}

export async function insertPost(orgId: number, title: string, body: string) {
  const [post] = await db.insert(posts).values({ orgId, title, body }).returning()
  return post
}

/** Counts one vote per voter; a repeat returns the current count unchanged. */
export async function addVote(id: number, voter: string) {
  const post = await db.query.posts.findFirst({ where: eq(posts.id, id), columns: { votes: true } })
  if (!post) return null
  // one transaction: the count rises only when the insert added a row (changes() = 1), so the two never drift
  const [, [row]] = await db.batch([
    db.insert(postVotes).values({ postId: id, voter }).onConflictDoNothing(),
    db.update(posts).set({ votes: sql`${posts.votes} + 1` }).where(and(eq(posts.id, id), sql`changes() = 1`)).returning({ votes: posts.votes }),
  ])
  return row ?? { votes: post.votes }
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
      eq(posts.id, id), eq(posts.orgId, orgId), inArray(posts.status, ['planned', 'building']), isNull(posts.mergedIntoId),
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
    db.update(posts).set({ mergedIntoId: null }).where(eq(posts.mergedIntoId, id)), // its merged duplicates come back as requests
    db.delete(comments).where(eq(comments.postId, id)),
    db.delete(postTags).where(eq(postTags.postId, id)),
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
