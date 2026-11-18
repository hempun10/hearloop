import { queryOptions } from '@tanstack/react-query'
import { getOrg, getSession } from './org.functions'

export const sessionQuery = () =>
  queryOptions({ queryKey: ['session'], queryFn: () => getSession(), staleTime: 60_000 })

export const orgQuery = (org: string) =>
  queryOptions({ queryKey: ['org', org], queryFn: () => getOrg({ data: { org } }) })
