import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { orgSlugSchema } from '#/features/orgs/org.schema'
import { postIdSchema, postRefSchema } from '#/features/posts/post.schema'
import { authMiddleware, sessionMiddleware } from '#/middleware/auth'
import { addCommentSchema } from './comment.schema'

export const getComments = createServerFn()
  .middleware([sessionMiddleware])
  .validator(postRefSchema)
  .handler(async ({ data, context: { user } }) => {
    const { findOrgOrThrow, isMember } = await import('#/features/orgs/org.server')
    const { listComments } = await import('./comment.server')
    const org = await findOrgOrThrow(data.org)
    return listComments(data.id, !!user && (await isMember(org.id, user.id)))
  })

export const postComment = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .validator(addCommentSchema)
  .handler(async ({ data, context: { user } }) => {
    const { findOrgOrThrow, isMember } = await import('#/features/orgs/org.server')
    const { addComment } = await import('./comment.server')
    const org = await findOrgOrThrow(data.org)
    const team = await isMember(org.id, user.id)
    if (data.internal && !team) throw new Error('Only board members can write internal notes.')
    const row = await addComment(org.id, data.id, { userId: user.id, author: user.name || user.email, team, internal: data.internal, body: data.body, parentId: data.parentId })
    if (!row) throw new Error('That request is gone.')
    return row
  })

export const removeComment = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .validator(z.object({ org: orgSlugSchema, id: postIdSchema }))
  .handler(async ({ data, context: { user } }) => {
    const { requireMembership } = await import('#/features/orgs/org.server')
    const { deleteComment } = await import('./comment.server')
    if (!(await deleteComment((await requireMembership(data.org, user.id)).id, data.id))) throw new Error('That comment was already removed.')
  })
