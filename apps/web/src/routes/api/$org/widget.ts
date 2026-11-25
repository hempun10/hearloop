import { createFileRoute } from '@tanstack/react-router'
import { listChangelog } from '#/features/changelog/changelog.server'
import { findOrg } from '#/features/orgs/org.server'
import { widgetMeta } from '#/features/widget/widget.schema'

// GET /api/:org/widget: the widget's saved look, read by public/widget.js on any site
export const Route = createFileRoute('/api/$org/widget')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const headers = { 'access-control-allow-origin': '*', 'cache-control': 'public, max-age=60' }
        const org = await findOrg(params.org)
        if (!org) return Response.json({ error: 'not found' }, { status: 404, headers })
        const [latest] = await listChangelog(org.id)
        return Response.json(widgetMeta(org, latest ? new Date(latest.createdAt).getTime() : null), { headers })
      },
    },
  },
})
