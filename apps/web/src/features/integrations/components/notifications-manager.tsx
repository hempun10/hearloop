import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '@hearloop/ui/components/alert-dialog'
import { Button } from '@hearloop/ui/components/button'
import { FieldError } from '@hearloop/ui/components/field'
import { Input } from '@hearloop/ui/components/input'
import { cn } from '@hearloop/ui/lib/utils'
import { SectionHead } from '#/features/dashboard/components/panel'
import { timeAgo } from '#/lib/format'
import { connect, disconnect, testIntegration } from '../integration.functions'
import { integrationsQuery } from '../integration.queries'
import { INTEGRATIONS, type IntegrationKind, webhookUrlSchema } from '../integration.schema'

const reportTest = (status: string | null) => status === 'ok' ? toast.success('Test message sent') : toast.error(status ?? 'Not connected')

export function NotificationsManager({ org }: { org: string }) {
  return (
    <div>
      {(Object.keys(INTEGRATIONS) as IntegrationKind[]).map((k) => <Destination key={k} org={org} kind={k} />)}
    </div>
  )
}

const HELP: Record<IntegrationKind, string> = {
  slack: 'Create an incoming webhook for the channel in Slack, then paste it here.',
  discord: 'In the channel settings, open Integrations, create a webhook and copy its URL.',
}

function Destination({ org, kind }: { org: string; kind: IntegrationKind }) {
  const qc = useQueryClient()
  const { data } = useSuspenseQuery(integrationsQuery(org))
  const row = data.find((r) => r.kind === kind)
  const { label, example } = INTEGRATIONS[kind]
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')
  const refresh = () => qc.invalidateQueries({ queryKey: integrationsQuery(org).queryKey })
  const save = useMutation({ mutationFn: () => connect({ data: { org, kind, url } }), onSuccess: (s) => { setUrl(''); refresh(); reportTest(s) }, onError: (e) => setError(e.message) })
  const test = useMutation({ mutationFn: () => testIntegration({ data: { org, kind } }), onSuccess: (s) => { refresh(); reportTest(s) } })
  const drop = useMutation({ mutationFn: () => disconnect({ data: { org, kind } }), onSuccess: () => { toast.success(`${label} disconnected`); refresh() } })
  const submit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const r = webhookUrlSchema(kind).safeParse(url)
    if (!r.success) return setError(r.error.issues[0].message)
    setError('')
    save.mutate()
  }

  return (
    <section className="pb-9" aria-labelledby={`int-${kind}`}>
      <SectionHead title={label} right={<DeliveryStatus row={row} />} />
      <form onSubmit={submit} noValidate aria-label={row ? `Replace ${label} webhook` : `Connect ${label}`} className="flex flex-col gap-4 border-t pt-4">
        <p id={`int-${kind}`} className="text-[13px] text-muted-foreground">{HELP[kind]} New requests, status changes and Kane CLI verdicts post to that channel.</p>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-muted-foreground">Webhook URL</span>
          <Input id={`${kind}-url`} value={url} onChange={(e) => setUrl(e.target.value)} spellCheck={false} autoComplete="off" aria-invalid={!!error}
            placeholder={row ? `Connected, ending in …${row.hint}. Paste a new URL to replace it.` : example}
            className="h-8 rounded-lg bg-card px-2.5 text-[13px] shadow-none placeholder:text-faint" />
          {error && <FieldError>{error}</FieldError>}
        </label>
        <div className="flex items-center gap-2">
          <span className="mr-auto" />
          {row && (
            <AlertDialog>
              <AlertDialogTrigger asChild><Button type="button" variant="ghost" size="sm">Disconnect</Button></AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Disconnect {label}?</AlertDialogTitle>
                  <AlertDialogDescription>The board stops posting to that channel. You can connect it again with the webhook URL.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => drop.mutate()}>Disconnect</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          {row && <Button type="button" variant="secondary" size="sm" disabled={test.isPending} onClick={() => test.mutate()}>{test.isPending ? 'Sending' : 'Send test'}</Button>}
          <Button type="submit" size="sm" disabled={save.isPending || !url.trim()}>{save.isPending ? 'Connecting' : row ? 'Replace' : 'Connect'}</Button>
        </div>
      </form>
    </section>
  )
}

function DeliveryStatus({ row }: { row?: { hint: string; lastSentAt: Date | null; lastStatus: string | null } }) {
  if (!row) return <span className="text-xs text-faint">Not connected</span>
  if (!row.lastSentAt) return <span className="text-xs text-faint">Connected, nothing sent yet</span>
  const ok = row.lastStatus === 'ok'
  return (
    <span className="flex max-w-[60%] items-center gap-1.5 text-xs text-faint" title={ok ? undefined : (row.lastStatus ?? undefined)}>
      <span aria-hidden className={cn('size-1.5 shrink-0 rounded-full', ok ? 'bg-status-shipped' : 'bg-destructive')} />
      <span className="truncate tabular-nums">Connected · …{row.hint} · {ok ? `delivered ${timeAgo(row.lastSentAt)}` : `failed ${timeAgo(row.lastSentAt)}: ${row.lastStatus}`}</span>
    </span>
  )
}
