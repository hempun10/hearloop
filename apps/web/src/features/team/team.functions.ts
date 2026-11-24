import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { orgSlugSchema } from '#/features/orgs/org.schema'
import { authMiddleware } from '#/middleware/auth'

const orgRef = z.object({ org: orgSlugSchema })
const inviteToken = z.object({ token: z.string().regex(/^inv_[0-9a-f]{48}$/, 'That invite link is incomplete.') })

export const getTeam = createServerFn()
  .middleware([authMiddleware])
  .validator(orgRef)
  .handler(async ({ data, context: { user } }) => {
    const { requireMembership } = await import('#/features/orgs/org.server')
    const { listTeam } = await import('./team.server')
    return listTeam((await requireMembership(data.org, user.id)).id)
  })

export const makeInvite = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .validator(orgRef)
  .handler(async ({ data, context: { user } }) => {
    const { requireMembership } = await import('#/features/orgs/org.server')
    const { createInvite } = await import('./team.server')
    return createInvite((await requireMembership(data.org, user.id)).id, user.id)
  })

export const cancelInvite = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .validator(orgRef.extend({ id: z.number().int().positive() }))
  .handler(async ({ data, context: { user } }) => {
    const { requireMembership } = await import('#/features/orgs/org.server')
    const { revokeInvite } = await import('./team.server')
    await revokeInvite((await requireMembership(data.org, user.id)).id, data.id)
  })

export const dropMember = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .validator(orgRef.extend({ userId: z.string().min(1) }))
  .handler(async ({ data, context: { user } }) => {
    const { requireMembership } = await import('#/features/orgs/org.server')
    const { removeMember } = await import('./team.server')
    const r = await removeMember((await requireMembership(data.org, user.id)).id, data.userId)
    if (r.error) throw new Error(r.error)
  })

export const getInvite = createServerFn()
  .validator(inviteToken)
  .handler(async ({ data }) => {
    const { peekInvite } = await import('./team.server')
    return peekInvite(data.token)
  })

export const joinBoard = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .validator(inviteToken)
  .handler(async ({ data, context: { user } }) => {
    const { acceptInvite } = await import('./team.server')
    const r = await acceptInvite(data.token, user.id)
    if ('error' in r) throw new Error(r.error)
    return r.slug
  })
