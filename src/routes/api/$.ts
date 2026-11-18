import { createFileRoute } from '@tanstack/react-router'
import { auth } from '#/lib/auth'
import { same, sha256 } from '#/lib/crypto'
import * as db from '#/lib/db'

const json = (data: unknown, status = 200) => Response.json(data, { status })

// /api/auth/*                       Better Auth
// /api/:org/posts[?status=]         GET
// /api/:org/posts/:id               GET
// /api/:org/posts/:id/status        POST {status}            (Bearer org token)
// /api/:org/posts/:id/runs          POST {passed, summary}   (Bearer org token)
// /api/:org/changelog               GET
function parse(url: string) {
  const [, , org, res, id, sub] = new URL(url).pathname.split('/')
  return { org, res, id: id ? Number(id) : undefined, sub }
}

async function authed(req: Request, orgId: number) {
  const want = await db.orgTokenHash(orgId)
  const got = req.headers.get('authorization')?.replace(/^Bearer /, '')
  return !!want && !!got && same(await sha256(got), want)
}

export const Route = createFileRoute('/api/$')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { org: slug, res, id } = parse(request.url)
        if (slug === 'auth') return auth.handler(request)
        const org = slug ? await db.orgBySlug(slug) : null
        if (!org) return json({ error: 'org not found' }, 404)
        if (res === 'changelog') return json(await db.listChangelog(org.id))
        if (res !== 'posts') return json({ error: 'not found' }, 404)
        if (id) {
          const p = await db.getPost(org.id, id)
          return p ? json(p) : json({ error: 'not found' }, 404)
        }
        const status = new URL(request.url).searchParams.get('status') as db.Status | null
        if (status && !db.STATUSES.includes(status)) return json({ error: 'bad status' }, 400)
        return json(await db.listPosts(org.id, status ?? undefined))
      },
      POST: async ({ request }) => {
        const { org: slug, res, id, sub } = parse(request.url)
        if (slug === 'auth') return auth.handler(request)
        const org = slug ? await db.orgBySlug(slug) : null
        if (!org) return json({ error: 'org not found' }, 404)
        if (!(await authed(request, org.id))) return json({ error: 'unauthorized' }, 401)
        if (res !== 'posts' || !id || !Number.isInteger(id)) return json({ error: 'not found' }, 404)
        const body = (await request.json().catch(() => ({}))) as Record<string, unknown>
        if (sub === 'status') {
          if (!db.STATUSES.includes(body.status as db.Status)) return json({ error: 'bad status' }, 400)
          const p = await db.setStatus(org.id, id, body.status as db.Status)
          return p ? json(p) : json({ error: 'not found' }, 404)
        }
        if (sub === 'runs') {
          if (typeof body.passed !== 'boolean') return json({ error: 'passed (boolean) required' }, 400)
          const p = await db.recordRun(org.id, id, body.passed, String(body.summary ?? '').slice(0, 8000), body.changelog ? String(body.changelog).slice(0, 4000) : undefined)
          return p ? json(p) : json({ error: 'not found' }, 404)
        }
        return json({ error: 'not found' }, 404)
      },
    },
  },
})
