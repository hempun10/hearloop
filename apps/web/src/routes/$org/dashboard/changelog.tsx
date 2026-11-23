import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { CircleCheck, ExternalLink, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '@hearloop/ui/components/alert-dialog'
import { Button } from '@hearloop/ui/components/button'
import { deleteChangelogEntry } from '#/features/changelog/changelog.functions'
import { changelogQuery } from '#/features/changelog/changelog.queries'
import { Panel } from '#/features/dashboard/components/panel'
import { longDate, timeAgo } from '#/lib/format'

export const Route = createFileRoute('/$org/dashboard/changelog')({
  loader: ({ context, params }) => context.queryClient.query(changelogQuery(params.org)),
  component: DashboardChangelog,
})

function DashboardChangelog() {
  const { org } = Route.useParams()
  const qc = useQueryClient()
  const { data: entries } = useSuspenseQuery(changelogQuery(org))
  const remove = useMutation({
    mutationFn: (id: number) => deleteChangelogEntry({ data: { org, id } }),
    onSuccess: () => { toast.success('Removed from the changelog'); qc.invalidateQueries({ queryKey: changelogQuery(org).queryKey }) },
    onError: (e) => toast.error(e.message),
  })

  return (
    <Panel title="Changelog" actions={
      <Button variant="soft" size="sm" asChild>
        <a href={`/${org}/changelog`} target="_blank" rel="noreferrer"><ExternalLink className="size-3.5" />View public page</a>
      </Button>
    }>
      {entries.length === 0 ? (
        <div className="flex flex-col items-center gap-3 px-6 py-24 text-center">
          <p className="text-[15px] font-semibold">Nothing shipped yet</p>
          <p className="max-w-sm text-sm text-muted-foreground">An entry appears when a request ships. Ones a Kane run shipped are marked Verified with Kane CLI.</p>
        </div>
      ) : (
        <ul>
          {entries.map((e) => (
            <li key={e.id} className="group flex h-[52px] shrink-0 items-center gap-3.5 border-b px-5 hover:bg-card/60">
              <CircleCheck className="size-5 shrink-0 fill-status-shipped text-background" />
              <span className="min-w-0 truncate text-[16px] font-medium">{e.title}</span>
              {e.verified
                ? <span className="hidden shrink-0 rounded-md bg-status-shipped/15 px-2 py-0.5 text-[12px] font-medium text-status-shipped sm:inline">Verified with Kane CLI</span>
                : <span className="hidden shrink-0 rounded-md bg-secondary px-2 py-0.5 text-[12px] font-medium text-muted-foreground sm:inline">Shipped by hand</span>}
              <span className="flex-1" />
              <time className="text-[12px] text-faint tabular-nums" title={longDate(e.createdAt)}>{timeAgo(e.createdAt)}</time>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon-sm" aria-label={`Remove ${e.title}`} className="size-7 text-faint opacity-0 group-hover:opacity-100 focus-visible:opacity-100"><Trash2 /></Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Remove “{e.title}” from the public changelog?</AlertDialogTitle>
                    <AlertDialogDescription>The post stays shipped.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => remove.mutate(e.id)}>Remove</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  )
}
