import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { Copy, UserPlus } from 'lucide-react'
import { toast } from 'sonner'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '@hearloop/ui/components/alert-dialog'
import { Button } from '@hearloop/ui/components/button'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@hearloop/ui/components/input-group'
import { useSession } from '#/features/auth/use-session'
import { Row, SectionHead } from '#/features/dashboard/components/panel'
import { timeAgo } from '#/lib/format'
import { cancelInvite, dropMember, makeInvite } from '../team.functions'
import { teamQuery } from '../team.queries'

export function TeamManager({ org }: { org: string }) {
  const qc = useQueryClient()
  const session = useSession()
  const { data } = useSuspenseQuery(teamQuery(org))
  const refresh = () => qc.invalidateQueries({ queryKey: teamQuery(org).queryKey })
  const invite = useMutation({ mutationFn: () => makeInvite({ data: { org } }), onSuccess: refresh, onError: (e) => toast.error(e.message) })
  const cancel = useMutation({ mutationFn: (id: number) => cancelInvite({ data: { org, id } }), onSuccess: () => { toast.success('Invite link cancelled'); refresh() } })
  const remove = useMutation({ mutationFn: (userId: string) => dropMember({ data: { org, userId } }), onSuccess: () => { toast.success('Member removed'); refresh() }, onError: (e) => toast.error(e.message) })
  const link = invite.data ? `${window.location.origin}/invite/${invite.data}` : ''

  return (
    <div>
      <SectionHead title="Invite" />
      <Row label="Invite link" help="Anyone who opens it and signs in joins this board as a member. It works once and expires in 7 days.">
        <Button variant="soft" size="sm" disabled={invite.isPending} onClick={() => invite.mutate()}><UserPlus />{invite.isPending ? 'Creating' : 'Create invite link'}</Button>
      </Row>
      {link && (
        <div className="mb-4 rounded-lg border bg-card p-3">
          <p className="text-xs text-status-planned">Copy it now and send it to your teammate. You won't see it again.</p>
          <InputGroup className="mt-2">
            <InputGroupInput readOnly value={link} data-testid="invite-link" className="font-mono text-[13px]" aria-label="Invite link" />
            <InputGroupAddon align="inline-end">
              <InputGroupButton size="icon-xs" aria-label="Copy invite link" onClick={async () => { await navigator.clipboard.writeText(link); toast.success('Copied') }}><Copy /></InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>
      )}

      <SectionHead title={`Members (${data.members.length})`} className="pt-5" />
      {data.members.map((m) => (
        <Row key={m.id} label={m.name || m.email} help={m.email}>
          {m.id === session?.user.id ? <span className="text-[13px] text-muted-foreground">You</span> : (
            <AlertDialog>
              <AlertDialogTrigger asChild><Button variant="ghost" size="sm" aria-label={`Remove ${m.name || m.email}`}>Remove</Button></AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Remove {m.name || m.email}?</AlertDialogTitle>
                  <AlertDialogDescription>They lose the dashboard for this board right away. Their comments and votes stay.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => remove.mutate(m.id)}>Remove</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </Row>
      ))}

      {data.invites.length > 0 && (
        <>
          <SectionHead title={`Open invite links (${data.invites.length})`} className="pt-5" />
          {data.invites.map((i) => (
            <Row key={i.id} label={`Created ${timeAgo(i.createdAt)}${i.by ? ` by ${i.by}` : ''}`} help={`Expires ${timeAgo(i.expiresAt)}`}>
              <Button variant="ghost" size="sm" onClick={() => cancel.mutate(i.id)}>Cancel link</Button>
            </Row>
          ))}
        </>
      )}
    </div>
  )
}
