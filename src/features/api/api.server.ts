import type { z } from 'zod'
import { same, sha256 } from '#/lib/crypto.server'
import { findOrg, tokenHashFor, type PublicOrg } from '#/features/orgs/org.server'

export const json = (data: unknown, status = 200) => Response.json(data, { status })
export const notFound = (what = 'not found') => json({ error: what }, 404)

/** Loads the board named in the URL, or answers 404. */
export async function withOrg(slug: string, fn: (org: PublicOrg) => Promise<Response>) {
  const org = await findOrg(slug.toLowerCase())
  return org ? fn(org) : notFound('org not found')
}

/** As withOrg, but the caller must send the board's loop token: Authorization: Bearer hl_… */
export function withOrgToken(request: Request, slug: string, fn: (org: PublicOrg) => Promise<Response>) {
  return withOrg(slug, async (org) => {
    const want = await tokenHashFor(org.id)
    const got = request.headers.get('authorization')?.replace(/^Bearer /, '')
    if (!want || !got || !same(await sha256(got), want)) return json({ error: 'unauthorized' }, 401)
    return fn(org)
  })
}

/** Parses a JSON body with a zod schema; a bad body answers 400 with the first issue. */
export async function parseBody<T extends z.ZodType>(request: Request, schema: T): Promise<{ data: z.infer<T> } | { error: Response }> {
  const result = schema.safeParse(await request.json().catch(() => undefined))
  if (result.success) return { data: result.data }
  return { error: json({ error: result.error.issues[0]?.message ?? 'bad request' }, 400) }
}
