import { mcp } from '@better-auth/mcp'
import { betterAuth } from 'better-auth'
import { jwt } from 'better-auth/plugins'
import { env } from 'cloudflare:workers'
import { hashPassword, verifyPassword } from '#/lib/crypto.server'

/** The MCP endpoint's resource id: OAuth access tokens are bound to it (their audience). */
export const MCP_RESOURCE = `${env.BETTER_AUTH_URL}/mcp`

// Better Auth's built-in D1 adapter; the tables are declared in src/db/schema.ts
export const auth = betterAuth({
  database: env.DB,
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    password: { hash: hashPassword, verify: verifyPassword },
  },
  // the JWT plugin only signs MCP access tokens; its session-JWT route and header stay off
  disabledPaths: ['/token'],
  // the old app's sign-in cookies (same default name, set for all of .hearloop.app) shadowed ours: use our own name
  advanced: { cookiePrefix: 'hearloop' },
  plugins: [
    jwt({ disableSettingJwtHeader: true }),
    // OAuth 2.1 for MCP clients (Claude Code, Cursor, …): sign in once, approve the client, done.
    // ponytail: open dynamic client registration, since most MCP clients still use it; add @better-auth/cimd when clients move to CIMD.
    mcp({
      loginPage: '/login',
      consentPage: '/consent',
      resource: MCP_RESOURCE,
      allowDynamicClientRegistration: true,
      allowUnauthenticatedClientRegistration: true,
      clientRegistrationDefaultApplicationType: 'infer',
      refreshTokenReuseInterval: 0,
    }),
  ],
})
