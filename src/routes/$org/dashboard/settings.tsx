import { createFileRoute, useLoaderData, useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import OrgLogo from '#/components/OrgLogo'
import { hasToken, regenerateToken, updateOrg } from '#/lib/fns'
import type { Org, OrgPatch } from '#/lib/types'
import { PageHead } from '../dashboard'

export const Route = createFileRoute('/$org/dashboard/settings')({
  validateSearch: (s: Record<string, unknown>): { welcome?: boolean } => (s.welcome ? { welcome: true } : {}),
  loader: async ({ params }) => ({ hasToken: await hasToken({ data: params.org }) }),
  component: Settings,
})

const SWATCHES = ['#6e8bff', '#7fb894', '#e5a65a', '#e56b6f', '#b38bfa', '#4fb8b2', '#ededf0']

function Settings() {
  const { org } = useLoaderData({ from: '/$org' })
  const { hasToken: had } = Route.useLoaderData()
  const { welcome } = Route.useSearch()
  return (
    <>
      <PageHead title="Settings" />
      <div className="max-w-[720px] px-6 pb-24">
        {welcome && (
          <p className="mt-6 rounded-xl border border-line bg-surface p-4 text-[14px] leading-6">
            <span className="font-semibold">{org.name} is live.</span>{' '}
            <span className="text-muted">Make it look like yours, share the board link, then give the loop a token so an agent can build and Kane can verify.</span>
          </p>
        )}
        <OrgForm org={org} />
        <TokenSection org={org} had={had} />
      </div>
    </>
  )
}

function Section({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <section className="mt-10 border-t border-line pt-6">
      <h2 className="m-0 text-[15px] font-semibold">{title}</h2>
      {sub && <p className="mt-1 mb-0 text-[13px] text-muted">{sub}</p>}
      <div className="mt-5 grid gap-5">{children}</div>
    </section>
  )
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1.5 text-[13px] font-medium">
      {label}
      {children}
      {hint && <span className="text-[12px] font-normal text-faint">{hint}</span>}
    </label>
  )
}

const input = 'h-9 w-full rounded-md border border-line bg-surface px-3 text-[14px] font-normal outline-none placeholder:text-faint focus:border-muted'

function Toggle({ checked, onChange, label, hint }: { checked: boolean; onChange: (v: boolean) => void; label: string; hint?: string }) {
  return (
    <label className="flex cursor-pointer items-start gap-3 text-[13px]">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="peer sr-only" />
      <span aria-hidden className={`mt-0.5 flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-link ${checked ? 'bg-link' : 'bg-line-strong'}`}>
        <span className={`size-4 rounded-full bg-white transition-transform ${checked ? 'translate-x-4' : ''}`} />
      </span>
      <span><span className="font-medium">{label}</span>{hint && <span className="block text-[12px] text-faint">{hint}</span>}</span>
    </label>
  )
}

function OrgForm({ org }: { org: Org }) {
  const router = useRouter()
  const [f, setF] = useState<OrgPatch>({
    name: org.name, tagline: org.tagline, accent: org.accent, logo_url: org.logo_url, theme: org.theme,
    powered_by: org.powered_by, show_roadmap: org.show_roadmap, show_changelog: org.show_changelog, who_can_post: org.who_can_post,
  })
  const [state, setState] = useState<'idle' | 'saving' | 'saved'>('idle')
  const [error, setError] = useState('')
  const set = (p: OrgPatch) => { setF((x) => ({ ...x, ...p })); setState('idle') }
  const accent = f.accent || '#6e8bff'

  async function save(e: { preventDefault(): void }) {
    e.preventDefault()
    setError('')
    setState('saving')
    try {
      await updateOrg({ data: { org: org.slug, patch: f } })
      await router.invalidate()
      setState('saved')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save.')
      setState('idle')
    }
  }

  return (
    <form onSubmit={save} aria-label="Board settings">
      <Section title="General">
        <Field label="Board name"><input className={input} required maxLength={60} value={f.name ?? ''} onChange={(e) => set({ name: e.target.value })} /></Field>
        <Field label="Tagline" hint="Shown under the name on your public board.">
          <input className={input} maxLength={160} value={f.tagline ?? ''} onChange={(e) => set({ tagline: e.target.value })} placeholder="Tell us what to build next. We read every post." />
        </Field>
      </Section>

      <Section title="Branding" sub="Your board shows your name, logo and colour instead of hearloop's.">
        <div className="flex items-center gap-4 rounded-xl border border-line bg-surface p-4" data-theme={f.theme} style={{ ['--color-link' as string]: accent }}>
          <OrgLogo org={{ name: f.name || org.name, logo_url: f.logo_url ?? null }} className="size-9" />
          <div className="min-w-0 flex-1">
            <p className="m-0 truncate text-[14px] font-semibold">{f.name || org.name}</p>
            <p className="m-0 truncate text-[12px] text-muted">{f.tagline || 'Preview'}</p>
          </div>
          <span className="flex h-12 w-10 flex-col items-center justify-center rounded-lg border border-link bg-link text-[12px] font-semibold text-white">▲<span>12</span></span>
        </div>
        <Field label="Accent colour" hint="Used for the voted pill, active states and links.">
          <div className="flex flex-wrap items-center gap-2">
            {SWATCHES.map((c) => (
              <button type="button" key={c} onClick={() => set({ accent: c })} aria-label={`Accent ${c}`} aria-pressed={accent === c}
                className={`size-7 rounded-full border-2 ${accent === c ? 'border-fg' : 'border-transparent'}`} style={{ background: c }} />
            ))}
            <input type="color" value={accent} onChange={(e) => set({ accent: e.target.value })} aria-label="Custom accent" className="size-7 cursor-pointer rounded-full border-0 bg-transparent p-0" />
            <input className={`${input} w-28 font-mono text-[13px]`} value={f.accent ?? ''} onChange={(e) => set({ accent: e.target.value })} placeholder="#6e8bff" aria-label="Accent hex" />
          </div>
        </Field>
        <Field label="Logo URL" hint="A square image over https. Leave empty to use your initial.">
          <input className={input} type="url" value={f.logo_url ?? ''} onChange={(e) => set({ logo_url: e.target.value })} placeholder="https://acme.com/logo.png" />
        </Field>
        <Field label="Theme">
          <div className="flex w-fit rounded-lg border border-line p-0.5" role="radiogroup" aria-label="Theme">
            {(['dark', 'light'] as const).map((t) => (
              <button type="button" key={t} role="radio" aria-checked={f.theme === t} onClick={() => set({ theme: t })}
                className={`h-8 rounded-md px-4 text-[13px] capitalize ${f.theme === t ? 'bg-hover font-semibold text-fg' : 'text-muted'}`}>{t}</button>
            ))}
          </div>
        </Field>
        <Toggle checked={!!f.powered_by} onChange={(v) => set({ powered_by: v ? 1 : 0 })} label="Show “Powered by hearloop”" hint="A small line in your board's footer." />
      </Section>

      <Section title="Access">
        <Field label="Who can post">
          <select className={input} value={f.who_can_post} onChange={(e) => set({ who_can_post: e.target.value as Org['who_can_post'] })}>
            <option value="anyone">Anyone, no account needed</option>
            <option value="signed_in">Only signed-in people</option>
          </select>
        </Field>
        <Toggle checked={!!f.show_roadmap} onChange={(v) => set({ show_roadmap: v ? 1 : 0 })} label="Public roadmap" />
        <Toggle checked={!!f.show_changelog} onChange={(v) => set({ show_changelog: v ? 1 : 0 })} label="Public changelog" />
      </Section>

      <div className="sticky bottom-0 mt-8 flex items-center gap-3 border-t border-line bg-bg/90 py-4 backdrop-blur">
        {error && <span role="alert" className="text-[13px] text-planned">{error}</span>}
        {state === 'saved' && <span className="text-[13px] text-shipped">Saved</span>}
        <button disabled={state === 'saving'} className="ml-auto h-9 rounded-md bg-fg px-4 text-[13px] font-semibold text-bg hover:opacity-90 disabled:opacity-50">
          {state === 'saving' ? 'Saving' : 'Save changes'}
        </button>
      </div>
    </form>
  )
}

function TokenSection({ org, had }: { org: Org; had: boolean }) {
  const [token, setToken] = useState('')
  const [busy, setBusy] = useState(false)
  const origin = typeof window === 'undefined' ? '' : window.location.origin

  async function generate() {
    if (had && !token && !confirm('The old token stops working right away. Continue?')) return
    setBusy(true)
    setToken(await regenerateToken({ data: org.slug }))
    setBusy(false)
  }

  return (
    <Section title="Loop API token" sub="The loop uses this to move posts to building and record Kane's verdict. It's shown once; only a hash is kept.">
      {token ? (
        <div className="rounded-lg border border-line bg-surface p-3">
          <p className="m-0 text-[12px] text-planned">Copy it now. You won't see it again.</p>
          <code className="mt-2 block font-mono text-[13px] break-all" data-testid="token">{token}</code>
        </div>
      ) : (
        <p className="m-0 text-[13px] text-faint">{had ? 'A token is set.' : 'No token yet.'}</p>
      )}
      <button type="button" onClick={generate} disabled={busy}
        className="h-9 w-fit rounded-md border border-line-strong bg-raised px-3 text-[13px] font-semibold hover:bg-hover disabled:opacity-50">
        {busy ? 'Generating' : had || token ? 'Regenerate token' : 'Generate token'}
      </button>
      <div>
        <p className="mt-2 mb-2 text-[12px] font-medium text-muted">Run the loop</p>
        <pre className="m-0 overflow-x-auto rounded-lg bg-surface p-3 font-mono text-[12px] leading-5 text-muted">{`APP_URL=${origin} ORG=${org.slug} API_TOKEN=${token || '<token>'} bun run loop`}</pre>
      </div>
    </Section>
  )
}
