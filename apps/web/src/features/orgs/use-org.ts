import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { orgQuery } from './org.queries'

/** The board for the current /$org route. The $org loader guarantees it exists. */
export function useOrg() {
  const { org: slug } = useParams({ from: '/$org' })
  const { data } = useSuspenseQuery(orgQuery(slug))
  if (!data) throw new Error(`useOrg: no board "${slug}"`)
  return data
}
