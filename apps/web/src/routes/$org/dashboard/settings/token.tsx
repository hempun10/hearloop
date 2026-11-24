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
      <PageHead title="Loop API tokens" sub="Connect coding agents over MCP, or create a token for the HTTP API. Every agent and token here can be assigned requests." />
      <TokenManager org={org} />
    </>
  )
}
