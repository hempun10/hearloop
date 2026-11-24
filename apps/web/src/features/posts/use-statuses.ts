import { useMemo } from 'react'
import { useOrg } from '#/features/orgs/use-org'
import { findStatus, statusOptions } from './status'
import type { Post } from '#/db/schema'

/** The current board's statuses: built-ins plus its own. */
export function useStatuses() {
  const { statuses } = useOrg()
  return useMemo(() => statusOptions(statuses), [statuses])
}

export function useStatusOf(post: Pick<Post, 'status' | 'statusId'>) {
  return findStatus(useStatuses(), post)
}
