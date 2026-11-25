import { createFileRoute, redirect } from '@tanstack/react-router'
import { BackButton } from '#/components/back-button'
import { CreateOrgForm } from '#/features/orgs/components/create-org-form'

export const Route = createFileRoute('/_site/new')({
  beforeLoad: ({ context: { session } }) => {
    if (!session) throw redirect({ to: '/login', search: { mode: 'signup', next: '/new' } })
  },
  component: () => (
    <main className="mx-auto max-w-md px-4 pt-20">
      <BackButton />
      <h1 className="text-2xl font-semibold">Name your board</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Your users post and vote here. You can change the name later.
      </p>
      <CreateOrgForm />
    </main>
  ),
})
