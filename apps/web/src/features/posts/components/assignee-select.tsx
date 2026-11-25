import type { ReactNode } from 'react'
import { AgentIcon } from '#/components/agent-icon'

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

export function Initials({ name, className = 'size-5 text-[9px]' }: { name: string; className?: string }) {
  return (
    <span
      title={name}
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-secondary font-semibold text-foreground ring-1 ring-border ${className}`}
    >
      {initials(name)}
    </span>
  )
}

type Team = { members: { id: string; name: string }[]; agents: { id: number; name: string; icon: string | null }[] }
type AssigneeOption = { value: string; label: string; icon: ReactNode; agent: boolean }

/** Everyone a request can be handed to: members, then coding agents. */
export function assigneeOptions(team: Team, size = 'size-5'): AssigneeOption[] {
  return [
    ...team.members.map((m) => ({
      value: `u:${m.id}`,
      label: m.name,
      icon: <Initials name={m.name} className={`${size} text-[9px]`} />,
      agent: false,
    })),
    ...team.agents.map((a) => ({
      value: `a:${a.id}`,
      label: a.name,
      icon: <AgentIcon name={a.name} icon={a.icon} className={size} />,
      agent: true,
    })),
  ]
}

export const assigneeKeyOf = (p: { assigneeId: string | null; assigneeTokenId: number | null }) =>
  p.assigneeId ? `u:${p.assigneeId}` : p.assigneeTokenId ? `a:${p.assigneeTokenId}` : null
