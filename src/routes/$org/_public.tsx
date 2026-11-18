import { Outlet, createFileRoute, useLoaderData } from '@tanstack/react-router'
import { BoardHints } from '#/components/Footer'
import OrgHeader from '#/components/OrgHeader'

export const Route = createFileRoute('/$org/_public')({
  component: () => (
    <>
      <OrgHeader />
      <Outlet />
      <OrgFooter />
    </>
  ),
})

function OrgFooter() {
  const { org } = useLoaderData({ from: '/$org' })
  return (
    <footer className="mt-24 pb-12">
      <BoardHints />
      {!!org.powered_by && (
        <p className="mt-4 text-center text-[12px] text-faint">
          <a href="/" className="hover:text-muted">Powered by hearloop</a> · every shipped item verified with Kane CLI
        </p>
      )}
    </footer>
  )
}
