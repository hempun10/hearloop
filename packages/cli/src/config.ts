import { readFileSync } from 'node:fs'

export type Config = {
  /** your board, e.g. https://hearloop.app/acme */
  board: string
  /** the app Kane tests, e.g. http://localhost:5173 or a staging URL */
  app: string
  /** claude | codex | cursor | gemini | aider | manual, or a shell command containing {prompt} */
  agent: string
  /** shell command run after the agent, e.g. "pnpm build" */
  build?: string
  /** shell command run before Kane verifies, e.g. "pnpm deploy:staging" */
  deploy?: string
  /** attempts before giving up (default 3) */
  maxTries?: number
  /** Kane Test Manager folder id to file runs under */
  kaneFolder?: string
}

export const CONFIG_FILE = 'hearloop.json'

export function loadConfig(path = CONFIG_FILE): Config {
  let raw: unknown
  try { raw = JSON.parse(readFileSync(path, 'utf8')) } catch { throw new Error(`No ${path} here. Run \`npx hearloop init\` first.`) }
  const c = raw as Partial<Config>
  for (const k of ['board', 'app', 'agent'] as const) if (!c[k] || typeof c[k] !== 'string') throw new Error(`${path}: "${k}" is required`)
  boardApi(c.board!) // validates the URL
  return c as Config
}

/** https://host/acme -> https://host/api/acme */
export function boardApi(board: string): string {
  const u = new URL(board)
  const slug = u.pathname.split('/').filter(Boolean)[0]
  if (!slug) throw new Error(`"board" must be your board's URL, like https://hearloop.app/acme (got ${board})`)
  return `${u.origin}/api/${slug}`
}
