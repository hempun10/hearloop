import { Outlet, createFileRoute } from '@tanstack/react-router'
import { SiteFooter } from '#/components/site-footer'
import { SiteHeader } from '#/components/site-header'

export const Route = createFileRoute('/_site')({
  component: () => (
    <>
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </>
  ),
})
