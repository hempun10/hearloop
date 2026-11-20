import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { orgSlugSchema } from '#/features/orgs/org.schema'
import { authMiddleware } from '#/middleware/auth'

export const listChangelog = createServerFn()
  .validator(z.object({ org: orgSlugSchema }))
  .handler(async ({ data }) => {
    const { findOrgOrThrow } = await import('#/features/orgs/org.server')
    const { listChangelog } = await import('./changelog.server')
    return listChangelog((await findOrgOrThrow(data.org)).id)
  })

export const deleteChangelogEntry = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .validator(z.object({ org: orgSlugSchema, id: z.number().int().positive() }))
  .handler(async ({ data, context: { user } }) => {
    const { requireMembership } = await import('#/features/orgs/org.server')
    const { deleteEntry } = await import('./changelog.server')
    await deleteEntry((await requireMembership(data.org, user.id)).id, data.id)
  })
