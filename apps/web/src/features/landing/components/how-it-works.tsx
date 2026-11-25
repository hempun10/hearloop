import { AnimatedSpan, Terminal, TypingAnimation } from '@hearloop/ui/components/magic/terminal'
import { Framed, SectionHeader } from './frame'

const BULLETS = [
  [
    'Your team approves it',
    'Public requests stay Open. A member moves one to Planned and assigns it to a teammate or a coding agent.',
  ],
  [
    'The agent claims it over MCP',
    'Claude Code, Copilot, Codex, Cursor or Pi signs in to your board, claims the request so nobody else builds it, and makes the change.',
  ],
  [
    'Kane CLI proves it',
    'The agent writes a plain-English objective. Kane drives a real browser through it and returns pass or fail with every step.',
  ],
  [
    'Ships, or tries again',
    "Pass: shipped, on the changelog, and posted to Slack or Discord. Fail: back to Planned with Kane's report, up to three tries.",
  ],
] as const

const FALLBACK = [
  'Opened the board and found the new control',
  'Exercised it the way the request described',
  'Checked the result on the page',
]

export function HowItWorks({ lastPass }: { lastPass: { title: string; steps: string[] } | null }) {
  const steps = lastPass?.steps.length ? lastPass.steps : FALLBACK
  return (
    <Framed id="how">
      <SectionHeader
        title="One loop, no hand-offs."
        sub="You approve and assign. Your coding agent picks the work up over MCP, then asks Kane CLI to prove it. Nobody copies a ticket into a sprint."
      />
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
          <Terminal title="Claude Code — hearloop MCP" className="min-h-[320px] md:min-h-[400px]">
            <TypingAnimation delay={300}>› Build the request assigned to you</TypingAnimation>
            <AnimatedSpan className="text-muted-foreground">
              ● list_requests assigned_to_me → {lastPass?.title ?? 'the approved request'}
            </AnimatedSpan>
            <AnimatedSpan className="pl-4 text-brand">└ claim_request → Building, assigned to Claude Code</AnimatedSpan>
            <AnimatedSpan className="pl-4 text-brand">└ change built, build passed</AnimatedSpan>
            <AnimatedSpan className="pl-4 text-brand">
              └ kane-cli run --agent → verifying in a real browser
            </AnimatedSpan>
            {steps.map((s) => (
              <AnimatedSpan key={s} className="pl-8 text-muted-foreground">
                · {s}
              </AnimatedSpan>
            ))}
            <AnimatedSpan className="pl-4 text-status-shipped">
              └ report_verification: passed → shipped, changelog published
            </AnimatedSpan>
          </Terminal>
        </div>
      </div>
    </Framed>
  )
}
