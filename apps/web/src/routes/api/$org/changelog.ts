import { createFileRoute } from '@tanstack/react-router'
import { json, withOrg } from '#/features/api/api.server'
import { listChangelog } from '#/features/changelog/changelog.server'

// GET /api/:org/changelog
export const Route = createFileRoute('/api/$org/changelog')({
  server: {
    handlers: {
      GET: ({ params }) => withOrg(params.org, async (org) => json(await listChangelog(org.id))),
    },
  },
})
