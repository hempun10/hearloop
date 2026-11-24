import { useMutation } from '@tanstack/react-query'
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { Button } from '@hearloop/ui/components/button'
import { FieldError } from '@hearloop/ui/components/field'
import { useRefreshSession } from '#/features/auth/use-session'
import { getInvite, joinBoard } from '#/features/team/team.functions'

export const Route = createFileRoute('/_site/invite/$token')({
  beforeLoad: ({ context: { session }, params }) => {
    if (!session) throw redirect({ to: '/login', search: { mode: 'signup', next: `/invite/${params.token}` } })
  },
  loader: ({ params }) => getInvite({ data: { token: params.token } }).catch(() => null),
  component: Invite,
})

function Invite() {
  const { token } = Route.useParams()
  const board = Route.useLoaderData()
  const navigate = useNavigate()
  const refresh = useRefreshSession()
  const join = useMutation({
    mutationFn: () => joinBoard({ data: { token } }),
    onSuccess: async (slug) => { await refresh(); await navigate({ to: '/$org/dashboard', params: { org: slug } }) },
  })
  return (
    <main className="mx-auto max-w-md px-4 pt-20">
      {board ? (
        <>
          <h1 className="text-2xl font-semibold">Join {board.name}</h1>
          <p className="mt-2 text-sm text-muted-foreground">You were invited to help run the {board.name} feedback board. Members approve requests, move them, and see internal notes.</p>
          <Button className="mt-6" disabled={join.isPending} onClick={() => join.mutate()}>{join.isPending ? 'Joining' : `Join ${board.name}`}</Button>
          {join.error && <FieldError role="alert" className="mt-3">{join.error.message}</FieldError>}
        </>
      ) : (
        <>
          <h1 className="text-2xl font-semibold">This invite link doesn't work</h1>
          <p className="mt-2 text-sm text-muted-foreground">It was already used, cancelled, or it expired. Ask a member of the board for a new one.</p>
        </>
      )}
    </main>
  )
}
