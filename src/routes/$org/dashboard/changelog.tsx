import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { ScrollText } from 'lucide-react'
import { toast } from 'sonner'
import { PageHeader } from '#/components/page-header'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '#/components/ui/alert-dialog'
import { Button } from '#/components/ui/button'
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from '#/components/ui/empty'
import { deleteChangelogEntry } from '#/features/changelog/changelog.functions'
import { changelogQuery } from '#/features/changelog/changelog.queries'
import { longDate } from '#/lib/format'

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
    <>
      <PageHeader title="Changelog">
        <Button variant="link" size="sm" className="text-brand" asChild>
          <a href={`/${org}/changelog`} target="_blank" rel="noreferrer">View public page</a>
        </Button>
      </PageHeader>
      <p className="border-b px-6 py-3 text-[13px] text-muted-foreground">Entries are written by the agent and published only when Kane CLI passes. You can remove one here.</p>
      {entries.length === 0 ? (
        <Empty><EmptyHeader><EmptyMedia variant="icon"><ScrollText /></EmptyMedia><EmptyTitle>Nothing shipped yet</EmptyTitle></EmptyHeader></Empty>
      ) : (
        <ul>
          {entries.map((e) => (
            <li key={e.id} className="flex gap-6 border-b px-6 py-5">
              <time className="w-28 shrink-0 text-xs text-faint tabular-nums">{longDate(e.createdAt)}</time>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{e.title}</p>
                <p className="mt-1 text-[13px] leading-6 text-muted-foreground">{e.body}</p>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild><Button variant="outline" size="xs">Remove</Button></AlertDialogTrigger>
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
    </>
  )
}
