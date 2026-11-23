import { AnimatedSpan, Terminal, TypingAnimation } from '@hearloop/ui/components/magic/terminal'
import { Framed, SectionHeader } from './frame'

const BULLETS = [
  ['Picks the top request', 'The loop reads the board through the API and takes the most voted open post.'],
  ['Builds it with Claude Code', 'The agent edits the repo, runs the build and writes the Kane objective that should prove the change.'],
  ['Proves it with Kane CLI', 'Kane drives a real browser through that objective and returns pass or fail with every step.'],
  ['Ships, or tries again', "Pass: shipped and announced. Fail: Kane's report goes back to the agent, up to three tries."],
] as const

const FALLBACK = ['Opened the board and found the new control', 'Exercised it the way the request described', 'Checked the result on the page']

export function HowItWorks({ lastPass }: { lastPass: { title: string; steps: string[] } | null }) {
  const steps = lastPass?.steps.length ? lastPass.steps : FALLBACK
  return (
    <Framed id="how">
      <SectionHeader title="One loop, no hand-offs." sub="A script hands the top request to Claude Code, then asks Kane CLI to prove it. Nobody copies a ticket into a sprint." />
      <div className="grid md:grid-cols-[380px_1fr]">
        <dl className="flex flex-col gap-6 border-b p-6 md:border-r md:border-b-0">
          {BULLETS.map(([t, d]) => (
            <div key={t}>
              <dt className="text-[15px] font-medium">{t}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{d}</dd>
            </div>
          ))}
        </dl>
        <div className="min-w-0 p-6">
          <Terminal title="hearloop-v2 — bun run loop" className="min-h-[320px] md:min-h-[400px]">
            <TypingAnimation delay={300}>› bun run loop</TypingAnimation>
            <AnimatedSpan className="text-muted-foreground">● Top request: {lastPass?.title ?? 'the most voted post'}</AnimatedSpan>
            <AnimatedSpan className="pl-4 text-brand">└ claude -p → change built, build passed</AnimatedSpan>
            <AnimatedSpan className="pl-4 text-brand">└ kane-cli run --agent → verifying in a real browser</AnimatedSpan>
            {steps.map((s) => <AnimatedSpan key={s} className="pl-8 text-muted-foreground">· {s}</AnimatedSpan>)}
            <AnimatedSpan className="pl-4 text-status-shipped">└ Kane: passed → post shipped, changelog published</AnimatedSpan>
          </Terminal>
        </div>
      </div>
    </Framed>
  )
}
