import { createServerFn } from '@tanstack/react-start'
import { getRequestHeaders } from '@tanstack/react-start/server'
import { z } from 'zod'
import { agentName } from '#/lib/oauth-client-name'
import { authMiddleware } from '#/middleware/auth'

/** Checks the signed OAuth query on the consent page and names the client asking. null: changed or expired link. */
export const getConsentRequest = createServerFn()
  .middleware([authMiddleware])
  .validator(z.object({ query: z.string().max(8000) }))
  .handler(async ({ data }) => {
    const { auth } = await import('#/lib/auth/auth.server')
    const { verifyOAuthQueryParams } = await import('@better-auth/oauth-provider')
    const params = new URLSearchParams(data.query)
    const signedKeys = new Set(['sig', 'ba_param', ...params.getAll('ba_param')])
    const signed = new URLSearchParams([...params].filter(([k]) => signedKeys.has(k)))
    if (!(await verifyOAuthQueryParams(signed.toString(), (await auth.$context).secret))) return null
    const client = await auth.api
      .getOAuthClientPublic({ query: { client_id: signed.get('client_id') ?? '' }, headers: getRequestHeaders() as unknown as Headers })
      .catch(() => null)
    if (!client) return null
    // whoever registered the client chose its name, so also show where approval sends the code
    return { name: agentName(client.client_name), redirectHost: new URL(signed.get('redirect_uri') ?? 'about:blank').host || 'unknown' }
  })
