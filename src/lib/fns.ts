import { createServerFn } from '@tanstack/react-start'
import * as db from './db'

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')
const num = (v: unknown) => {
  const n = Number(v)
  if (!Number.isInteger(n) || n < 1) throw new Error('bad id')
  return n
}

export const listPosts = createServerFn().handler(() => db.listPosts())
export const listChangelog = createServerFn().handler(() => db.listChangelog())
export const getPost = createServerFn()
  .validator((id: number) => num(id))
  .handler(({ data }) => db.getPost(data))

export const createPost = createServerFn({ method: 'POST' })
  .validator((d: { title: string; body: string }) => {
    const title = str(d?.title, 140)
    if (!title) throw new Error('title required')
    return { title, body: str(d?.body, 4000) }
  })
  .handler(({ data }) => db.createPost(data.title, data.body))

export const vote = createServerFn({ method: 'POST' })
  .validator((id: number) => num(id))
  .handler(({ data }) => db.vote(data))
