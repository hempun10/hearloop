import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { ChevronRight, CircleCheck, CircleX } from 'lucide-react'
import { Button } from '@hearloop/ui/components/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@hearloop/ui/components/collapsible'
import { Panel } from '#/features/dashboard/components/panel'
import { RunReport, RunResult } from '#/features/runs/components/run-result'
import { runsQuery } from '#/features/runs/runs.queries'
import { timeAgo } from '#/lib/format'

export const Route = createFileRoute('/$org/dashboard/runs')({
  loader: ({ context, params }) => context.queryClient.query(runsQuery(params.org)),
  component: Runs,
})

function Runs() {
  const { org } = Route.useParams()
  const { data: runs } = useSuspenseQuery(runsQuery(org))
  const passed = runs.filter((r) => r.passed).length

  return (
    <Panel title="Kane runs" actions={<span className="text-[13px] text-faint tabular-nums">{runs.length} runs · {passed} passed · {runs.length - passed} failed</span>}>
      {runs.length === 0 ? (
        <div className="flex flex-col items-center gap-3 px-6 py-24 text-center">
          <p className="text-[15px] font-semibold">No Kane runs yet</p>
          <p className="max-w-sm text-sm text-muted-foreground">Generate a loop token in Settings and run <code>bun run loop</code>. Every verification lands here.</p>
        </div>
      ) : (
        <ul>
          {runs.map((r) => (
            <Collapsible key={r.id} asChild>
              <li data-testid="run-row" className="group border-b">
                <CollapsibleTrigger className="flex h-[52px] w-full items-center gap-3.5 px-5 text-left hover:bg-accent/50">
                  {r.passed ? <CircleCheck className="size-5 shrink-0 fill-status-shipped text-background" /> : <CircleX className="size-5 shrink-0 fill-status-planned text-background" />}
                  <span className="min-w-0 flex-1 truncate text-[15px] font-medium">{r.title}</span>
                  <RunResult passed={r.passed} className="w-20" />
                  <span className="w-16 text-right text-[12px] text-faint tabular-nums">{timeAgo(r.createdAt)}</span>
                  <ChevronRight className="size-4 text-faint transition-transform group-data-[state=open]:rotate-90" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-5 pb-4 pl-[54px]">
                  <RunReport summary={r.summary} />
                  <Button variant="link" size="sm" className="mt-1 px-0 text-brand" asChild>
                    <a href={`/${org}/posts/${r.postId}`} target="_blank" rel="noreferrer">Open post</a>
                  </Button>
                </CollapsibleContent>
              </li>
            </Collapsible>
          ))}
        </ul>
      )}
    </Panel>
  )
}
