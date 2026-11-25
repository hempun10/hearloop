import { z } from 'zod'

// How the embeddable widget looks and which tabs it shows, saved per board in orgs.widget.
// public/widget.js reads them from /api/:org/widget, so a change reaches every site without
// touching the snippet; data-* attributes on the script tag still win.

const WIDGET_THEMES = ['dark', 'light', 'auto'] as const
export const WIDGET_LAUNCHERS = ['icon', 'label', 'hidden'] as const
export const WIDGET_ICONS = ['chat', 'lightbulb', 'megaphone', 'question', 'sparkle'] as const
const WIDGET_POSITIONS = ['bottom-right', 'bottom-left'] as const
const WIDGET_RADII = ['sharp', 'soft', 'round'] as const
export const WIDGET_TABS = ['feedback', 'roadmap', 'changelog'] as const
export const WIDGET_LABEL_MAX = 24
export const DEFAULT_ACCENT = '#7170ff'
/** The panel's --radius for each corner setting. */
export const RADIUS_CSS = { sharp: '0.25rem', soft: '0.5rem', round: '0.75rem' } as const

export type WidgetIcon = (typeof WIDGET_ICONS)[number]
export type WidgetLauncher = (typeof WIDGET_LAUNCHERS)[number]
export type WidgetTab = (typeof WIDGET_TABS)[number]

export const widgetSettingsSchema = z.object({
  theme: z.enum(WIDGET_THEMES),
  // null follows the board's accent
  accent: z
    .string()
    .regex(/^#[0-9a-fA-F]{6}$/, 'Use a hex colour like #7170ff')
    .transform((s) => s.toLowerCase())
    .nullable(),
  launcher: z.enum(WIDGET_LAUNCHERS),
  label: z
    .string()
    .trim()
    .min(1, 'The label needs some text')
    .max(WIDGET_LABEL_MAX, `At most ${WIDGET_LABEL_MAX} characters`),
  icon: z.enum(WIDGET_ICONS),
  position: z.enum(WIDGET_POSITIONS),
  radius: z.enum(WIDGET_RADII),
  // in display order; the first one opens by default
  tabs: z
    .array(z.enum(WIDGET_TABS))
    .min(1, 'Keep at least one tab on')
    .transform((t) => WIDGET_TABS.filter((name) => t.includes(name))),
})
export type WidgetSettings = z.output<typeof widgetSettingsSchema>

export const saveWidgetSchema = z.object({ org: z.string(), settings: widgetSettingsSchema })

export const DEFAULT_WIDGET: WidgetSettings = {
  theme: 'dark',
  accent: null,
  launcher: 'icon',
  label: 'Feedback',
  icon: 'chat',
  position: 'bottom-right',
  radius: 'soft',
  tabs: [...WIDGET_TABS],
}

/** Whatever is stored, field by field: a bad or missing value falls back to its default instead of losing the rest. */
export function readWidget(stored: unknown): WidgetSettings {
  const raw = stored && typeof stored === 'object' ? (stored as Record<string, unknown>) : {}
  const out: Record<string, unknown> = { ...DEFAULT_WIDGET }
  for (const [key, field] of Object.entries(widgetSettingsSchema.shape)) {
    const parsed = key in raw ? field.safeParse(raw[key]) : null
    if (parsed?.success) out[key] = parsed.data
  }
  return out as WidgetSettings
}

type BoardLike = { accent: string | null; showRoadmap: boolean; showChangelog: boolean; widget?: unknown }

/** The tabs a visitor gets: the widget's choice minus what the board hides everywhere. Never empty. */
export function widgetTabs(org: BoardLike, s = readWidget(org.widget)): WidgetTab[] {
  const tabs = s.tabs.filter((t) => (t === 'roadmap' ? org.showRoadmap : t === 'changelog' ? org.showChangelog : true))
  return tabs.length ? tabs : ['feedback']
}

/** The public body of /api/:org/widget. Safe for any site. */
export function widgetMeta(org: BoardLike & { name: string }, latestChangelogAt: number | null) {
  const s = readWidget(org.widget)
  const tabs = widgetTabs(org, s)
  return {
    name: org.name,
    accent: s.accent ?? org.accent ?? DEFAULT_ACCENT,
    theme: s.theme,
    launcher: s.launcher,
    label: s.label,
    icon: s.icon,
    position: s.position,
    radius: s.radius,
    tabs,
    changelog: tabs.includes('changelog'),
    latestChangelogAt: tabs.includes('changelog') ? latestChangelogAt : null,
  }
}
