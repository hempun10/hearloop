import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { SidebarInset, SidebarProvider } from '#/components/ui/sidebar'
import { DashboardSidebar } from '#/features/orgs/components/dashboard-sidebar'

export const Route = createFileRoute('/$org/dashboard')({
  // UX guard only; every dashboard server function re-checks membership
  beforeLoad: ({ context: { session }, params, location }) => {
    if (!session) throw redirect({ to: '/login', search: { next: location.pathname } })
    if (!session.orgs.some((o) => o.slug === params.org)) throw redirect({ to: '/$org', params })
  },
  component: () => (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  ),
})
