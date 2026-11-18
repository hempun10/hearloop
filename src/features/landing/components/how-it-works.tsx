import { ChevronUp, CircleCheck } from 'lucide-react'
import type { ReactNode } from 'react'
import { Card } from '#/components/ui/card'
import type { ChangelogEntry, Post } from '#/db/schema'
import { StatusBadge } from '#/features/posts/components/status-badge'
import { shortDate } from '#/lib/format'
import { cn } from '#/lib/utils'
import { kaneSteps } from './loop-terminal'
import { SectionHeading } from './section-heading'

const FALLBACK_KANE = ['Opened the board', 'Typed in the search box', 'Checked only matching requests stay', 'Cleared the box, all requests came back']

export function HowItWorks({ top, lastPass, latest }: {
  top: Post[]
  lastPass: { summary: string } | null
  latest: Pick<ChangelogEntry, 'title' | 'body' | 'createdAt'> | undefined
}) {
  const steps = lastPass ? kaneSteps(lastPass.summary, 4) : []
  return (
    <section id="how" className="mx-auto max-w-6xl scroll-mt-20 px-4 pt-28 md:px-8">
      <SectionHeading kicker="How it works" title="One loop, no hand-offs." description="From a vote to a verified release without anyone copying a ticket into a sprint." />
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        <Tile className="md:col-span-2" n="01" title="Users ask" text="A public board with votes. The most wanted request rises to the top on its own.">
          <ol className="grid gap-2">
            {top.length === 0 && <MiniRow rank={1} title="Your first request goes here" votes={0} />}
            {top.map((p, i) => <MiniRow key={p.id} rank={i + 1} title={p.title} votes={p.votes} badge={p.status !== 'open' ? <StatusBadge status={p.status} /> : null} />)}
          </ol>
        </Tile>
        <Tile n="02" title="An agent builds it" text="Claude Code picks up the top request, implements it and writes the browser test that should prove it.">
          <pre className="overflow-hidden rounded-lg border bg-background/60 p-3 font-mono text-[11px] leading-5 text-muted-foreground">
            <span className="text-faint">$ bun run loop</span>{'\n'}
            <span className="text-status-shipped">+</span> {'<input type="search"'}{'\n'}
            <span className="text-status-shipped">+</span> {'  aria-label="Search requests"'}{'\n'}
            <span className="text-status-shipped">+</span> {'  onChange={…} />'}{'\n'}
            <span className="text-faint">wrote .hearloop/kane-objective.txt</span>
          </pre>
        </Tile>
        <Tile n="03" title="Kane proves it" text="Kane CLI drives a real browser through the test. A failure goes straight back to the agent.">
          <ul className="grid gap-2 text-xs leading-5 text-muted-foreground">
            {(steps.length ? steps : FALLBACK_KANE).map((s) => (
              <li key={s} className="flex gap-2"><CircleCheck className="mt-0.5 size-4 shrink-0 text-status-shipped" /><span className="line-clamp-2">{s}</span></li>
            ))}
          </ul>
        </Tile>
        <Tile className="md:col-span-2" n="04" title="Everyone hears" text="The post moves to shipped and a changelog entry, written by the agent, goes live. Voters see their idea land.">
          {latest ? (
            <div className="rounded-lg border bg-background/60 p-4">
              <p className="text-[11px] text-faint">Changelog · {shortDate(latest.createdAt)}</p>
              <p className="mt-1 text-sm font-semibold">{latest.title}</p>
              <p className="mt-1 line-clamp-2 text-[13px] leading-5 text-muted-foreground">{latest.body}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-status-shipped/10 px-2 py-0.5 text-[11px] font-medium">
                <span className="size-1.5 rounded-full bg-status-shipped" />Verified with Kane CLI
              </span>
            </div>
          ) : (
            <p className="rounded-lg border bg-background/60 p-4 text-[13px] text-muted-foreground">The first passing run lands here.</p>
          )}
        </Tile>
      </div>
    </section>
  )
}

function Tile({ n, title, text, children, className }: { n: string; title: string; text: string; children: ReactNode; className?: string }) {
  return (
    <Card className={cn('gap-5 rounded-2xl p-6 shadow-none transition-colors hover:border-input', className)}>
      <div>
        <p className="text-xs text-faint tabular-nums">{n}</p>
        <h3 className="mt-2 text-[17px] font-semibold">{title}</h3>
        <p className="mt-1.5 text-[13px] leading-6 text-muted-foreground">{text}</p>
      </div>
      <div className="mt-auto">{children}</div>
    </Card>
  )
}

function MiniRow({ rank, title, votes, badge }: { rank: number; title: string; votes: number; badge?: ReactNode }) {
  return (
    <li className="flex items-center gap-3 rounded-lg border bg-background/60 px-3 py-2.5 text-[13px]">
      <span className="text-[11px] text-faint tabular-nums">{String(rank).padStart(2, '0')}</span>
      <span className="min-w-0 flex-1 truncate font-medium">{title}</span>
      {badge}
      <span className="flex h-8 w-9 flex-col items-center justify-center rounded-md border bg-card text-[11px] font-semibold tabular-nums">
        <ChevronUp className="size-3" strokeWidth={2.5} />{votes}
      </span>
    </li>
  )
}
