import { createFileRoute } from '@tanstack/react-router'
import { PageHead } from '#/features/dashboard/components/panel'
import { TokenManager } from '#/features/tokens/components/token-manager'
import { tokensQuery } from '#/features/tokens/tokens.queries'

export const Route = createFileRoute('/$org/dashboard/settings/token')({
  loader: ({ context, params }) => context.queryClient.ensureQueryData(tokensQuery(params.org)),
  component: Token,
})

function Token() {
  const { org } = Route.useParams()
  return (
    <>
      <PageHead title="Loop API tokens" sub="The loop uses a token to claim a request and record Kane's verdict. Each is shown once; only a hash is kept." />
      <TokenManager org={org} />
    </>
  )
}
