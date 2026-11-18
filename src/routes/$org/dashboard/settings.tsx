import { createFileRoute } from '@tanstack/react-router'
import { PartyPopper } from 'lucide-react'
import { z } from 'zod'
import { PageHeader } from '#/components/page-header'
import { Alert, AlertDescription, AlertTitle } from '#/components/ui/alert'
import { LoopTokenCard } from '#/features/orgs/components/loop-token-card'
import { OrgSettingsForm } from '#/features/orgs/components/org-settings-form'
import { useOrg } from '#/features/orgs/use-org'

export const Route = createFileRoute('/$org/dashboard/settings')({
  validateSearch: z.object({ welcome: z.boolean().optional().catch(undefined) }),
  component: Settings,
})

function Settings() {
  const { org } = useOrg()
  const { welcome } = Route.useSearch()
  return (
    <>
      <PageHeader title="Settings" />
      <div className="max-w-3xl px-6 pb-24">
        {welcome && (
          <Alert className="mt-6">
            <PartyPopper />
            <AlertTitle>{org.name} is live.</AlertTitle>
            <AlertDescription>Make it look like yours, share the board link, then give the loop a token so an agent can build and Kane can verify.</AlertDescription>
          </Alert>
        )}
        <OrgSettingsForm key={org.slug} org={org} />
        <LoopTokenCard org={org} />
      </div>
    </>
  )
}
