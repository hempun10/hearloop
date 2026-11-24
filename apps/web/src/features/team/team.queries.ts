import { queryOptions } from '@tanstack/react-query'
import { getTeam } from './team.functions'

export const teamQuery = (org: string) => queryOptions({ queryKey: ['team', org], queryFn: () => getTeam({ data: { org } }) })
