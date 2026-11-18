import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '#/components/ui/accordion'
import { SectionHeading } from './section-heading'

const QUESTIONS = [
  ['What is hearloop?', 'A feedback board: users post requests and vote. The difference is what happens next. The top request is built by a coding agent and tested by Kane CLI before it is marked shipped.'],
  ['What does Kane CLI do here?', 'Kane is the gate. It runs a plain-English test in a real browser against the live app and returns pass or fail with a step-by-step report. That report is attached to the post, so anyone can read how a feature was proven.'],
  ['What happens when Kane fails?', 'The post goes back to planned and Kane’s report is handed to the agent as the reason. The agent fixes the problem and Kane runs again, up to three attempts.'],
  ['Which agent builds the features?', 'Claude Code, run headless by the loop script. The loop only needs a CLI agent that can edit files, so another agent can take its place.'],
  ['Can a person still review the work?', 'Yes. Every shipped change is a normal git commit, and every Kane run is listed on its post with the full report.'],
] as const

export function Faq() {
  return (
    <section className="mx-auto max-w-3xl px-4 pt-28">
      <SectionHeading kicker="FAQ" title="Plainly answered." />
      <Accordion type="single" collapsible className="mt-10 border-t">
        {QUESTIONS.map(([q, a]) => (
          <AccordionItem key={q} value={q}>
            <AccordionTrigger className="py-5 text-[15px]">{q}</AccordionTrigger>
            <AccordionContent className="text-sm leading-7 text-muted-foreground">{a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
