import { createFileRoute } from '@tanstack/react-router'
import { PageHead } from '#/features/dashboard/components/panel'
import { TeamManager } from '#/features/team/components/team-manager'
import { teamQuery } from '#/features/team/team.queries'

export const Route = createFileRoute('/$org/dashboard/settings/team')({
  loader: ({ context, params }) => context.queryClient.ensureQueryData(teamQuery(params.org)),
  component: function Team() {
    const { org } = Route.useParams()
    return (
      <>
        <PageHead title="Members" sub="Members run the dashboard: they approve requests, move them, and see internal notes." />
        <TeamManager org={org} />
      </>
    )
  },
})
