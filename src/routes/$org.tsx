import { Outlet, createFileRoute, notFound } from '@tanstack/react-router'
import { getOrg } from '#/lib/fns'

export const Route = createFileRoute('/$org')({
  loader: async ({ params }) => {
    const r = await getOrg({ data: params.org })
    if (!r) throw notFound()
    return r
  },
  head: ({ loaderData }) => ({ meta: [{ title: loaderData ? `${loaderData.org.name} · hearloop` : 'hearloop' }] }),
  notFoundComponent: () => (
    <main className="mx-auto max-w-[720px] px-4 pt-24 text-center">
      <h1 className="m-0 text-[24px] font-semibold">No board here</h1>
      <p className="mt-2 text-[14px] text-muted">Check the address, or create a board of your own.</p>
    </main>
  ),
  component: Outlet,
})
