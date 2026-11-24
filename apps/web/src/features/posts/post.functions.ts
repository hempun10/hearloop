import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { orgSlugSchema } from '#/features/orgs/org.schema'
import { authMiddleware, sessionMiddleware } from '#/middleware/auth'
import { createPostSchema, editPostSchema, postIdSchema, postRefSchema, setAssigneeSchema, setCategorySchema, setStatusKeySchema } from './post.schema'

export const listPosts = createServerFn()
  .validator(z.object({ org: orgSlugSchema }))
  .handler(async ({ data }) => {
    const { findOrgOrThrow } = await import('#/features/orgs/org.server')
    const { listPosts, tagsByPost } = await import('./post.server')
    const org = await findOrgOrThrow(data.org)
    const [rows, tags] = await Promise.all([listPosts(org.id), tagsByPost(org.id)])
    return rows.map((p) => ({ ...p, tags: tags.get(p.id) ?? [] }))
  })

export const getPost = createServerFn()
  .middleware([sessionMiddleware])
  .validator(postRefSchema)
  .handler(async ({ data, context: { user } }) => {
    const { findOrgOrThrow, isMember } = await import('#/features/orgs/org.server')
    const { getPostWithRuns } = await import('./post.server')
    const org = await findOrgOrThrow(data.org)
    const found = await getPostWithRuns(org.id, data.id)
    // Kane reports are the team's build checks: only members get them
    return found && !(user && (await isMember(org.id, user.id))) ? { ...found, runs: [] } : found
  })

export const createPost = createServerFn({ method: 'POST' })
  .middleware([sessionMiddleware])
  .validator(createPostSchema)
  .handler(async ({ data, context: { user } }) => {
    const { findOrgOrThrow, isMember } = await import('#/features/orgs/org.server')
    const { cleanTag, insertPost, listTags, updateStatus } = await import('./post.server')
    const { findCategory } = await import('#/features/categories/category.server')
    const { resolveStatus } = await import('#/features/statuses/status.server')
    const org = await findOrgOrThrow(data.org)
    if (org.whoCanPost === 'signed_in' && !user) throw new Error('Sign in to post.')
    const member = !!user && (await isMember(org.id, user.id))
    if (data.categoryId && !(await findCategory(org.id, data.categoryId))) throw new Error('That category is not on this board.')
    if (data.status !== 'open' && !member) throw new Error('Only board members can set a status.')
    const status = data.status === 'open' ? null : await resolveStatus(org.id, data.status)
    // members may add new tags; everyone else picks from the board's
    let tags = data.tags
    if (!member && tags.length) {
      const known = new Set((await listTags(org.id)).map((t) => t.name))
      tags = tags.map(cleanTag).filter((t) => known.has(t))
    }
    const post = await insertPost(org.id, { title: data.title, body: data.body, authorId: user?.id, categoryId: data.categoryId, tags })
    // through updateStatus, so shipping on create still writes the changelog and notifies
    return status ? (await updateStatus(org.id, post.id, status.status, status.custom)) ?? post : post
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
  .validator(setStatusKeySchema)
  .handler(async ({ data, context: { user } }) => {
    const { requireMembership } = await import('#/features/orgs/org.server')
    const { updateStatus } = await import('./post.server')
    const { resolveStatus } = await import('#/features/statuses/status.server')
    const org = await requireMembership(data.org, user.id)
    const s = await resolveStatus(org.id, data.status)
    return updateStatus(org.id, data.id, s.status, s.custom)
  })

export const setCategory = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .validator(setCategorySchema)
  .handler(async ({ data, context: { user } }) => {
    const { requireMembership } = await import('#/features/orgs/org.server')
    const { setPostCategory } = await import('./post.server')
    const { findCategory } = await import('#/features/categories/category.server')
    const org = await requireMembership(data.org, user.id)
    if (data.categoryId && !(await findCategory(org.id, data.categoryId))) throw new Error('That category is not on this board.')
    return setPostCategory(org.id, data.id, data.categoryId)
  })

export const setAssignee = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .validator(setAssigneeSchema)
  .handler(async ({ data, context: { user } }) => {
    const { isMember, requireMembership } = await import('#/features/orgs/org.server')
    const { setPostAssignee } = await import('./post.server')
    const org = await requireMembership(data.org, user.id)
    if (data.assigneeId && !(await isMember(org.id, data.assigneeId))) throw new Error('Only a board member can be assigned.')
    return setPostAssignee(org.id, data.id, data.assigneeId)
  })

export const deletePost = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .validator(postRefSchema)
  .handler(async ({ data, context: { user } }) => {
    const { requireMembership } = await import('#/features/orgs/org.server')
    const { deletePost } = await import('./post.server')
    return deletePost((await requireMembership(data.org, user.id)).id, data.id)
  })
