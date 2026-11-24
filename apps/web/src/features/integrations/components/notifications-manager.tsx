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
import { Row, fieldClass } from '#/features/dashboard/components/panel'
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

  if (row) {
    return (
      <Row label={label} help={<>Connected · webhook …{row.hint}{row.lastSentAt ? ` · last message ${timeAgo(row.lastSentAt)}: ${row.lastStatus === 'ok' ? 'delivered' : row.lastStatus}` : ''}</>}>
        <div className="flex gap-2">
          <Button variant="soft" size="sm" disabled={test.isPending} onClick={() => test.mutate()}>{test.isPending ? 'Sending' : 'Send test'}</Button>
          <AlertDialog>
            <AlertDialogTrigger asChild><Button variant="ghost" size="sm">Disconnect</Button></AlertDialogTrigger>
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
        </div>
      </Row>
    )
  }
  return (
    <Row label={label} help={`Paste an incoming webhook URL (${example}). New requests, status changes and Kane CLI verdicts post to that channel.`} htmlFor={`${kind}-url`}>
      <form className="flex flex-wrap items-start gap-2" aria-label={`Connect ${label}`} noValidate onSubmit={(e) => {
        e.preventDefault()
        const r = webhookUrlSchema(kind).safeParse(url)
        if (!r.success) return setError(r.error.issues[0].message)
        setError('')
        save.mutate()
      }}>
        <div>
          <Input id={`${kind}-url`} value={url} onChange={(e) => setUrl(e.target.value)} placeholder={example} aria-invalid={!!error} className={fieldClass} />
          {error && <FieldError>{error}</FieldError>}
        </div>
        <Button type="submit" variant="soft" size="sm" disabled={save.isPending}>{save.isPending ? 'Connecting' : 'Connect'}</Button>
      </form>
    </Row>
  )
}
