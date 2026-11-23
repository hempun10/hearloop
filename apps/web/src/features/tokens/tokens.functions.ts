import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { orgSlugSchema } from '#/features/orgs/org.schema'
import { authMiddleware } from '#/middleware/auth'
import { createTokenSchema, revokeTokenSchema } from './tokens.schema'

export const getTokens = createServerFn()
  .middleware([authMiddleware])
  .validator(z.object({ org: orgSlugSchema }))
  .handler(async ({ data, context: { user } }) => {
    const { requireMembership } = await import('#/features/orgs/org.server')
    const { listTokens } = await import('./tokens.server')
    return listTokens((await requireMembership(data.org, user.id)).id)
  })

export const createApiToken = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .validator(createTokenSchema)
  .handler(async ({ data, context: { user } }) => {
    const { requireMembership } = await import('#/features/orgs/org.server')
    const { createToken } = await import('./tokens.server')
    return createToken((await requireMembership(data.org, user.id)).id, user.id, data.name)
  })

export const revokeApiToken = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .validator(revokeTokenSchema)
  .handler(async ({ data, context: { user } }) => {
    const { requireMembership } = await import('#/features/orgs/org.server')
    const { revokeToken } = await import('./tokens.server')
    await revokeToken((await requireMembership(data.org, user.id)).id, data.id)
  })
