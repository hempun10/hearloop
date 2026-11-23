import { createFileRoute } from '@tanstack/react-router'
import { json, notFound, parseBody, withOrgToken } from '#/features/api/api.server'
import { postIdSchema, recordRunSchema } from '#/features/posts/post.schema'
import { recordRun } from '#/features/posts/post.server'

// POST /api/:org/posts/:id/runs {passed, summary, changelog?}   (Bearer loop token)
export const Route = createFileRoute('/api/$org/posts/$id/runs')({
  server: {
    handlers: {
      POST: ({ request, params }) =>
        withOrgToken(request, params.org, async (org, actor) => {
          const id = postIdSchema.safeParse(params.id)
          if (!id.success) return notFound()
          const body = await parseBody(request, recordRunSchema)
          if ('error' in body) return body.error
          const result = await recordRun(org.id, id.data, body.data, actor)
          if (!result) return notFound()
          return 'conflict' in result ? json({ error: result.conflict }, 409) : json(result)
        }),
    },
  },
})
