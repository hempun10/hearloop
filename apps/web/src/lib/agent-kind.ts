/** Which coding agent a token or MCP connection is, from its name ("Claude Code", "GitHub Copilot", "codex-cli"…). */
export const AGENT_KINDS = ['claude', 'copilot', 'codex', 'cursor', 'gemini', 'windsurf', 'pi'] as const
export type AgentKind = (typeof AGENT_KINDS)[number]

const PATTERNS: [AgentKind, RegExp][] = [
  ['claude', /claude|anthropic/i],
  ['copilot', /copilot|vs ?code|github/i],
  ['codex', /codex|openai|chatgpt/i],
  ['cursor', /cursor/i],
  ['gemini', /gemini/i],
  ['windsurf', /windsurf|codeium/i],
  ['pi', /^pi\b|\bpi[- ](agent|coding)/i],
]

export const agentKind = (name: string): AgentKind | null => PATTERNS.find(([, re]) => re.test(name))?.[0] ?? null
