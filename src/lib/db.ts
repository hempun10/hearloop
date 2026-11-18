import { env } from 'cloudflare:workers'
import type { Entry, Org, Post, Run, Status } from './types'

export * from './types'

const db = () => env.DB

// ---- orgs
export async function orgBySlug(slug: string) {
  return db().prepare('SELECT id, slug, name, created_at FROM orgs WHERE slug = ?').bind(slug).first<Org>()
}

export async function orgTokenHash(orgId: number) {
  return (await db().prepare('SELECT token_hash FROM orgs WHERE id = ?').bind(orgId).first<{ token_hash: string | null }>())?.token_hash ?? null
}

export async function setOrgTokenHash(orgId: number, hash: string) {
  await db().prepare('UPDATE orgs SET token_hash = ? WHERE id = ?').bind(hash, orgId).run()
}

export async function userOrgs(userId: string) {
  return (await db().prepare('SELECT o.slug, o.name, m.role FROM members m JOIN orgs o ON o.id = m.org_id WHERE m.user_id = ? ORDER BY o.id').bind(userId).all<{ slug: string; name: string; role: string }>()).results
}

export async function isMember(orgId: number, userId: string) {
  return !!(await db().prepare('SELECT 1 FROM members WHERE org_id = ? AND user_id = ?').bind(orgId, userId).first())
}

// returns false when the slug is taken
export async function createOrg(userId: string, slug: string, name: string) {
  try {
    await db().batch([
      db().prepare('INSERT INTO orgs (slug, name) VALUES (?, ?)').bind(slug, name),
      db().prepare("INSERT INTO members (org_id, user_id, role) SELECT id, ?, 'owner' FROM orgs WHERE slug = ?").bind(userId, slug),
    ])
    return true
  } catch (e) {
    if (String(e).includes('UNIQUE')) return false
    throw e
  }
}

// ---- posts (always scoped to an org)
export async function listPosts(orgId: number, status?: Status) {
  const q = status
    ? db().prepare('SELECT * FROM posts WHERE org_id = ? AND status = ? ORDER BY votes DESC, id DESC').bind(orgId, status)
    : db().prepare('SELECT * FROM posts WHERE org_id = ? ORDER BY votes DESC, id DESC').bind(orgId)
  return (await q.all<Post>()).results
}

export async function getPost(orgId: number, id: number) {
  const post = await db().prepare('SELECT * FROM posts WHERE id = ? AND org_id = ?').bind(id, orgId).first<Post>()
  if (!post) return null
  const runs = (await db().prepare('SELECT * FROM runs WHERE post_id = ? ORDER BY id DESC').bind(id).all<Run>()).results
  return { post, runs }
}

export async function createPost(orgId: number, title: string, body: string) {
  return db().prepare('INSERT INTO posts (org_id, title, body) VALUES (?, ?, ?) RETURNING *').bind(orgId, title, body).first<Post>()
}

export async function vote(id: number) {
  return db().prepare('UPDATE posts SET votes = votes + 1 WHERE id = ? RETURNING votes').bind(id).first<{ votes: number }>()
}

export async function setStatus(orgId: number, id: number, status: Status) {
  return db().prepare('UPDATE posts SET status = ? WHERE id = ? AND org_id = ? RETURNING *').bind(status, id, orgId).first<Post>()
}

// A Kane verdict. Pass = shipped + changelog entry; fail = back to planned so the agent retries.
export async function recordRun(orgId: number, id: number, passed: boolean, summary: string, changelog?: string) {
  const post = await db().prepare('SELECT * FROM posts WHERE id = ? AND org_id = ?').bind(id, orgId).first<Post>()
  if (!post) return null
  const stmts = [
    db().prepare('INSERT INTO runs (post_id, passed, summary) VALUES (?, ?, ?)').bind(id, passed ? 1 : 0, summary),
    db().prepare('UPDATE posts SET status = ? WHERE id = ?').bind(passed ? 'shipped' : 'planned', id),
  ]
  if (passed) stmts.push(db().prepare('INSERT INTO changelog (post_id, title, body) VALUES (?, ?, ?)').bind(id, post.title, changelog ?? summary))
  await db().batch(stmts)
  return getPost(orgId, id)
}

export async function listChangelog(orgId: number) {
  return (await db().prepare('SELECT c.* FROM changelog c JOIN posts p ON p.id = c.post_id WHERE p.org_id = ? ORDER BY c.id DESC').bind(orgId).all<Entry>()).results
}

export async function landing(orgId: number) {
  const [stats, top, run, entry] = await db().batch([
    db().prepare(`SELECT
      (SELECT COUNT(*) FROM posts WHERE org_id = ?1) AS posts,
      (SELECT COUNT(*) FROM posts WHERE org_id = ?1 AND status = 'shipped') AS shipped,
      (SELECT COUNT(*) FROM runs r JOIN posts p ON p.id = r.post_id WHERE p.org_id = ?1) AS runs,
      (SELECT COALESCE(SUM(votes), 0) FROM posts WHERE org_id = ?1) AS votes`).bind(orgId),
    db().prepare(`SELECT * FROM posts WHERE org_id = ? AND status != 'shipped' ORDER BY votes DESC LIMIT 3`).bind(orgId),
    db().prepare('SELECT r.*, p.title FROM runs r JOIN posts p ON p.id = r.post_id WHERE p.org_id = ? AND r.passed = 1 ORDER BY r.id DESC LIMIT 1').bind(orgId),
    db().prepare('SELECT c.* FROM changelog c JOIN posts p ON p.id = c.post_id WHERE p.org_id = ? ORDER BY c.id DESC LIMIT 6').bind(orgId),
  ])
  return {
    stats: stats.results[0] as { posts: number; shipped: number; runs: number; votes: number },
    top: top.results as Post[],
    run: (run.results[0] ?? null) as (Run & { title: string }) | null,
    shipped: entry.results as Entry[],
  }
}
