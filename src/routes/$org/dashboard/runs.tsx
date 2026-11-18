import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { ChevronRight, FlaskConical } from 'lucide-react'
import { PageHeader } from '#/components/page-header'
import { Button } from '#/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '#/components/ui/collapsible'
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '#/components/ui/empty'
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
    <>
      <PageHeader title="Kane runs">
        <span className="text-xs text-muted-foreground tabular-nums">{runs.length} runs · {passed} passed · {runs.length - passed} failed</span>
      </PageHeader>
      {runs.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon"><FlaskConical /></EmptyMedia>
            <EmptyTitle>No Kane runs yet</EmptyTitle>
            <EmptyDescription>Generate a loop token in Settings and run <code>bun run loop</code>.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <ul>
          {runs.map((r) => (
            <Collapsible key={r.id} asChild>
              <li data-testid="run-row" className="group border-b">
                <CollapsibleTrigger className="flex h-[52px] w-full items-center gap-3 px-6 text-left hover:bg-card/60">
                  <RunResult passed={r.passed} className="w-20" />
                  <span className="min-w-0 flex-1 truncate text-sm">{r.title}</span>
                  <span className="text-xs text-faint">{timeAgo(r.createdAt)}</span>
                  <ChevronRight className="size-4 text-faint transition-transform group-data-[state=open]:rotate-90" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-6 pb-4">
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
    </>
  )
}
