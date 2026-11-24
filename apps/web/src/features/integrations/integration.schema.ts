import { z } from 'zod'
import { orgSlugSchema } from '#/features/orgs/org.schema'

export const INTEGRATIONS = {
  slack: { label: 'Slack', pattern: /^https:\/\/hooks\.slack\.com\/services\/[\w/-]+$/, example: 'https://hooks.slack.com/services/…' },
  discord: { label: 'Discord', pattern: /^https:\/\/(discord|discordapp)\.com\/api\/webhooks\/\d+\/[\w-]+$/, example: 'https://discord.com/api/webhooks/…' },
} as const
export type IntegrationKind = keyof typeof INTEGRATIONS

export const EVENTS = [
  { key: 'posted', label: 'New request' },
  { key: 'commented', label: 'New comment' },
  { key: 'moved', label: 'Status change' },
  { key: 'verified', label: 'Kane CLI verdict' },
] as const
export type EventKey = (typeof EVENTS)[number]['key']
export const EVENT_KEYS = EVENTS.map((e) => e.key) as EventKey[]
export const eventsSchema = z.array(z.enum(['posted', 'commented', 'moved', 'verified'])).min(1, 'Pick at least one event.')
export const integrationKindSchema = z.enum(['slack', 'discord'])

export const webhookUrlSchema = (kind: IntegrationKind) =>
  z.string().trim().regex(INTEGRATIONS[kind].pattern, `Paste a ${INTEGRATIONS[kind].label} incoming webhook URL, like ${INTEGRATIONS[kind].example}`)

export const connectSchema = z.object({ org: orgSlugSchema, kind: integrationKindSchema, url: z.string().trim().max(500), events: eventsSchema.optional() })
  .superRefine((v, ctx) => {
    const r = webhookUrlSchema(v.kind).safeParse(v.url)
    if (!r.success) ctx.addIssue({ code: 'custom', path: ['url'], message: r.error.issues[0].message })
  })
export const kindRefSchema = z.object({ org: orgSlugSchema, kind: integrationKindSchema })
export const setEventsSchema = kindRefSchema.extend({ events: eventsSchema })
