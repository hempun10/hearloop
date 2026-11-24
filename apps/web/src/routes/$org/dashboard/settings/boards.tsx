import { createFileRoute } from '@tanstack/react-router'
import { CategoriesManager } from '#/features/categories/components/categories-manager'
import { PageHead } from '#/features/dashboard/components/panel'
import { postListQuery, tagsQuery } from '#/features/posts/post.queries'

export const Route = createFileRoute('/$org/dashboard/settings/boards')({
  loader: ({ context, params }) => Promise.all([context.queryClient.query(tagsQuery(params.org)), context.queryClient.query(postListQuery(params.org))]),
  component: function Boards() {
    const { org } = Route.useParams()
    return (
      <>
        <PageHead title="Boards & tags" sub="Boards group requests, like Feature requests and Bugs. Tags cut across them." />
        <CategoriesManager org={org} />
      </>
    )
  },
})
