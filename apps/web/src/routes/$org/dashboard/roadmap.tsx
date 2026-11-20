import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Panel } from '#/features/dashboard/components/panel'
import { RoadmapBoard } from '#/features/posts/components/roadmap-board'
import { postListQuery } from '#/features/posts/post.queries'

export const Route = createFileRoute('/$org/dashboard/roadmap')({
  loader: ({ context, params }) => context.queryClient.query(postListQuery(params.org)),
  component: function DashboardRoadmap() {
    const { org } = Route.useParams()
    const { data: posts } = useSuspenseQuery(postListQuery(org))
    return (
      <Panel title="Roadmap" actions={<span className="hidden text-[13px] text-faint lg:inline">Drag cards between columns to change status</span>}>
        <RoadmapBoard org={org} posts={posts} />
      </Panel>
    )
  },
})
