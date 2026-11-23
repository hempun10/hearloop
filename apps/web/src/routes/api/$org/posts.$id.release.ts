import { createFileRoute } from '@tanstack/react-router'
import { json, notFound, withOrgToken } from '#/features/api/api.server'
import { postIdSchema } from '#/features/posts/post.schema'
import { releasePost } from '#/features/posts/post.server'

// POST /api/:org/posts/:id/release   (Bearer token)
// Gives up this loop's claim; the post goes back to planned. 404 if this loop doesn't hold it.
export const Route = createFileRoute('/api/$org/posts/$id/release')({
  server: {
    handlers: {
      POST: ({ request, params }) =>
        withOrgToken(request, params.org, async (org, actor) => {
          const id = postIdSchema.safeParse(params.id)
          if (!id.success) return notFound()
          const result = await releasePost(org.id, id.data, actor)
          return result ? json(result) : notFound('no claim held by this token')
        }),
    },
  },
})
