import { createFileRoute } from '@tanstack/react-router'
import { env } from 'cloudflare:workers'
import * as db from '#/lib/db'

const json = (data: unknown, status = 200) => Response.json(data, { status })

function authed(req: Request) {
  const token = (env as { API_TOKEN?: string }).API_TOKEN
  return !!token && req.headers.get('authorization') === `Bearer ${token}`
}

// /api/posts, /api/posts/:id, /api/posts/:id/status, /api/posts/:id/runs, /api/changelog
function parse(url: string) {
  const [, , res, id, sub] = new URL(url).pathname.split('/')
  return { res, id: id ? Number(id) : undefined, sub }
}

export const Route = createFileRoute('/api/$')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { res, id } = parse(request.url)
        if (res === 'changelog') return json(await db.listChangelog())
        if (res !== 'posts') return json({ error: 'not found' }, 404)
        if (id) {
          const p = await db.getPost(id)
          return p ? json(p) : json({ error: 'not found' }, 404)
        }
        const status = new URL(request.url).searchParams.get('status') as db.Status | null
        if (status && !db.STATUSES.includes(status)) return json({ error: 'bad status' }, 400)
        return json(await db.listPosts(status ?? undefined))
      },
      POST: async ({ request }) => {
        if (!authed(request)) return json({ error: 'unauthorized' }, 401)
        const { res, id, sub } = parse(request.url)
        if (res !== 'posts' || !id || !Number.isInteger(id)) return json({ error: 'not found' }, 404)
        const body = (await request.json().catch(() => ({}))) as Record<string, unknown>
        if (sub === 'status') {
          if (!db.STATUSES.includes(body.status as db.Status)) return json({ error: 'bad status' }, 400)
          const p = await db.setStatus(id, body.status as db.Status)
          return p ? json(p) : json({ error: 'not found' }, 404)
        }
        if (sub === 'runs') {
          if (typeof body.passed !== 'boolean') return json({ error: 'passed (boolean) required' }, 400)
          const p = await db.recordRun(id, body.passed, String(body.summary ?? '').slice(0, 8000), body.changelog ? String(body.changelog).slice(0, 4000) : undefined)
          return p ? json(p) : json({ error: 'not found' }, 404)
        }
        return json({ error: 'not found' }, 404)
      },
    },
  },
})
