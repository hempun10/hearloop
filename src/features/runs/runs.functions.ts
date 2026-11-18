import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { orgSlugSchema } from '#/features/orgs/org.schema'
import { authMiddleware } from '#/middleware/auth'

export const listRuns = createServerFn()
  .middleware([authMiddleware])
  .validator(z.object({ org: orgSlugSchema }))
  .handler(async ({ data, context: { user } }) => {
    const { requireMembership } = await import('#/features/orgs/org.server')
    const { listRuns } = await import('./runs.server')
    return listRuns((await requireMembership(data.org, user.id)).id)
  })
