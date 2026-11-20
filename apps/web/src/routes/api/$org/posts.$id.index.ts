import { createFileRoute } from '@tanstack/react-router'
import { json, notFound, withOrg } from '#/features/api/api.server'
import { postIdSchema } from '#/features/posts/post.schema'
import { getPostWithRuns } from '#/features/posts/post.server'

// GET /api/:org/posts/:id
export const Route = createFileRoute('/api/$org/posts/$id/')({
  server: {
    handlers: {
      GET: ({ params }) =>
        withOrg(params.org, async (org) => {
          const id = postIdSchema.safeParse(params.id)
          const post = id.success ? await getPostWithRuns(org.id, id.data) : null
          return post ? json(post) : notFound()
        }),
    },
  },
})
