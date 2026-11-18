import { BadgeCheck, CircleCheck, ChevronUp } from 'lucide-react'
import type { ReactNode } from 'react'
import { AnimatedList } from '#/components/magic/animated-list'
import { NumberTicker } from '#/components/magic/number-ticker'
import { AnimatedSpan, Terminal, TypingAnimation } from '#/components/magic/terminal'
import type { ChangelogEntry, Post } from '#/db/schema'
import { STATUS_LABEL } from '#/features/posts/status'
import { shortDate } from '#/lib/format'
import { cn } from '#/lib/utils'
import { Framed, SectionHeader } from './frame'

type Entry = Pick<ChangelogEntry, 'title' | 'body' | 'createdAt'>

export function Bento({ top, lastPass, shipped }: { top: Post[]; lastPass: { title: string; steps: string[] } | null; shipped: Entry[] }) {
  const columns = [
    ['Planned', 'bg-status-planned', top.filter((p) => p.status === 'planned').map((p) => p.title)],
    ['In progress', 'bg-status-building', top.filter((p) => p.status === 'building').map((p) => p.title)],
    ['Shipped', 'bg-status-shipped', shipped.slice(0, 2).map((e) => e.title)],
  ] as const
  const latest = shipped[0]
  return (
    <Framed>
      <SectionHeader title="Small tool. Whole loop." sub="Four things the loop has to get right. Nothing else." />
      <div className="grid grid-cols-1 overflow-hidden md:grid-cols-2">
        <Cell title="Votes rank the queue" desc="One vote per person. The most wanted request rises to the top, and the loop takes it from there.">
          <div className="relative w-full max-w-[440px]">
            <AnimatedList delay={1600} className="w-full">
              {top.slice(0, 4).map((p, i) => <QueueRow key={p.id} post={p} hot={i === 0} />)}
            </AnimatedList>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-background to-transparent" />
          </div>
        </Cell>
        <Cell title="Kane proves it" desc="Kane CLI runs the agent's test in a real browser. Its report is attached to the post for anyone to read.">
          <Terminal title="kane-cli" className="max-w-[440px]">
            <TypingAnimation delay={200}>{`› Verify: ${lastPass?.title ?? 'the new feature'}`}</TypingAnimation>
            {(lastPass?.steps ?? []).slice(0, 3).map((s) => <AnimatedSpan key={s} className="text-muted-foreground">✓ {s}</AnimatedSpan>)}
            <AnimatedSpan className="text-status-shipped">● Kane: passed</AnimatedSpan>
          </Terminal>
        </Cell>
        <Cell title="A roadmap that stays honest" desc="Statuses move with the loop. The board, the roadmap and the changelog always agree.">
          <div className="grid w-full max-w-[480px] grid-cols-3 gap-2 md:gap-3">
            {columns.map(([name, dot, cards]) => (
              <div key={name} className="flex flex-col gap-2">
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground md:gap-2 md:text-xs">
                  <span className={cn('size-2 rounded-full', dot)} />{name}
                </div>
                {(cards.length ? cards : ['Nothing yet']).map((c) => (
                  <div key={c} className={cn('rounded-lg border bg-card p-2 text-xs font-medium md:p-3 md:text-[13px]', name === 'Shipped' && 'border-status-shipped/60')}>{c}</div>
                ))}
              </div>
            ))}
          </div>
        </Cell>
        <Cell title="Everyone hears" desc="The agent writes the changelog entry and it goes live the moment Kane passes. Voters see their idea land.">
          <div className="w-full max-w-[440px] rounded-xl border bg-card p-5">
            <div className="flex items-center gap-2.5">
              <span className="grid size-5 place-items-center rounded-full bg-status-shipped text-background"><CircleCheck className="size-3.5" /></span>
              <span className="text-[15px] font-medium">{latest?.title ?? 'Your first verified release'}</span>
            </div>
            <p className="mt-3 line-clamp-3 text-[13px] leading-relaxed text-muted-foreground">{latest?.body ?? 'The first passing run lands here.'}</p>
            <div className="mt-4 flex items-center justify-between gap-2 border-t pt-3 text-xs">
              <span className="inline-flex items-center gap-1.5 text-status-shipped"><BadgeCheck className="size-3.5" />Verified with Kane CLI</span>
              {latest && <span className="text-faint">{shortDate(latest.createdAt)}</span>}
            </div>
          </div>
        </Cell>
      </div>
    </Framed>
  )
}

function QueueRow({ post, hot }: { post: Post; hot: boolean }) {
  return (
    <div className={cn('flex w-full items-center gap-4 rounded-xl border px-5 py-4', hot ? 'border-input bg-secondary' : 'bg-card')}>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[15px] font-medium">{post.title}</div>
        <div className="mt-1 text-xs text-faint">{STATUS_LABEL[post.status]}</div>
      </div>
      <div className={cn('flex w-12 shrink-0 flex-col items-center rounded-lg py-1.5 text-sm font-medium tabular-nums', hot ? 'bg-brand text-white' : 'border border-input bg-accent')}>
        <ChevronUp className="size-3" strokeWidth={2.5} />
        {hot ? <NumberTicker value={post.votes} startValue={Math.max(0, post.votes - 9)} className="tracking-normal text-current dark:text-current" /> : post.votes}
      </div>
    </div>
  )
}

function Cell({ title, desc, children }: { title: string; desc: string; children: ReactNode }) {
  return (
    <div className="relative flex min-h-[400px] flex-col items-start justify-end p-0.5 before:absolute before:top-0 before:-left-0.5 before:z-10 before:h-screen before:w-px before:bg-border before:content-[''] after:absolute after:-top-0.5 after:left-0 after:z-10 after:h-px after:w-screen after:bg-border after:content-[''] md:min-h-[520px]">
      <div className="relative flex size-full max-h-[320px] flex-1 items-center justify-center overflow-hidden p-4 md:max-h-[380px] md:p-6">{children}</div>
      <div className="flex flex-col gap-2 p-6">
        <h3 className="text-lg font-semibold tracking-tighter">{title}</h3>
        <p className="text-muted-foreground">{desc}</p>
      </div>
    </div>
  )
}
