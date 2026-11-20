import { cn } from '@hearloop/ui/lib/utils'
import { Eyebrow, Framed } from './frame'

const MOMENTS = [
  ['01', 'Post', 'Anyone posts an idea. Votes push the most wanted one to the top.'],
  ['02', 'Build', 'The loop hands the top request to Claude Code, which builds it and writes the test.'],
  ['03', 'Prove', 'Kane CLI runs that test in a real browser against the live app.'],
  ['04', 'Ship', "Pass: shipped, with Kane's report on the post. Fail: back to the agent."],
] as const

type Stats = { posts: number; votes: number; runs: number; shipped: number }

export function LoopStory({ stats }: { stats: Stats }) {
  const numbers = [['Requests', stats.posts], ['Votes', stats.votes], ['Kane runs', stats.runs], ['Shipped', stats.shipped]] as const
  return (
    <Framed id="loop">
      <div className="grid divide-y md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:divide-x md:divide-y-0">
        <div className="flex flex-col gap-4 p-6">
          <Eyebrow>The loop</Eyebrow>
          <h2 className="max-w-[20ch] text-3xl font-medium tracking-tighter text-balance md:text-4xl">Feedback tools go quiet after collection.</h2>
          <div className="flex max-w-[60ch] flex-col gap-4 leading-relaxed text-pretty text-muted-foreground">
            <p>A user writes an idea, it lands in a backlog, and that is the last they hear. hearloop treats every post as the start of a loop, not the end of one.</p>
            <p>Nothing reaches the changelog without a passing Kane run, so "shipped" always means someone, or something, clicked through it in a browser first.</p>
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-4">
            {numbers.map(([label, n]) => (
              <div key={label} className="bg-background p-4">
                <dd className="text-2xl font-medium tracking-tight tabular-nums">{n}</dd>
                <dt className="mt-1 text-xs text-muted-foreground">{label} on the demo</dt>
              </div>
            ))}
          </dl>
        </div>
        <ol className="flex flex-col p-6">
          {MOMENTS.map(([n, t, d], i) => (
            <li key={n} className={cn('flex gap-5 py-5 first:pt-0 last:pb-0', i < MOMENTS.length - 1 && 'border-b')}>
              <span className="pt-0.5 text-[13px] text-brand tabular-nums">{n}</span>
              <div>
                <p className="text-base font-medium">{t}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Framed>
  )
}
