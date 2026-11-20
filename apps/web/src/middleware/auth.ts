import { createMiddleware } from '@tanstack/react-start'
import { getRequestHeaders } from '@tanstack/react-start/server'
import { auth } from '#/lib/auth/auth.server'

/** Adds the signed-in user (or null) to the server function context. */
export const sessionMiddleware = createMiddleware({ type: 'function' }).server(async ({ next }) => {
  const session = await auth.api.getSession({ headers: getRequestHeaders() as unknown as Headers })
  return next({ context: { user: session?.user ?? null } })
})

/** Rejects the call unless someone is signed in. */
export const authMiddleware = createMiddleware({ type: 'function' })
  .middleware([sessionMiddleware])
  .server(async ({ next, context }) => {
    if (!context.user) throw new Error('Sign in first.')
    return next({ context: { user: context.user } })
  })
