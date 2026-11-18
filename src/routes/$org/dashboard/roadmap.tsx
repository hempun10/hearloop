import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from '#/components/page-header'
import { RoadmapBoard } from '#/features/posts/components/roadmap-board'
import { postListQuery } from '#/features/posts/post.queries'

export const Route = createFileRoute('/$org/dashboard/roadmap')({
  loader: ({ context, params }) => context.queryClient.query(postListQuery(params.org)),
  component: function DashboardRoadmap() {
    const { org } = Route.useParams()
    const { data: posts } = useSuspenseQuery(postListQuery(org))
    return (
      <>
        <PageHeader title="Roadmap"><span className="text-xs text-faint">Drag a card to change its status</span></PageHeader>
        <RoadmapBoard org={org} posts={posts} />
      </>
    )
  },
})
