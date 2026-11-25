import { requireMcpAuth } from '@better-auth/mcp'
import { createFileRoute } from '@tanstack/react-router'
import { auth, MCP_RESOURCE } from '#/lib/auth/auth.server'

// POST /mcp: the MCP server. OAuth-protected; an unauthenticated call gets a 401 that starts the client's sign-in.
const handler = requireMcpAuth(
  auth,
  async (request, claims) => (await import('#/features/mcp/mcp.server')).handleMcp(request, claims),
  { resource: MCP_RESOURCE },
)

export const Route = createFileRoute('/mcp')({
  server: {
    handlers: {
      POST: ({ request }) => handler(request),
      GET: ({ request }) => handler(request),
      DELETE: ({ request }) => handler(request),
    },
  },
})
