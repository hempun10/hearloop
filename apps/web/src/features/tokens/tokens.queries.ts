import { queryOptions } from '@tanstack/react-query'
import { getTokens } from './tokens.functions'

export const tokensQuery = (org: string) =>
  queryOptions({ queryKey: ['tokens', org], queryFn: () => getTokens({ data: { org } }) })
