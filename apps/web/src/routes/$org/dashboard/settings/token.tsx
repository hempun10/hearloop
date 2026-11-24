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
      <PageHead title="Loop API tokens" sub="Each token, and each coding agent connected over MCP, is an agent you can assign requests to. Upload an icon, or keep its default logo. A token is shown once; only a hash is kept." />
      <TokenManager org={org} />
    </>
  )
}
