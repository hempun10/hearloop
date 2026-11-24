import { queryOptions } from '@tanstack/react-query'
import { getIntegrations } from './integration.functions'

export const integrationsQuery = (org: string) => queryOptions({ queryKey: ['integrations', org], queryFn: () => getIntegrations({ data: { org } }) })
