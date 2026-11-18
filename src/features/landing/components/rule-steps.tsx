import { SectionHeading } from './section-heading'

const STEPS = [
  ['Post', 'Someone asks for a change and others vote it up.'],
  ['Build', 'The loop hands the top request to the coding agent.'],
  ['Prove', 'Kane CLI runs the agent’s test in a real browser.'],
  ['Ship', 'Pass: shipped and announced. Fail: back to the agent with Kane’s report.'],
] as const

export function RuleSteps() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-28 md:px-8">
      <SectionHeading kicker="The rule" title="Nothing ships unverified." description="Kane's verdict is the only thing that can move a post to shipped." />
      <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border bg-border md:grid-cols-4">
        {STEPS.map(([title, text], i) => (
          <li key={title} className="bg-background p-6">
            <span className="text-xs text-faint tabular-nums">{String(i + 1).padStart(2, '0')}</span>
            <p className="mt-6 text-base font-semibold">{title}</p>
            <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{text}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
