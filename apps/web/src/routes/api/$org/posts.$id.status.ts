import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { json, notFound, parseBody, withOrgToken } from '#/features/api/api.server'
import { postIdSchema, postStatusSchema } from '#/features/posts/post.schema'
import { updateStatus } from '#/features/posts/post.server'

// POST /api/:org/posts/:id/status {status}   (Bearer loop token)
export const Route = createFileRoute('/api/$org/posts/$id/status')({
  server: {
    handlers: {
      POST: ({ request, params }) =>
        withOrgToken(request, params.org, async (org) => {
          const id = postIdSchema.safeParse(params.id)
          if (!id.success) return notFound()
          const body = await parseBody(request, z.object({ status: postStatusSchema }))
          if ('error' in body) return body.error
          const post = await updateStatus(org.id, id.data, body.data.status)
          return post ? json(post) : notFound()
        }),
    },
  },
})
