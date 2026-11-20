import type { z } from 'zod'
import { findOrg, type PublicOrg } from '#/features/orgs/org.server'
import { type Actor, resolveToken } from '#/features/tokens/tokens.server'

export const json = (data: unknown, status = 200) => Response.json(data, { status })
export const notFound = (what = 'not found') => json({ error: what }, 404)

/** Loads the board named in the URL, or answers 404. */
export async function withOrg(slug: string, fn: (org: PublicOrg) => Promise<Response>) {
  const org = await findOrg(slug.toLowerCase())
  return org ? fn(org) : notFound('org not found')
}

/** As withOrg, but the caller must send one of the board's live tokens (Authorization: Bearer hl_…); the handler learns who it is. */
export function withOrgToken(request: Request, slug: string, fn: (org: PublicOrg, actor: Actor) => Promise<Response>) {
  return withOrg(slug, async (org) => {
    const got = request.headers.get('authorization')?.replace(/^Bearer /, '')
    const actor = got ? await resolveToken(org.id, got) : null
    return actor ? fn(org, actor) : json({ error: 'unauthorized' }, 401)
  })
}

/** Parses a JSON body with a zod schema; a bad body answers 400 with the first issue. */
export async function parseBody<T extends z.ZodType>(request: Request, schema: T): Promise<{ data: z.infer<T> } | { error: Response }> {
  const result = schema.safeParse(await request.json().catch(() => undefined))
  if (result.success) return { data: result.data }
  return { error: json({ error: result.error.issues[0]?.message ?? 'bad request' }, 400) }
}
