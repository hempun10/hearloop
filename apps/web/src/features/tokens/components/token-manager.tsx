import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { Copy, KeyRound } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '@hearloop/ui/components/alert-dialog'
import { Button } from '@hearloop/ui/components/button'
import { FieldError } from '@hearloop/ui/components/field'
import { Input } from '@hearloop/ui/components/input'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@hearloop/ui/components/input-group'
import { Row, SectionHead, fieldClass } from '#/features/dashboard/components/panel'
import { timeAgo } from '#/lib/format'
import { createApiToken, revokeApiToken } from '../tokens.functions'
import { tokensQuery } from '../tokens.queries'
import { type TokenNameInput, tokenNameSchema } from '../tokens.schema'

export function TokenManager({ org }: { org: string }) {
  const qc = useQueryClient()
  const { data: tokens } = useSuspenseQuery(tokensQuery(org))
  const refresh = () => qc.invalidateQueries({ queryKey: tokensQuery(org).queryKey })
  const form = useForm<TokenNameInput>({ resolver: zodResolver(tokenNameSchema), defaultValues: { name: '' } })
  const create = useMutation({
    mutationFn: (input: TokenNameInput) => createApiToken({ data: { org, ...input } }),
    onSuccess: () => { form.reset(); refresh() },
    onError: (e) => toast.error(e.message),
  })
  const revoke = useMutation({
    mutationFn: (id: number) => revokeApiToken({ data: { org, id } }),
    onSuccess: () => { toast.success('Token revoked'); refresh() },
    onError: (e) => toast.error(e.message),
  })
  const token = create.data
  const live = tokens.filter((t) => !t.revokedAt)

  async function copy(text: string) {
    await navigator.clipboard.writeText(text)
    toast.success('Copied')
  }

  return (
    <div>
      <SectionHead title="New token" />
      <form onSubmit={form.handleSubmit((v) => create.mutate(v))} aria-label="Create token" noValidate>
        <Controller name="name" control={form.control} render={({ field, fieldState }) => (
          <Row label="Token name" help="One per person or machine, so the board shows who ran the loop." htmlFor="token-name">
            <div className="flex flex-wrap items-start gap-2">
              <div>
                <Input {...field} id="token-name" maxLength={40} placeholder="Asha's laptop" aria-invalid={fieldState.invalid} className={fieldClass} />
                <FieldError errors={[fieldState.error]} />
              </div>
              <Button type="submit" variant="soft" size="sm" disabled={create.isPending}><KeyRound />{create.isPending ? 'Creating' : 'Create token'}</Button>
            </div>
          </Row>
        )} />
      </form>
      {token ? (
        <div className="mb-4 rounded-lg border bg-card p-3">
          <p className="text-xs text-status-planned">Copy it now. You won't see it again.</p>
          <InputGroup className="mt-2">
            <InputGroupInput readOnly value={token} data-testid="token" className="font-mono text-[13px]" aria-label="New token" />
            <InputGroupAddon align="inline-end">
              <InputGroupButton size="icon-xs" aria-label="Copy token" onClick={() => copy(token)}><Copy /></InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>
      ) : null}

      <SectionHead title={`Tokens (${live.length})`} className="pt-5" />
      {live.length === 0 && <p className="border-t py-3.5 text-[13px] text-muted-foreground">No tokens yet.</p>}
      {live.map((t) => (
        <Row
          key={t.id}
          label={t.name}
          help={<>{t.hint === 'mcp' ? 'Connected via MCP' : t.hint ? <span className="font-mono">hl_…{t.hint}</span> : 'Older token'} · {t.createdBy ? `by ${t.createdBy} · ` : ''}{t.lastUsedAt ? `used ${timeAgo(t.lastUsedAt)}` : 'never used'}</>}
        >
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="sm" aria-label={`Revoke ${t.name}`}>Revoke</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Revoke "{t.name}"?</AlertDialogTitle>
                <AlertDialogDescription>Loops using it stop working right away. Other tokens keep working.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => revoke.mutate(t.id)}>Revoke</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Row>
      ))}

      <div className="border-t pt-5">
        <SectionHead title="Run the loop" />
        <pre className="overflow-x-auto rounded-lg bg-card p-3 font-mono text-xs leading-5 text-muted-foreground">
          {`npx hearloop init        # in your repo
HEARLOOP_TOKEN=${token || 'hl_…'} npx hearloop run`}
        </pre>
      </div>
    </div>
  )
}
