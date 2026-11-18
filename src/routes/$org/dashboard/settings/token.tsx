import { createFileRoute } from '@tanstack/react-router'
import { PageHead } from '#/features/dashboard/components/panel'
import { LoopTokenCard } from '#/features/orgs/components/loop-token-card'
import { useOrg } from '#/features/orgs/use-org'

export const Route = createFileRoute('/$org/dashboard/settings/token')({ component: Token })

function Token() {
  const { org } = useOrg()
  return (
    <>
      <PageHead title="Loop API token" sub="The loop uses this to move posts to building and record Kane's verdict. It's shown once; only a hash is kept." />
      <LoopTokenCard org={org} />
    </>
  )
}
