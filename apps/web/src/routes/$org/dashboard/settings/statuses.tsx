import { createFileRoute } from '@tanstack/react-router'
import { PageHead } from '#/features/dashboard/components/panel'
import { postListQuery } from '#/features/posts/post.queries'
import { StatusesManager } from '#/features/statuses/components/statuses-manager'

export const Route = createFileRoute('/$org/dashboard/settings/statuses')({
  loader: ({ context, params }) => context.queryClient.query(postListQuery(params.org)),
  component: function Statuses() {
    const { org } = Route.useParams()
    return (
      <>
        <PageHead title="Statuses" sub="Where a request can be. The order here is the order on the roadmap." />
        <StatusesManager org={org} />
      </>
    )
  },
})
