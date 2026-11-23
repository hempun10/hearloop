import { Outlet, createFileRoute, redirect, useLocation } from '@tanstack/react-router'
import { Menu } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@hearloop/ui/components/sheet'
import { AdminRail, AdminSidebar } from '#/features/dashboard/components/admin-nav'
import { NewPostDialog } from '#/features/posts/components/new-post-dialog'
import { postListQuery } from '#/features/posts/post.queries'
import { useSuspenseQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/$org/dashboard')({
  // UX guard only; every dashboard server function re-checks membership
  beforeLoad: ({ context: { session }, params, location }) => {
    if (!session) throw redirect({ to: '/login', search: { next: location.pathname } })
    if (!session.orgs.some((o) => o.slug === params.org)) throw redirect({ to: '/$org', params })
  },
  loader: ({ context, params }) => context.queryClient.query(postListQuery(params.org)),
  component: DashboardLayout,
})

const SIDEBAR_KEY = 'hl:sidebar'

function DashboardLayout() {
  const { org } = Route.useParams()
  const { data: posts } = useSuspenseQuery(postListQuery(org))
  const pathname = useLocation({ select: (l) => l.pathname })
  const [full, setFull] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [composing, setComposing] = useState(false)
  useEffect(() => setFull(localStorage.getItem(SIDEBAR_KEY) !== 'rail'), [])
  useEffect(() => setMobileOpen(false), [pathname])
  const toggle = () => setFull((f) => {
    localStorage.setItem(SIDEBAR_KEY, f ? 'rail' : 'full')
    return !f
  })
  const compose = () => { setMobileOpen(false); setComposing(true) }

  return (
    <div className="flex h-dvh overflow-hidden bg-sidebar text-foreground">
      <aside data-admin-sidebar className="hidden h-full shrink-0 md:flex">
        {full ? <AdminSidebar onNewPost={compose} onToggle={toggle} /> : <AdminRail onNewPost={compose} onToggle={toggle} />}
      </aside>
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <button type="button" aria-label="Open menu" className="fixed top-[22px] left-6 z-40 inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground md:hidden">
            <Menu className="size-5" />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="w-60 gap-0 bg-sidebar p-0">
          <SheetTitle className="sr-only">Dashboard menu</SheetTitle>
          <AdminSidebar onNewPost={compose} />
        </SheetContent>
      </Sheet>
      <div className="flex min-w-0 flex-1 flex-col">
        <Outlet />
      </div>
      <NewPostDialog org={org} posts={posts} open={composing} onOpenChange={setComposing} mustSignIn={false} />
    </div>
  )
}
