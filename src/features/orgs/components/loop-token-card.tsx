import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Copy, KeyRound } from 'lucide-react'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '#/components/ui/alert-dialog'
import { Button } from '#/components/ui/button'
import { Row, SectionHead } from '#/features/dashboard/components/panel'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '#/components/ui/input-group'
import type { PublicOrg } from '../org.server'
import { rotateLoopToken } from '../org.functions'
import { orgQuery } from '../org.queries'

export function LoopTokenCard({ org }: { org: PublicOrg }) {
  const qc = useQueryClient()
  const rotate = useMutation({
    mutationFn: () => rotateLoopToken({ data: { org: org.slug } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: orgQuery(org.slug).queryKey }),
    onError: (e) => toast.error(e.message),
  })
  const token = rotate.data
  const origin = typeof window === 'undefined' ? '' : window.location.origin
  const label = rotate.isPending ? 'Generating' : org.hasToken || token ? 'Regenerate token' : 'Generate token'

  async function copy(text: string) {
    await navigator.clipboard.writeText(text)
    toast.success('Copied')
  }

  return (
    <div>
      <SectionHead title="Token" />
      <Row label={org.hasToken ? 'A token is set' : 'No token yet'} help="Regenerating stops the old token right away.">
        {org.hasToken ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="soft" size="sm" disabled={rotate.isPending}><KeyRound />{label}</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Regenerate the loop token?</AlertDialogTitle>
                <AlertDialogDescription>The old token stops working right away. Update it wherever the loop runs.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => rotate.mutate()}>Regenerate</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <Button variant="soft" size="sm" disabled={rotate.isPending} onClick={() => rotate.mutate()}><KeyRound />{label}</Button>
        )}
      </Row>
      {token ? (
        <div className="mb-4 rounded-lg border bg-card p-3">
          <p className="text-xs text-status-planned">Copy it now. You won't see it again.</p>
          <InputGroup className="mt-2">
            <InputGroupInput readOnly value={token} data-testid="token" className="font-mono text-[13px]" aria-label="Loop token" />
            <InputGroupAddon align="inline-end">
              <InputGroupButton size="icon-xs" aria-label="Copy token" onClick={() => copy(token)}><Copy /></InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>
      ) : null}

      <div className="border-t pt-5">
        <SectionHead title="Run the loop" />
        <pre className="overflow-x-auto rounded-lg bg-card p-3 font-mono text-xs leading-5 text-muted-foreground">
          {`APP_URL=${origin} ORG=${org.slug} API_TOKEN=${token || '<token>'} bun run loop`}
        </pre>
      </div>
    </div>
  )
}
