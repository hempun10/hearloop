import { createFileRoute } from '@tanstack/react-router'
import { json, notFound, withOrgToken } from '#/features/api/api.server'
import { postIdSchema } from '#/features/posts/post.schema'
import { claimPost } from '#/features/posts/post.server'

// POST /api/:org/posts/:id/claim   (Bearer token)
// Claims the post for this loop (status building) or renews the claim; 409 if another loop holds it.
export const Route = createFileRoute('/api/$org/posts/$id/claim')({
  server: {
    handlers: {
      POST: ({ request, params }) =>
        withOrgToken(request, params.org, async (org, actor) => {
          const id = postIdSchema.safeParse(params.id)
          if (!id.success) return notFound()
          const result = await claimPost(org.id, id.data, actor)
          if (!result) return notFound()
          return 'conflict' in result ? json({ error: result.conflict }, 409) : json(result.post)
        }),
    },
  },
})
