import { createServerFn } from '@tanstack/react-start'
import { authMiddleware } from '#/middleware/auth'
import { addStatusSchema, editStatusSchema, moveStatusSchema, statusRefSchema } from './status.schema'

export const createStatus = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .validator(addStatusSchema)
  .handler(async ({ data: { org, ...s }, context: { user } }) => {
    const { requireMembership } = await import('#/features/orgs/org.server')
    const { addStatus } = await import('./status.server')
    return addStatus((await requireMembership(org, user.id)).id, s)
  })

export const updateStatusDef = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .validator(editStatusSchema)
  .handler(async ({ data: { org, id, ...s }, context: { user } }) => {
    const { requireMembership } = await import('#/features/orgs/org.server')
    const { editStatus } = await import('./status.server')
    return editStatus((await requireMembership(org, user.id)).id, id, s)
  })

export const deleteStatusDef = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .validator(statusRefSchema)
  .handler(async ({ data, context: { user } }) => {
    const { requireMembership } = await import('#/features/orgs/org.server')
    const { removeStatus } = await import('./status.server')
    return removeStatus((await requireMembership(data.org, user.id)).id, data.id)
  })

export const reorderStatus = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .validator(moveStatusSchema)
  .handler(async ({ data, context: { user } }) => {
    const { requireMembership } = await import('#/features/orgs/org.server')
    const { moveStatus } = await import('./status.server')
    await moveStatus((await requireMembership(data.org, user.id)).id, data.id, data.dir)
  })
