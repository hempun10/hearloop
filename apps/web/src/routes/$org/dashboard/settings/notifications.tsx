import { createFileRoute } from '@tanstack/react-router'
import { PageHead } from '#/features/dashboard/components/panel'
import { NotificationsManager } from '#/features/integrations/components/notifications-manager'
import { integrationsQuery } from '#/features/integrations/integration.queries'

export const Route = createFileRoute('/$org/dashboard/settings/notifications')({
  loader: ({ context, params }) => context.queryClient.ensureQueryData(integrationsQuery(params.org)),
  component: function Notifications() {
    const { org } = Route.useParams()
    return (
      <>
        <PageHead
          title="Notifications"
          sub="Post the board's news to a Slack or Discord channel, and pick which events each one gets."
        />
        <NotificationsManager org={org} />
      </>
    )
  },
})
