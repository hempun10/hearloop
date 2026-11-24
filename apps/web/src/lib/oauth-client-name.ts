/**
 * The agent's own name. Claude Code registers as "Claude Code (hearloop)" or "(hearloop-prod)", adding the name the
 * user gave this MCP server; we show "Claude Code". Only our server's name is stripped, so other names stay as the client set them.
 */
export const agentName = (clientName: string | null | undefined) =>
  (clientName ?? '').replace(/\s*\(hearloop[\w-]*\)\s*$/i, '').trim() || 'An MCP client'
