import { useMutation } from '@tanstack/react-query'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { BrandMark } from '@hearloop/ui/components/brand-mark'
import { Button } from '@hearloop/ui/components/button'
import { getConsentRequest } from '#/features/auth/consent.functions'
import { authClient } from '#/lib/auth/auth-client'

// Better Auth sends MCP clients' sign-ins here (mcp({ consentPage })) with a signed query.
export const Route = createFileRoute('/_site/consent')({
  beforeLoad: ({ context: { session }, location }) => {
    if (!session) throw redirect({ to: '/login', search: { next: location.href } })
  },
  loader: () => getConsentRequest({ data: { query: location.search.slice(1) } }),
  ssr: false, // the signed query is read from the address bar
  component: Consent,
})

function Consent() {
  const req = Route.useLoaderData()
  const decide = useMutation({ mutationFn: (accept: boolean) => authClient.oauth2.consent({ accept }) })

  if (!req) {
    return (
      <main className="mx-auto max-w-sm px-4 pt-20">
        <BrandMark className="size-9" />
        <h1 className="mt-6 text-2xl font-semibold">This link is invalid or expired</h1>
        <p className="mt-2 text-sm text-muted-foreground">Start the connection again from your coding agent.</p>
      </main>
    )
  }
  return (
    <main className="mx-auto max-w-sm px-4 pt-20">
      <BrandMark className="size-9" />
      <h1 className="mt-6 text-2xl font-semibold">Allow {req.name} to use hearloop?</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        It acts as you on your boards. It can read requests, claim Planned ones, and report Kane's verdict.
      </p>
      <p className="mt-4 rounded-lg border bg-card p-3 text-xs text-muted-foreground">
        Approval is sent to <span className="font-mono text-foreground">{req.redirectHost}</span>. Only allow it if you just connected this agent yourself.
      </p>
      <div className="mt-6 flex gap-2">
        <Button onClick={() => decide.mutate(true)} disabled={decide.isPending}>Allow</Button>
        <Button variant="ghost" onClick={() => decide.mutate(false)} disabled={decide.isPending}>Deny</Button>
      </div>
      <p className="mt-6 text-xs text-faint">Disconnect it any time in Settings → Loop API tokens.</p>
    </main>
  )
}
