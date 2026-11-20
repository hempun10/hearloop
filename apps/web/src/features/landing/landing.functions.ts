import { createServerFn } from '@tanstack/react-start'

export const DEMO_ORG = 'demo'

export const getLanding = createServerFn().handler(async () => {
  const { findOrgOrThrow } = await import('#/features/orgs/org.server')
  const { landingData } = await import('./landing.server')
  return landingData((await findOrgOrThrow(DEMO_ORG)).id)
})
