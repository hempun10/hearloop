import { createFileRoute } from '@tanstack/react-router'
import { auth } from '#/lib/auth/auth.server'

// OAuth discovery for MCP clients (RFC 8414 / RFC 9728); Better Auth serves these documents
export const Route = createFileRoute('/.well-known/$')({
  server: { handlers: { GET: ({ request }) => auth.handler(request) } },
})
