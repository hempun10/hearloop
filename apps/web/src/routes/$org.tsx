import { Outlet, createFileRoute, notFound } from '@tanstack/react-router'
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '@hearloop/ui/components/empty'
import { orgQuery } from '#/features/orgs/org.queries'

export const Route = createFileRoute('/$org')({
  loader: async ({ context, params }) => {
    const data = await context.queryClient.query(orgQuery(params.org))
    if (!data) throw notFound()
    return { name: data.org.name, logoUrl: data.org.logoUrl }
  },
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData?.name ?? 'hearloop' }],
    links: loaderData?.logoUrl ? [{ rel: 'icon', href: loaderData.logoUrl }] : [],
  }),
  notFoundComponent: () => (
    <Empty className="mt-24">
      <EmptyHeader>
        <EmptyTitle className="text-2xl">No board here</EmptyTitle>
        <EmptyDescription>
          Check the address, or <a href="/login?mode=signup">create a board of your own</a>.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
  component: () => (
    <div className="min-h-screen bg-background text-foreground">
      <Outlet />
    </div>
  ),
})
