import { env } from 'cloudflare:workers'
import type { Entry, Post, Run, Status } from './types'

export * from './types'

const db = () => env.DB

export async function listPosts(status?: Status) {
  const q = status
    ? db().prepare('SELECT * FROM posts WHERE status = ? ORDER BY votes DESC, id DESC').bind(status)
    : db().prepare('SELECT * FROM posts ORDER BY votes DESC, id DESC')
  return (await q.all<Post>()).results
}

export async function getPost(id: number) {
  const post = await db().prepare('SELECT * FROM posts WHERE id = ?').bind(id).first<Post>()
  if (!post) return null
  const runs = (await db().prepare('SELECT * FROM runs WHERE post_id = ? ORDER BY id DESC').bind(id).all<Run>()).results
  return { post, runs }
}

export async function createPost(title: string, body: string) {
  return db().prepare('INSERT INTO posts (title, body) VALUES (?, ?) RETURNING *').bind(title, body).first<Post>()
}

export async function vote(id: number) {
  return db().prepare('UPDATE posts SET votes = votes + 1 WHERE id = ? RETURNING votes').bind(id).first<{ votes: number }>()
}

export async function setStatus(id: number, status: Status) {
  return db().prepare('UPDATE posts SET status = ? WHERE id = ? RETURNING *').bind(status, id).first<Post>()
}

// A Kane verdict. Pass = shipped + changelog entry; fail = back to planned so the agent retries.
export async function recordRun(id: number, passed: boolean, summary: string, changelog?: string) {
  const post = await db().prepare('SELECT * FROM posts WHERE id = ?').bind(id).first<Post>()
  if (!post) return null
  const stmts = [
    db().prepare('INSERT INTO runs (post_id, passed, summary) VALUES (?, ?, ?)').bind(id, passed ? 1 : 0, summary),
    db().prepare('UPDATE posts SET status = ? WHERE id = ?').bind(passed ? 'shipped' : 'planned', id),
  ]
  if (passed) stmts.push(db().prepare('INSERT INTO changelog (post_id, title, body) VALUES (?, ?, ?)').bind(id, post.title, changelog ?? summary))
  await db().batch(stmts)
  return getPost(id)
}

export async function landing() {
  const [stats, top, run, entry] = await db().batch([
    db().prepare(`SELECT
      (SELECT COUNT(*) FROM posts) AS posts,
      (SELECT COUNT(*) FROM posts WHERE status = 'shipped') AS shipped,
      (SELECT COUNT(*) FROM runs) AS runs,
      (SELECT COALESCE(SUM(votes), 0) FROM posts) AS votes`),
    db().prepare(`SELECT * FROM posts WHERE status != 'shipped' ORDER BY votes DESC LIMIT 3`),
    db().prepare('SELECT runs.*, posts.title FROM runs JOIN posts ON posts.id = runs.post_id WHERE passed = 1 ORDER BY runs.id DESC LIMIT 1'),
    db().prepare('SELECT * FROM changelog ORDER BY id DESC LIMIT 6'),
  ])
  return {
    stats: stats.results[0] as { posts: number; shipped: number; runs: number; votes: number },
    top: top.results as Post[],
    run: (run.results[0] ?? null) as (Run & { title: string }) | null,
    shipped: entry.results as Entry[],
  }
}

export async function listChangelog() {
  return (await db().prepare('SELECT * FROM changelog ORDER BY id DESC').all<Entry>()).results
}
