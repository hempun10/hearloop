import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { orgSlugSchema } from '#/features/orgs/org.schema'
import { authMiddleware, sessionMiddleware } from '#/middleware/auth'
import { createPostSchema, postIdSchema, postRefSchema, setStatusSchema } from './post.schema'

export const listPosts = createServerFn()
  .validator(z.object({ org: orgSlugSchema }))
  .handler(async ({ data }) => {
    const { findOrgOrThrow } = await import('#/features/orgs/org.server')
    const { listPosts } = await import('./post.server')
    return listPosts((await findOrgOrThrow(data.org)).id)
  })

export const getPost = createServerFn()
  .validator(postRefSchema)
  .handler(async ({ data }) => {
    const { findOrgOrThrow } = await import('#/features/orgs/org.server')
    const { getPostWithRuns } = await import('./post.server')
    return getPostWithRuns((await findOrgOrThrow(data.org)).id, data.id)
  })

export const createPost = createServerFn({ method: 'POST' })
  .middleware([sessionMiddleware])
  .validator(createPostSchema)
  .handler(async ({ data, context: { user } }) => {
    const { findOrgOrThrow } = await import('#/features/orgs/org.server')
    const { insertPost } = await import('./post.server')
    const org = await findOrgOrThrow(data.org)
    if (org.whoCanPost === 'signed_in' && !user) throw new Error('Sign in to post.')
    return insertPost(org.id, data.title, data.body)
  })

export const votePost = createServerFn({ method: 'POST' })
  .middleware([sessionMiddleware])
  .validator(z.object({ id: postIdSchema }))
  .handler(async ({ data, context: { user } }) => {
    const { getCookie, setCookie } = await import('@tanstack/react-start/server')
    const { addVote } = await import('./post.server')
    // visitors get a long-lived random id, so clearing local storage doesn't buy a second vote
    let visitor = getCookie('hl_voter')
    if (!user && !visitor) {
      visitor = crypto.randomUUID()
      setCookie('hl_voter', visitor, { httpOnly: true, sameSite: 'lax', secure: true, path: '/', maxAge: 60 * 60 * 24 * 365 })
    }
    return addVote(data.id, user ? `u:${user.id}` : `v:${visitor}`)
  })

// ---- members only
export const setPostStatus = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .validator(setStatusSchema)
  .handler(async ({ data, context: { user } }) => {
    const { requireMembership } = await import('#/features/orgs/org.server')
    const { updateStatus } = await import('./post.server')
    return updateStatus((await requireMembership(data.org, user.id)).id, data.id, data.status)
  })

export const deletePost = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .validator(postRefSchema)
  .handler(async ({ data, context: { user } }) => {
    const { requireMembership } = await import('#/features/orgs/org.server')
    const { deletePost } = await import('./post.server')
    return deletePost((await requireMembership(data.org, user.id)).id, data.id)
  })
