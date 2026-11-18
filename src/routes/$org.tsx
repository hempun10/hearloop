import { Outlet, createFileRoute, notFound } from '@tanstack/react-router'
import type { CSSProperties } from 'react'
import { getOrg } from '#/lib/fns'

export const Route = createFileRoute('/$org')({
  loader: async ({ params }) => {
    const r = await getOrg({ data: params.org })
    if (!r) throw notFound()
    return r
  },
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData ? loaderData.org.name : 'hearloop' }],
    links: loaderData?.org.logo_url ? [{ rel: 'icon', href: loaderData.org.logo_url }] : [],
  }),
  notFoundComponent: () => (
    <main className="mx-auto max-w-[720px] px-4 pt-24 text-center">
      <h1 className="m-0 text-[24px] font-semibold">No board here</h1>
      <p className="mt-2 text-[14px] text-muted">Check the address, or <a href="/login?mode=signup" className="text-link">create a board of your own</a>.</p>
    </main>
  ),
  component: OrgShell,
})

// everything under /<org> wears the org's theme and accent, not hearloop's
function OrgShell() {
  const { org } = Route.useLoaderData()
  const style = org.accent ? ({ '--color-link': org.accent } as CSSProperties) : undefined
  return (
    <div data-theme={org.theme} style={style} className="min-h-screen bg-bg text-fg">
      <Outlet />
    </div>
  )
}
