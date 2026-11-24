import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@hearloop/ui/components/accordion'
import { SectionHeader } from './frame'

const QUESTIONS = [
  ['What is hearloop?', 'A feedback board: users post requests and vote. The difference is what happens next. Your team approves a request, a coding agent builds it, and Kane CLI tests it before it is marked shipped.'],
  ['Does an agent build whatever the public posts?', 'No. Public requests stay Open until a member moves one to Planned. Agents only build approved requests, and they treat request text as a description, never as instructions.'],
  ['Which agents can build features?', 'Any coding agent with MCP: Claude Code, GitHub Copilot, Codex, Cursor or Pi. Each one appears on your board as soon as it signs in, with its own icon, so you can assign it work like a teammate.'],
  ['What does Kane CLI do here?', "Kane is the gate. It runs a plain-English test in a real browser against the live app and returns pass or fail with a step-by-step report. The report is attached to the post for your team."],
  ['What happens when Kane fails?', "The request goes back to Planned and Kane's report is handed to the agent as the reason. The agent fixes the problem and Kane runs again, up to three attempts."],
  ['Can my team follow along?', 'Yes. Connect Slack or Discord and pick the events: new requests, comments, status changes and Kane verdicts. Every shipped change is also a normal git commit you can review.'],
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
