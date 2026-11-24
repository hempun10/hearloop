import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { orgSlugSchema } from '#/features/orgs/org.schema'
import { authMiddleware, sessionMiddleware } from '#/middleware/auth'
import { createPostSchema, editPostSchema, postIdSchema, postRefSchema, setStatusSchema } from './post.schema'

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
    return insertPost(org.id, data.title, data.body, user?.id)
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

export const getTags = createServerFn()
  .validator(z.object({ org: orgSlugSchema }))
  .handler(async ({ data }) => {
    const { findOrgOrThrow } = await import('#/features/orgs/org.server')
    const { listTags } = await import('./post.server')
    return listTags((await findOrgOrThrow(data.org)).id)
  })

// members, or the author while it's Open
export const updatePost = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .validator(editPostSchema)
  .handler(async ({ data, context: { user } }) => {
    const { findOrgOrThrow, isMember } = await import('#/features/orgs/org.server')
    const { editPost } = await import('./post.server')
    const org = await findOrgOrThrow(data.org)
    const r = await editPost(org.id, data.id, { title: data.title, body: data.body }, { userId: user.id, member: await isMember(org.id, user.id) })
    if ('error' in r) throw new Error(r.error)
    return r.post
  })

// ---- members only
export const setTags = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .validator(postRefSchema.extend({ tags: z.array(z.string().max(32)).max(10) }))
  .handler(async ({ data, context: { user } }) => {
    const { requireMembership } = await import('#/features/orgs/org.server')
    const { setPostTags } = await import('./post.server')
    return setPostTags((await requireMembership(data.org, user.id)).id, data.id, data.tags)
  })

export const mergePost = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .validator(postRefSchema.extend({ into: postIdSchema }))
  .handler(async ({ data, context: { user } }) => {
    const { requireMembership } = await import('#/features/orgs/org.server')
    const { mergePosts } = await import('./post.server')
    const r = await mergePosts((await requireMembership(data.org, user.id)).id, data.id, data.into)
    if ('error' in r) throw new Error(r.error)
    return r
  })

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
