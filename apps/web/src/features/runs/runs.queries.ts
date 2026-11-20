import { queryOptions } from '@tanstack/react-query'
import { listRuns } from './runs.functions'

export const runsQuery = (org: string) => queryOptions({ queryKey: ['runs', org], queryFn: () => listRuns({ data: { org } }) })
