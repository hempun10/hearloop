import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { Panel } from '#/features/dashboard/components/panel'
import { PostDialog } from '#/features/posts/components/post-dialog'
import { RoadmapBoard } from '#/features/posts/components/roadmap-board'
import { postListQuery } from '#/features/posts/post.queries'
import { teamQuery } from '#/features/team/team.queries'

export const Route = createFileRoute('/$org/dashboard/roadmap')({
  // ?post=12 opens that request over the board, so the link can be shared and survives a reload
  validateSearch: z.object({ post: z.number().int().positive().optional().catch(undefined) }),
  loader: ({ context, params }) =>
    Promise.all([
      context.queryClient.query(postListQuery(params.org)),
      context.queryClient.query(teamQuery(params.org)),
    ]),
  component: function DashboardRoadmap() {
    const { org } = Route.useParams()
    const { post } = Route.useSearch()
    const navigate = Route.useNavigate()
    const { data: posts } = useSuspenseQuery(postListQuery(org))
    return (
      <Panel
        title="Roadmap"
        actions={
          <span className="hidden text-[13px] text-faint lg:inline">Drag cards between columns to change status</span>
        }
      >
        <RoadmapBoard org={org} posts={posts} onOpen={(id) => navigate({ search: { post: id } })} />
        <PostDialog org={org} id={post} onClose={() => navigate({ search: {} })} />
      </Panel>
    )
  },
})
