import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { VerifiedBadge } from '#/features/changelog/components/verified-badge'
import { changelogQuery } from '#/features/changelog/changelog.queries'
import { NotPublic } from '#/features/orgs/components/not-public'
import { useOrg } from '#/features/orgs/use-org'
import { longDate } from '#/lib/format'

export const Route = createFileRoute('/$org/_public/changelog')({
  loader: ({ context, params }) => context.queryClient.query(changelogQuery(params.org)),
  component: ChangelogPage,
})

function ChangelogPage() {
  const { org } = useOrg()
  const { data: entries } = useSuspenseQuery(changelogQuery(org.slug))
  if (!org.showChangelog) return <NotPublic what="changelog" />
  return (
    <main className="mx-auto max-w-5xl px-4 pt-10 md:px-0">
      <h1 className="text-2xl font-semibold">Changelog</h1>
      <p className="mt-2 mb-10 text-sm text-muted-foreground">Every entry here passed a Kane CLI verification before it was published.</p>
      {entries.length === 0 ? (
        <p className="border-t pt-6 text-sm text-muted-foreground">Nothing shipped yet. The first passing Kane run lands here.</p>
      ) : (
        <ol>
          {entries.map((e) => (
            <li key={e.id} data-testid="entry" className="flex flex-col gap-2 border-t py-8 md:flex-row md:gap-12">
              <time className="w-40 shrink-0 text-[13px] text-muted-foreground tabular-nums">{longDate(e.createdAt)}</time>
              <div className="min-w-0 flex-1 md:max-w-[720px]">
                <h2 className="text-lg font-semibold">{e.title}</h2>
                <p className="mt-2 text-[15px] leading-7 whitespace-pre-wrap text-muted-foreground">{e.body}</p>
                <VerifiedBadge org={org.slug} postId={e.postId} className="mt-4" />
              </div>
            </li>
          ))}
        </ol>
      )}
    </main>
  )
}
