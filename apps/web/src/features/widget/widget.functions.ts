import { createServerFn } from '@tanstack/react-start'
import { authMiddleware } from '#/middleware/auth'
import { saveWidgetSchema } from './widget.schema'

export const saveWidget = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .validator(saveWidgetSchema)
  .handler(async ({ data, context: { user } }) => {
    const { requireMembership } = await import('#/features/orgs/org.server')
    const { db } = await import('#/db/client.server')
    const { orgs } = await import('#/db/schema')
    const { eq } = await import('drizzle-orm')
    const org = await requireMembership(data.org, user.id)
    await db.update(orgs).set({ widget: data.settings }).where(eq(orgs.id, org.id))
    return data.settings
  })
