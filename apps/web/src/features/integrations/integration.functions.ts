import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { orgSlugSchema } from '#/features/orgs/org.schema'
import { authMiddleware } from '#/middleware/auth'
import { connectSchema, kindRefSchema, setEventsSchema } from './integration.schema'

export const getIntegrations = createServerFn()
  .middleware([authMiddleware])
  .validator(z.object({ org: orgSlugSchema }))
  .handler(async ({ data, context: { user } }) => {
    const { requireMembership } = await import('#/features/orgs/org.server')
    const { listIntegrations } = await import('./integration.server')
    return listIntegrations((await requireMembership(data.org, user.id)).id)
  })

export const connect = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .validator(connectSchema)
  .handler(async ({ data, context: { user } }) => {
    const { requireMembership } = await import('#/features/orgs/org.server')
    const { connectIntegration, sendTest } = await import('./integration.server')
    const org = await requireMembership(data.org, user.id)
    await connectIntegration(org.id, data.kind, data.url, data.events)
    return sendTest(org.id, data.kind)
  })

export const disconnect = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .validator(kindRefSchema)
  .handler(async ({ data, context: { user } }) => {
    const { requireMembership } = await import('#/features/orgs/org.server')
    const { disconnectIntegration } = await import('./integration.server')
    await disconnectIntegration((await requireMembership(data.org, user.id)).id, data.kind)
  })

export const testIntegration = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .validator(kindRefSchema)
  .handler(async ({ data, context: { user } }) => {
    const { requireMembership } = await import('#/features/orgs/org.server')
    const { sendTest } = await import('./integration.server')
    return sendTest((await requireMembership(data.org, user.id)).id, data.kind)
  })

export const setEvents = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .validator(setEventsSchema)
  .handler(async ({ data, context: { user } }) => {
    const { requireMembership } = await import('#/features/orgs/org.server')
    const { setIntegrationEvents } = await import('./integration.server')
    if (!(await setIntegrationEvents((await requireMembership(data.org, user.id)).id, data.kind, data.events)))
      throw new Error('Connect it first.')
  })
