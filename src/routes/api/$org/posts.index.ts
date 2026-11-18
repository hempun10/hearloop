import { createFileRoute } from '@tanstack/react-router'
import { json, withOrg } from '#/features/api/api.server'
import { postStatusSchema } from '#/features/posts/post.schema'
import { listPosts } from '#/features/posts/post.server'

// GET /api/:org/posts[?status=open|planned|building|shipped]
export const Route = createFileRoute('/api/$org/posts/')({
  server: {
    handlers: {
      GET: ({ request, params }) =>
        withOrg(params.org, async (org) => {
          const raw = new URL(request.url).searchParams.get('status')
          const status = postStatusSchema.optional().safeParse(raw ?? undefined)
          if (!status.success) return json({ error: 'bad status' }, 400)
          return json(await listPosts(org.id, status.data))
        }),
    },
  },
})
