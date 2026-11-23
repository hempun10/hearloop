import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@hearloop/ui/components/accordion'
import { SectionHeader } from './frame'

const QUESTIONS = [
  ['What is hearloop?', 'A feedback board: users post requests and vote. The difference is what happens next. The top request is built by a coding agent and tested by Kane CLI before it is marked shipped.'],
  ['What does Kane CLI do here?', 'Kane is the gate. It runs a plain-English test in a real browser against the live app and returns pass or fail with a step-by-step report. That report is attached to the post, so anyone can read how a feature was proven.'],
  ['What happens when Kane fails?', "The post goes back to planned and Kane's report is handed to the agent as the reason. The agent fixes the problem and Kane runs again, up to three attempts."],
  ['Which agent builds the features?', 'Claude Code, run headless by the loop script. The loop only needs a CLI agent that can edit files, so another agent can take its place.'],
  ['Can a person still review the work?', 'Yes. Every shipped change is a normal git commit, and every Kane run is listed on its post with the full report.'],
] as const

export function Faq() {
  return (
    <section id="faq" className="relative flex w-full scroll-mt-20 flex-col items-center gap-10 pb-10">
      <SectionHeader title="Frequently asked, plainly answered." sub="Anything else, post it on the demo board." />
      <Accordion type="single" collapsible defaultValue={QUESTIONS[0][0]} className="mx-auto grid w-full max-w-3xl gap-2 px-6 md:px-10">
        {QUESTIONS.map(([q, a]) => (
          <AccordionItem key={q} value={q} className="grid gap-2 border-b-0">
            <AccordionTrigger className="items-center rounded-lg border bg-accent px-4 py-3.5 text-[15px] font-medium hover:no-underline data-[state=open]:ring-2 data-[state=open]:ring-ring/20">{q}</AccordionTrigger>
            <AccordionContent className="rounded-lg border bg-accent p-3 text-sm leading-relaxed font-medium text-muted-foreground">{a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
