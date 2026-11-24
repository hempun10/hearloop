import { Bot, SquareTerminal } from 'lucide-react'
import { siClaude, siCursor, siGithubcopilot, siGooglegemini, siWindsurf } from 'simple-icons'
import { cn } from '@hearloop/ui/lib/utils'
import { type AgentKind, agentKind } from '#/lib/agent-kind'

const LOGOS: Partial<Record<AgentKind, { path: string; hex: string }>> = {
  claude: siClaude, copilot: siGithubcopilot, cursor: siCursor, gemini: siGooglegemini, windsurf: siWindsurf,
}

/** An agent's uploaded icon, else its logo (Claude, Copilot, Cursor…), else a robot. */
export function AgentIcon({ name, icon, className }: { name: string; icon?: string | null; className?: string }) {
  const box = cn('inline-flex size-5 shrink-0 items-center justify-center overflow-hidden rounded-md bg-secondary ring-1 ring-border', className)
  if (icon) return <img src={icon} alt="" title={name} className={cn(box, 'object-cover')} />
  const kind = agentKind(name)
  const logo = kind && LOGOS[kind]
  return (
    <span title={name} className={box}>
      {logo ? (
        <svg viewBox="0 0 24 24" aria-hidden className="size-[65%]" fill={kind === 'cursor' || kind === 'copilot' ? 'currentColor' : `#${logo.hex}`}><path d={logo.path} /></svg>
      ) : kind === 'pi' ? <span className="text-[11px] leading-none font-semibold">π</span>
        : kind === 'codex' ? <SquareTerminal className="size-[65%]" />
        : <Bot className="size-[65%] text-muted-foreground" />}
    </span>
  )
}
