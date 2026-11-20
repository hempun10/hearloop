import { Outlet, createFileRoute } from '@tanstack/react-router'
import { OrgFooter } from '#/features/orgs/components/org-footer'
import { OrgHeader } from '#/features/orgs/components/org-header'

export const Route = createFileRoute('/$org/_public')({
  component: () => (
    <>
      <OrgHeader />
      <Outlet />
      <OrgFooter />
    </>
  ),
})
