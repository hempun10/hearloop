import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { authMiddleware, sessionMiddleware } from '#/middleware/auth'
import { createOrgSchema, orgSlugSchema, updateOrgSchema } from './org.schema'

export const getSession = createServerFn()
  .middleware([sessionMiddleware])
  .handler(async ({ context: { user } }) => {
    if (!user) return null
    const { orgsForUser } = await import('./org.server')
    return { user: { id: user.id, email: user.email, name: user.name }, orgs: await orgsForUser(user.id) }
  })
export type Session = NonNullable<Awaited<ReturnType<typeof getSession>>>

export const getOrg = createServerFn()
  .middleware([sessionMiddleware])
  .validator(z.object({ org: orgSlugSchema }))
  .handler(async ({ data, context: { user } }) => {
    const { findOrg, isMember } = await import('./org.server')
    const { listStatuses } = await import('#/features/statuses/status.server')
    const { listCategories } = await import('#/features/categories/category.server')
    const org = await findOrg(data.org)
    if (!org) return null
    const [member, statuses, categories] = await Promise.all([!!user && isMember(org.id, user.id), listStatuses(org.id), listCategories(org.id)])
    return { org, isMember: member, statuses, categories }
  })

export const createOrg = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .validator(createOrgSchema)
  .handler(async ({ data, context: { user } }) => {
    const { createOrgForUser } = await import('./org.server')
    return createOrgForUser(user.id, data)
  })

export const updateOrg = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .validator(updateOrgSchema)
  .handler(async ({ data, context: { user } }) => {
    const { requireMembership, updateOrgSettings } = await import('./org.server')
    const org = await requireMembership(data.org, user.id)
    await updateOrgSettings(org.id, data.settings)
  })
