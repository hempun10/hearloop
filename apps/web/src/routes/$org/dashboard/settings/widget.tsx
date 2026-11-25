import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import {
  Check,
  CircleHelp,
  Copy,
  ExternalLink,
  Lightbulb,
  Megaphone,
  MessageCircle,
  Moon,
  Sparkles,
  Sun,
  SunMoon,
  type LucideIcon,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@hearloop/ui/components/button'
import { Switch } from '@hearloop/ui/components/switch'
import { cn } from '@hearloop/ui/lib/utils'
import { PageHead, Row, SectionHead } from '#/features/dashboard/components/panel'
import { orgQuery } from '#/features/orgs/org.queries'
import { useOrg } from '#/features/orgs/use-org'
import { saveWidget } from '#/features/widget/widget.functions'
import {
  DEFAULT_ACCENT,
  DEFAULT_WIDGET,
  WIDGET_ICONS,
  WIDGET_LABEL_MAX,
  WIDGET_TABS,
  readWidget,
  type WidgetIcon,
  type WidgetLauncher,
  type WidgetSettings,
  type WidgetTab,
} from '#/features/widget/widget.schema'

export const Route = createFileRoute('/$org/dashboard/settings/widget')({ component: WidgetSettingsPage })

const APP = import.meta.env.VITE_APP_URL as string
type Page = 'install' | 'appearance' | 'content'
const PAGES: [Page, string][] = [
  ['install', 'Install'],
  ['appearance', 'Appearance'],
  ['content', 'Content'],
]

function WidgetSettingsPage() {
  const { org } = useOrg()
  const queryClient = useQueryClient()
  const [page, setPage] = useState<Page>('install')
  const saved = useMemo(() => readWidget(org.widget), [org.widget])
  const [draft, setDraft] = useState<WidgetSettings>(saved)
  // remounts the appearance form so a half-typed hex goes on Discard too
  const [discards, setDiscards] = useState(0)
  const brand = org.accent ?? DEFAULT_ACCENT
  const dirty = JSON.stringify(draft) !== JSON.stringify(saved)
  const set: SetFn = (key, value) => setDraft((d) => ({ ...d, [key]: value }))
  const save = useMutation({
    mutationFn: () => saveWidget({ data: { org: org.slug, settings: draft } }),
    onSuccess: async (next) => {
      setDraft(next)
      await queryClient.invalidateQueries({ queryKey: orgQuery(org.slug).queryKey })
      toast.success('Saved. Sites with the snippet pick it up within a minute.')
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : 'Could not save'),
  })

  return (
    <>
      <PageHead
        title="Widget"
        sub="Put feedback, your roadmap and the changelog inside your own site with one script tag."
      />
      <nav className="-mt-2 mb-6 flex gap-1 border-b" aria-label="Widget settings">
        {PAGES.map(([p, label]) => (
          <button
            key={p}
            type="button"
            onClick={() => setPage(p)}
            aria-current={page === p ? 'page' : undefined}
            className={cn(
              'relative -mb-px h-9 border-b px-3 text-[13px] transition-colors',
              page === p
                ? 'border-foreground font-semibold text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground',
            )}
          >
            {label}
          </button>
        ))}
      </nav>

      {page === 'install' ? (
        <Install board={org.slug} />
      ) : (
        <div className="@container">
          <div className="grid items-start gap-8 @min-[1000px]:grid-cols-[minmax(0,1fr)_440px]">
            <div className="min-w-0">
              {page === 'appearance' ? (
                <Appearance key={discards} draft={draft} set={set} brand={brand} />
              ) : (
                <Content draft={draft} set={set} board={org} />
              )}
              <div className="flex items-center justify-end gap-3 border-t pt-4">
                <span className="text-xs text-faint">{dirty ? 'Unsaved changes' : 'Saved'}</span>
                {dirty && (
                  <Button
                    size="sm"
                    variant="secondary"
                    disabled={save.isPending}
                    onClick={() => {
                      setDraft(saved)
                      setDiscards((n) => n + 1)
                    }}
                  >
                    Discard
                  </Button>
                )}
                <Button size="sm" disabled={!dirty || save.isPending} onClick={() => save.mutate()}>
                  Save
                </Button>
              </div>
            </div>
            <Preview board={org.slug} settings={draft} brand={brand} />
          </div>
        </div>
      )}
    </>
  )
}

function Install({ board }: { board: string }) {
  const [copied, setCopied] = useState(false)
  const snippet = `<script src="${APP}/widget.js" data-board="${board}" async></script>`
  const copy = () =>
    navigator.clipboard.writeText(snippet).then(
      () => {
        setCopied(true)
        toast.success('Copied')
        setTimeout(() => setCopied(false), 1600)
      },
      () => toast.error('Could not copy. Select the code and copy it by hand.'),
    )
  const code = 'font-mono text-[12px] text-foreground'
  return (
    <>
      <SectionHead title="Install code" />
      <div className="mb-8 flex flex-col gap-2.5 border-t pt-4">
        <p className="text-[13px] text-muted-foreground">
          Paste this before the closing body tag on every page that should show the widget. It loads after your page and
          never blocks it. Appearance changes reach it on their own; you never edit the code again.
        </p>
        <div className="flex items-start gap-2 rounded-lg border bg-card p-1.5 pl-3.5">
          <code className="min-w-0 flex-1 py-1.5 font-mono text-[12px]/5 break-all text-foreground">{snippet}</code>
          <Button size="sm" variant="secondary" onClick={copy}>
            {copied ? <Check className="text-status-shipped" /> : <Copy />}
            {copied ? 'Copied' : 'Copy code'}
          </Button>
        </div>
        <div>
          <Button size="sm" variant="outline" asChild>
            <a href={`/widget-demo.html?board=${board}`} target="_blank" rel="noopener">
              <ExternalLink />
              Try it on a test page
            </a>
          </Button>
        </div>
      </div>

      <SectionHead title="Open it from your own button" />
      <div className="mb-8 flex flex-col gap-2.5 border-t pt-4 text-[13px] text-muted-foreground">
        <p>
          Any element with a <code className={code}>data-hearloop-open</code> attribute opens the widget, or call{' '}
          <code className={code}>window.hearloop("open")</code>. Pass a tab to land on it. Set the launcher to Hidden
          under Appearance if your button is the only way in.
        </p>
        <code className="rounded-md bg-card px-2.5 py-1.5 font-mono text-[12px] text-foreground">{`<button data-hearloop-open="changelog">What's new</button>`}</code>
      </div>

      <SectionHead title="Per-page overrides" />
      <div className="flex flex-col gap-2.5 border-t pt-4 text-[13px] text-muted-foreground">
        <p>
          Attributes on the script tag win over the saved settings on that page:{' '}
          <code className={code}>data-theme</code>, <code className={code}>data-accent</code>,{' '}
          <code className={code}>data-launcher</code>, <code className={code}>data-label</code>,{' '}
          <code className={code}>data-icon</code>, <code className={code}>data-position</code>,{' '}
          <code className={code}>data-radius</code>, <code className={code}>data-tabs</code> and{' '}
          <code className={code}>data-open-on-load</code>.
        </p>
      </div>
    </>
  )
}

type SetFn = <K extends keyof WidgetSettings>(key: K, value: WidgetSettings[K]) => void

const SWATCHES = [DEFAULT_ACCENT, '#e5484d', '#f2a93b', '#3ecf8e', '#ededf0']
const ICONS: Record<WidgetIcon, LucideIcon> = {
  chat: MessageCircle,
  lightbulb: Lightbulb,
  megaphone: Megaphone,
  question: CircleHelp,
  sparkle: Sparkles,
}
const ICON_NAMES: Record<WidgetIcon, string> = {
  chat: 'Chat',
  lightbulb: 'Light bulb',
  megaphone: 'Megaphone',
  question: 'Question',
  sparkle: 'Sparkle',
}

function Appearance({ draft, set, brand }: { draft: WidgetSettings; set: SetFn; brand: string }) {
  const accent = draft.accent ?? brand
  const [hex, setHex] = useState(accent)
  useEffect(() => setHex(accent), [accent])
  const LauncherIcon = ICONS[draft.icon]
  return (
    <>
      <Row label="Theme" help="Auto follows the visitor's system setting.">
        <Segmented
          label="Theme"
          value={draft.theme}
          onChange={(v) => set('theme', v)}
          options={[
            ['dark', 'Dark', Moon],
            ['light', 'Light', Sun],
            ['auto', 'Auto', SunMoon],
          ]}
        />
      </Row>
      <Row label="Accent" help="Launcher, buttons and links. Defaults to your brand colour.">
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex flex-wrap gap-1.5">
            {SWATCHES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => set('accent', c === brand ? null : c)}
                aria-label={c}
                aria-pressed={accent === c}
                className={cn(
                  'size-[22px] rounded-full',
                  accent === c && 'ring-2 ring-foreground ring-offset-2 ring-offset-background',
                )}
                style={{ background: c }}
              />
            ))}
          </span>
          <input
            value={hex}
            aria-label="Accent colour"
            aria-invalid={!/^#[0-9a-f]{6}$/i.test(hex.trim()) || undefined}
            onChange={(e) => {
              setHex(e.target.value)
              const v = e.target.value.trim().toLowerCase()
              if (/^#[0-9a-f]{6}$/.test(v)) set('accent', v === brand ? null : v)
            }}
            className="h-8 w-24 rounded-lg border border-input bg-card px-2.5 text-[12px] tabular-nums outline-none focus:border-ring/60 aria-invalid:border-destructive"
          />
        </div>
      </Row>
      <Row label="Launcher" help="The button that opens the widget.">
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Launcher">
          {(
            [
              ['icon', 'Icon'],
              ['label', 'Icon + label'],
              ['hidden', 'Hidden'],
            ] as [WidgetLauncher, string][]
          ).map(([v, name]) => (
            <button
              key={v}
              type="button"
              role="radio"
              aria-checked={draft.launcher === v}
              onClick={() => set('launcher', v)}
              className={cn(
                'flex w-[112px] flex-col gap-2 rounded-xl border bg-card p-1.5 pb-2 text-xs transition-colors',
                draft.launcher === v
                  ? 'border-brand text-foreground'
                  : 'text-muted-foreground hover:border-foreground/20',
              )}
            >
              <span className="flex h-12 items-center justify-center rounded-lg bg-background">
                {v === 'icon' ? (
                  <span
                    className="grid size-7 place-items-center rounded-full"
                    style={{ background: accent, color: inkOn(accent) }}
                  >
                    <LauncherIcon className="size-3.5" strokeWidth={2.5} />
                  </span>
                ) : v === 'label' ? (
                  <span
                    className="flex h-6 max-w-[96px] items-center gap-1 rounded-full px-2 text-[11px] font-semibold"
                    style={{ background: accent, color: inkOn(accent) }}
                  >
                    <LauncherIcon className="size-3 shrink-0" strokeWidth={2.5} />
                    <span className="truncate">{draft.label}</span>
                  </span>
                ) : (
                  <span className="text-[11px] text-faint">Your own button</span>
                )}
              </span>
              {name}
            </button>
          ))}
        </div>
      </Row>
      <Row label="Label and icon" help="Shown on the launcher.">
        <div className="flex flex-wrap items-center gap-2">
          <input
            value={draft.label}
            maxLength={WIDGET_LABEL_MAX}
            aria-label="Launcher label"
            onChange={(e) => set('label', e.target.value)}
            onBlur={() => {
              if (!draft.label.trim()) set('label', DEFAULT_WIDGET.label)
            }}
            className="h-8 w-36 rounded-lg border border-input bg-card px-2.5 text-[13px] outline-none focus:border-ring/60"
          />
          <div
            className="inline-flex h-8 items-center gap-0.5 rounded-lg border bg-card p-0.5"
            role="radiogroup"
            aria-label="Launcher icon"
          >
            {WIDGET_ICONS.map((i) => {
              const I = ICONS[i]
              return (
                <button
                  key={i}
                  type="button"
                  role="radio"
                  aria-checked={draft.icon === i}
                  aria-label={ICON_NAMES[i]}
                  title={ICON_NAMES[i]}
                  onClick={() => set('icon', i)}
                  className={cn(
                    'grid h-full w-7 place-items-center rounded-md transition-colors',
                    draft.icon === i ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  <I className="size-3.5" />
                </button>
              )
            })}
          </div>
        </div>
      </Row>
      <Row label="Position" help="Which corner it sits in.">
        <Segmented
          label="Position"
          value={draft.position}
          onChange={(v) => set('position', v)}
          options={[
            ['bottom-right', 'Bottom right'],
            ['bottom-left', 'Bottom left'],
          ]}
        />
      </Row>
      <Row label="Corner radius" help="Match your site's buttons and cards.">
        <Segmented
          label="Corner radius"
          value={draft.radius}
          onChange={(v) => set('radius', v)}
          options={[
            ['sharp', 'Sharp'],
            ['soft', 'Soft'],
            ['round', 'Round'],
          ]}
        />
      </Row>
    </>
  )
}

const TAB_NAMES: Record<WidgetTab, string> = { feedback: 'Feedback', roadmap: 'Roadmap', changelog: 'Changelog' }

function Content({
  draft,
  set,
  board,
}: {
  draft: WidgetSettings
  set: SetFn
  board: { showRoadmap: boolean; showChangelog: boolean }
}) {
  const hiddenEverywhere = (t: WidgetTab) =>
    (t === 'roadmap' && !board.showRoadmap) || (t === 'changelog' && !board.showChangelog)
  return (
    <>
      <SectionHead title="Tabs" />
      <p className="pb-3 text-[13px] text-muted-foreground">
        Turn off what you don't use. The first one on opens by default.
      </p>
      {WIDGET_TABS.map((t) => {
        const on = draft.tabs.includes(t)
        const last = on && draft.tabs.length === 1
        return (
          <Row
            key={t}
            label={TAB_NAMES[t]}
            help={
              hiddenEverywhere(t)
                ? 'Hidden on your public board too, so the widget skips it. Turn it on under Access.'
                : last
                  ? 'Keep at least one tab on.'
                  : undefined
            }
          >
            <Switch
              checked={on}
              aria-label={TAB_NAMES[t]}
              disabled={last}
              onCheckedChange={(next) =>
                set(
                  'tabs',
                  next
                    ? WIDGET_TABS.filter((x) => x === t || draft.tabs.includes(x))
                    : draft.tabs.filter((x) => x !== t),
                )
              }
            />
          </Row>
        )
      })}
    </>
  )
}

function Segmented<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: T
  onChange: (v: T) => void
  options: [T, string, LucideIcon?][]
}) {
  return (
    <div
      className="inline-flex h-8 items-center gap-0.5 rounded-lg border bg-card p-0.5"
      role="radiogroup"
      aria-label={label}
    >
      {options.map(([v, name, I]) => (
        <button
          key={v}
          type="button"
          role="radio"
          aria-checked={value === v}
          onClick={() => onChange(v)}
          className={cn(
            'inline-flex h-full items-center gap-1.5 rounded-md px-2.5 text-xs transition-colors',
            value === v ? 'bg-secondary font-semibold text-foreground' : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {I && <I className="size-3.5" />}
          {name}
        </button>
      ))}
    </div>
  )
}

/** Dark ink on light accents, white on dark ones; the loader does the same. */
function inkOn(hex: string) {
  const n = parseInt(hex.slice(1, 7), 16)
  return (n >> 16) * 0.299 + ((n >> 8) & 255) * 0.587 + (n & 255) * 0.114 > 150 ? '#08090a' : '#ffffff'
}

// escapes "<" so the saved settings can't close the inline script early
const inlineJson = (v: unknown) => JSON.stringify(v).replaceAll('<', String.fromCharCode(92) + 'u003c')

/** A stand-in host page with the real script on it, opened on load. Unsaved changes reach it through window.hearloop("config"), so it never reloads. */
function Preview({ board, settings, brand }: { board: string; settings: WidgetSettings; brand: string }) {
  const frame = useRef<HTMLIFrameElement>(null)
  const config = useMemo(() => ({ ...settings, accent: settings.accent ?? brand }), [settings, brand])
  const first = useRef(config)
  useEffect(() => {
    const w = frame.current?.contentWindow as
      | (Window & { hearloop?: (cmd: string, arg: unknown) => void })
      | null
      | undefined
    w?.hearloop?.('config', config)
  }, [config])
  const summary = [
    settings.theme,
    settings.launcher === 'label' ? 'icon + label' : settings.launcher === 'icon' ? 'icon' : 'no launcher',
  ].join(' · ')
  const line = (w: number, m = '0 0 12px') =>
    `<div style="height:10px;width:${w}%;border-radius:5px;background:#e6e4de;margin:${m}"></div>`
  const doc = `<!doctype html><html><head><meta charset="utf-8"><style>body{margin:0;font:14px system-ui,sans-serif;background:#fafafb}header{height:48px;border-bottom:1px solid #e6e4de;display:flex;align-items:center;padding:0 20px;gap:10px}main{padding:28px 20px}</style></head><body><header><div style="width:18px;height:18px;border-radius:5px;background:#d8d5cc"></div>${line(12, '0')}</header><main>${line(60)}${line(90)}${line(80)}</main><script>window.hearloop=function(){(window.hearloop.q=window.hearloop.q||[]).push(arguments)};window.hearloop("config",${inlineJson(first.current)})</script><script src="${APP}/widget.js" data-board="${board}" data-open-on-load async></script></body></html>`
  return (
    <div className="@min-[1000px]:sticky @min-[1000px]:top-0">
      <div className="flex items-center justify-between pb-2 text-xs">
        <span className="font-semibold text-muted-foreground">Preview</span>
        <span className="text-faint">{summary}</span>
      </div>
      <div className="overflow-hidden rounded-xl border">
        <iframe ref={frame} title="Widget preview" srcDoc={doc} className="block h-[680px] w-full bg-[#fafafb]" />
      </div>
      <p className="pt-2 text-xs text-faint">Live, against this board. Votes and posts are real.</p>
    </div>
  )
}
