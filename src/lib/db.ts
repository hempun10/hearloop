import { env } from 'cloudflare:workers'

export type Status = 'open' | 'planned' | 'building' | 'shipped'
export const STATUSES: Status[] = ['open', 'planned', 'building', 'shipped']

export type Post = {
  id: number
  title: string
  body: string
  status: Status
  votes: number
  created_at: number
}
export type Run = { id: number; post_id: number; passed: number; summary: string; created_at: number }
export type Entry = { id: number; post_id: number; title: string; body: string; created_at: number }

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

export async function listChangelog() {
  return (await db().prepare('SELECT * FROM changelog ORDER BY id DESC').all<Entry>()).results
}
