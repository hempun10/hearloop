import { useQueryClient } from '@tanstack/react-query'
import { useNavigate, useRouteContext, useRouter } from '@tanstack/react-router'
import { authClient } from '#/lib/auth/auth-client'
import { sessionQuery } from '#/features/orgs/org.queries'

export function useSession() {
  return useRouteContext({ from: '__root__', select: (c) => c.session })
}

/** Drops everything cached for the old identity and re-runs route guards. */
export function useRefreshSession() {
  const queryClient = useQueryClient()
  const router = useRouter()
  return async () => {
    queryClient.removeQueries({ queryKey: sessionQuery().queryKey })
    await queryClient.invalidateQueries()
    await router.invalidate()
    return queryClient.query(sessionQuery())
  }
}

export function useSignOut(redirectTo = '/') {
  const refresh = useRefreshSession()
  const navigate = useNavigate()
  return async () => {
    await authClient.signOut()
    await refresh()
    await navigate({ to: redirectTo })
  }
}
