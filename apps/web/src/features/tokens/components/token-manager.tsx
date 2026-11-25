import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { Copy, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
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
} from '@hearloop/ui/components/alert-dialog'
import { Button } from '@hearloop/ui/components/button'
import { FieldError } from '@hearloop/ui/components/field'
import { Input } from '@hearloop/ui/components/input'
import { cn } from '@hearloop/ui/lib/utils'
import { AgentIcon } from '#/components/agent-icon'
import { SectionHead } from '#/features/dashboard/components/panel'
import { timeAgo } from '#/lib/format'
import { createApiToken, revokeApiToken, setAgentIcon } from '../tokens.functions'
import { tokensQuery } from '../tokens.queries'
import { type TokenNameInput, tokenNameSchema } from '../tokens.schema'

export function TokenManager({ org }: { org: string }) {
  const qc = useQueryClient()
  const { data: tokens } = useSuspenseQuery(tokensQuery(org))
  const refresh = () =>
    Promise.all([
      qc.invalidateQueries({ queryKey: tokensQuery(org).queryKey }),
      qc.invalidateQueries({ queryKey: ['team', org] }),
    ])
  const form = useForm<TokenNameInput>({ resolver: zodResolver(tokenNameSchema), defaultValues: { name: '' } })
  const create = useMutation({
    mutationFn: (input: TokenNameInput) => createApiToken({ data: { org, ...input } }),
    onSuccess: () => {
      form.reset()
      refresh()
    },
    onError: (e) => toast.error(e.message),
  })
  const revoke = useMutation({
    mutationFn: (id: number) => revokeApiToken({ data: { org, id } }),
    onSuccess: () => {
      toast.success('Token revoked')
      refresh()
    },
    onError: (e) => toast.error(e.message),
  })
  const icon = useMutation({
    mutationFn: (v: { id: number; icon: string | null }) => setAgentIcon({ data: { org, ...v } }),
    onSuccess: (_, v) => {
      toast.success(v.icon ? 'Icon updated' : 'Default icon restored')
      refresh()
    },
    onError: (e) => toast.error(e.message),
  })
  const live = tokens.filter((t) => !t.revokedAt)
  const name = form.register('name')

  return (
    <>
      <form
        onSubmit={form.handleSubmit((v) => create.mutate(v))}
        aria-label="Create token"
        noValidate
        className="flex flex-col gap-1.5 pb-6"
      >
        <div className="flex flex-wrap items-center gap-2">
          <Input
            {...name}
            id="token-name"
            aria-label="Token name"
            maxLength={40}
            placeholder="Token name, e.g. Claude on my laptop"
            aria-invalid={!!form.formState.errors.name}
            className="h-8 flex-1 rounded-lg bg-card px-2.5 text-[13px] shadow-none"
          />
          <Button type="submit" size="sm" disabled={create.isPending}>
            <Plus className="size-3" />
            {create.isPending ? 'Creating' : 'Create token'}
          </Button>
        </div>
        <FieldError errors={[form.formState.errors.name]} />
      </form>

      <Connect org={org} fresh={create.data ?? null} onDone={() => create.reset()} />

      <SectionHead
        title="Agents and tokens"
        right={<span className="text-xs text-faint tabular-nums">{live.length}</span>}
      />
      {live.length === 0 && (
        <p className="border-t py-4 text-sm text-faint">
          No tokens yet. Connect an agent above, or create a token for a script.
        </p>
      )}
      {live.map((t) => (
        <div key={t.id} data-testid="token-row" className="flex flex-wrap items-center gap-3 border-t py-2.5">
          <AgentIcon name={t.name} icon={t.icon} className="size-7" />
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="text-[13px] font-semibold">{t.name}</span>
            <span className="text-[11px] text-faint">
              {t.hint === 'mcp' ? (
                'Connected via MCP'
              ) : t.hint ? (
                <span className="font-mono">hl_…{t.hint}</span>
              ) : (
                'Older token'
              )}
              {t.createdBy ? ` · by ${t.createdBy}` : ''}
            </span>
          </div>
          <span className="text-xs text-faint">{t.lastUsedAt ? `used ${timeAgo(t.lastUsedAt)}` : 'never used'}</span>
          <span className="text-xs text-faint">created {timeAgo(t.createdAt)}</span>
          <label className="inline-flex h-7 cursor-pointer items-center rounded-md px-2.5 text-[13px] font-medium text-muted-foreground hover:bg-accent hover:text-foreground focus-within:ring-1 focus-within:ring-ring">
            Upload icon
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="sr-only"
              aria-label={`Upload icon for ${t.name}`}
              onChange={async (e) => {
                const f = e.target.files?.[0]
                e.target.value = ''
                if (f) icon.mutate({ id: t.id, icon: await toIcon(f) })
              }}
            />
          </label>
          {t.icon && (
            <Button variant="ghost" size="sm" onClick={() => icon.mutate({ id: t.id, icon: null })}>
              Use default
            </Button>
          )}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="sm" aria-label={`Revoke ${t.name}`}>
                Revoke
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Revoke "{t.name}"?</AlertDialogTitle>
                <AlertDialogDescription>
                  Anything using it stops working right away, and requests assigned to it are unassigned. Other tokens
                  keep working.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => revoke.mutate(t.id)}>Revoke</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ))}
      <p className="pt-6 pb-8 text-xs text-faint">
        Send a token as a Bearer token to call the HTTP API:{' '}
        <code className="font-mono">{`/api/${org}/posts?status=planned`}</code>. Agents on MCP sign in with your account
        instead and appear here on first use.
      </p>
    </>
  )
}

function copy(text: string) {
  navigator.clipboard.writeText(text).then(
    () => toast.success('Copied'),
    () => toast.error('Could not copy. Select the text and copy it by hand.'),
  )
}

function CopyBlock({ label, help, text }: { label: string; help: string; text: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-end justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-[13px] font-semibold">{label}</span>
          <span className="text-xs text-muted-foreground">{help}</span>
        </div>
        <Button size="sm" variant="secondary" onClick={() => copy(text)} aria-label={`Copy: ${label}`}>
          <Copy className="size-3" />
          Copy
        </Button>
      </div>
      <div className="max-h-36 overflow-y-auto rounded-md bg-background px-2.5 py-2 text-[12px]/5 wrap-anywhere whitespace-pre-wrap select-all">
        {text}
      </div>
    </div>
  )
}

const AGENTS = [
  { id: 'claude', label: 'Claude Code' },
  { id: 'cursor', label: 'Cursor' },
  { id: 'codex', label: 'Codex' },
  { id: 'other', label: 'Other' },
] as const
type Agent = (typeof AGENTS)[number]['id']

/** What an agent does once connected; step 1 differs per agent. */
const setupPrompt = (
  org: string,
  connect: string,
  origin: string,
) => `Connect hearloop, our feedback board, and use it for this project.

1. ${connect}
   If the hearloop tools do not show up yet, tell me to restart you, then continue from step 2.
2. Sign in when your client asks. Then call list_boards and check that "${org}" is there.
3. Save hearloop.json in the repo root: {"board": "${origin}/${org}", "app": "<this app's URL>"}. Ask me for the app URL.
4. list_requests with assigned_to_me: true shows the work handed to you. Ask me before building anything.`

/** Connecting an agent over MCP (OAuth, no token needed); a token just created shows here once. */
function Connect({ org, fresh, onDone }: { org: string; fresh: string | null; onDone: () => void }) {
  const [agent, setAgent] = useState<Agent>('claude')
  const [origin, setOrigin] = useState('')
  useEffect(() => setOrigin(window.location.origin), [])
  const url = `${origin}/mcp`
  const claude = `claude mcp add --transport http hearloop ${url}`
  const cursorLink = `cursor://anysphere.cursor-deeplink/mcp/install?name=hearloop&config=${origin ? btoa(JSON.stringify({ url })) : ''}`
  const codex = `[mcp_servers.hearloop]\nurl = "${url}"`
  return (
    <div
      className={cn(
        'mb-6 flex flex-col rounded-lg border',
        fresh ? 'border-status-shipped/30 bg-status-shipped/5' : 'bg-card',
      )}
    >
      <div className="flex items-start justify-between gap-3 px-4 pt-3.5 pb-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-[13px] font-semibold">
            {fresh ? "Your token is ready. Copy it now; you won't see it again." : 'Connect your AI agent'}
          </span>
          <span className="text-xs text-muted-foreground">
            {fresh
              ? 'Use it as a Bearer token for the HTTP API or a script.'
              : 'Agents connect over MCP and sign in with your account. Once connected, they show up below and can be assigned requests.'}
          </span>
        </div>
        {fresh && (
          <Button size="sm" variant="ghost" onClick={onDone}>
            Done
          </Button>
        )}
      </div>
      {fresh ? (
        <div className="border-t px-4 py-3.5">
          <CopyBlock label="New token" help="Shown once; only a hash is kept." text={fresh} />
        </div>
      ) : (
        <>
          <div className="flex gap-1 border-y px-3 py-1.5" role="tablist" aria-label="Agent">
            {AGENTS.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={agent === id}
                onClick={() => setAgent(id)}
                className={cn(
                  'inline-flex h-7 items-center gap-1.5 rounded-md px-2.5 text-xs transition-colors',
                  agent === id
                    ? 'bg-secondary font-semibold text-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {id !== 'other' && <AgentIcon name={label} className="size-4 bg-transparent ring-0" />}
                {label}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-4 px-4 py-3.5">
            {agent === 'claude' && (
              <>
                <CopyBlock
                  label="Send this to Claude Code"
                  help="Paste it into a new chat in your project. Claude connects hearloop and checks the board."
                  text={setupPrompt(org, `Add the hearloop MCP server: run  ${claude}`, origin)}
                />
                <CopyBlock
                  label="Or connect it yourself"
                  help="Run in a terminal, then restart Claude Code and sign in from /mcp."
                  text={claude}
                />
              </>
            )}
            {agent === 'cursor' && (
              <>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[13px] font-semibold">Add to Cursor</span>
                    <span className="text-xs text-muted-foreground">
                      Opens Cursor and installs the hearloop server.
                    </span>
                  </div>
                  <Button size="sm" asChild>
                    <a href={cursorLink}>
                      <AgentIcon name="Cursor" className="size-4 bg-transparent ring-0" />
                      Add to Cursor
                    </a>
                  </Button>
                </div>
                <CopyBlock
                  label="Then send this to Cursor"
                  help="Paste it into Agent chat in your project."
                  text={setupPrompt(
                    org,
                    'The hearloop MCP server is installed in Cursor. Check its tools are available.',
                    origin,
                  )}
                />
              </>
            )}
            {agent === 'codex' && (
              <>
                <CopyBlock
                  label="Add to ~/.codex/config.toml"
                  help="Then restart Codex and sign in when it asks."
                  text={codex}
                />
                <CopyBlock
                  label="Then send this to Codex"
                  help="Paste it into Codex in your project."
                  text={setupPrompt(
                    org,
                    'The hearloop MCP server is in ~/.codex/config.toml. Check its tools are available.',
                    origin,
                  )}
                />
              </>
            )}
            {agent === 'other' && (
              <>
                <CopyBlock label="Server URL" help="Streamable HTTP MCP server with OAuth sign-in." text={url} />
                <CopyBlock
                  label="Then send this to your agent"
                  help="Any agent with MCP support."
                  text={setupPrompt(org, `Add an HTTP MCP server named hearloop with URL ${url}`, origin)}
                />
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}

/** Shrinks an image to a 64px square (cover) as WebP, so it fits in the database. */
async function toIcon(file: File) {
  const img = await createImageBitmap(file)
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 64
  const s = Math.min(img.width, img.height)
  canvas.getContext('2d')!.drawImage(img, (img.width - s) / 2, (img.height - s) / 2, s, s, 0, 0, 64, 64)
  return canvas.toDataURL('image/webp', 0.9)
}
