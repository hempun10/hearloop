import { queryOptions } from '@tanstack/react-query'
import { listChangelog } from './changelog.functions'

export const changelogQuery = (org: string) =>
  queryOptions({ queryKey: ['changelog', org], queryFn: () => listChangelog({ data: { org } }) })
