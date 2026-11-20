import { oauthProviderClient } from '@better-auth/oauth-provider/client'
import { createAuthClient } from 'better-auth/react'

// oauthProviderClient carries an MCP client's signed OAuth query through sign-in and consent
export const authClient = createAuthClient({ plugins: [oauthProviderClient()] })
