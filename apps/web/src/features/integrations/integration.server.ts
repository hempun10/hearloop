import { waitUntil, env } from 'cloudflare:workers'
import { and, eq } from 'drizzle-orm'
import { db } from '#/db/client.server'
import { integrations, orgs } from '#/db/schema'
import { INTEGRATIONS, type IntegrationKind } from './integration.schema'

export async function listIntegrations(orgId: number) {
  const rows = await db.query.integrations.findMany({ where: eq(integrations.orgId, orgId) })
  // the URL is a secret: show only its end
  return rows.map(({ url, ...r }) => ({ ...r, hint: url.slice(-6) }))
}

export async function connectIntegration(orgId: number, kind: IntegrationKind, url: string) {
  await db.insert(integrations).values({ orgId, kind, url })
    .onConflictDoUpdate({ target: [integrations.orgId, integrations.kind], set: { url, lastStatus: null, lastSentAt: null } })
}

export async function disconnectIntegration(orgId: number, kind: IntegrationKind) {
  const gone = await db.delete(integrations).where(and(eq(integrations.orgId, orgId), eq(integrations.kind, kind))).returning({ id: integrations.id })
  return gone.length > 0
}

// public text goes into a team channel: no mentions, no Slack link or control syntax
const slackSafe = (s: string) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

async function send(row: { id: number; kind: IntegrationKind; url: string }, text: string) {
  const body = row.kind === 'slack' ? { text: slackSafe(text) } : { content: text, allowed_mentions: { parse: [] } }
  let status = 'ok'
  try {
    const r = await fetch(row.url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body), signal: AbortSignal.timeout(5000) })
    if (!r.ok) status = `${INTEGRATIONS[row.kind].label} answered ${r.status}`
  } catch (e) {
    status = e instanceof Error ? e.message : 'failed'
  }
  await db.update(integrations).set({ lastStatus: status, lastSentAt: new Date() }).where(eq(integrations.id, row.id))
  return status
}

export type BoardEvent =
  | { type: 'posted'; id: number; title: string }
  | { type: 'moved'; id: number; title: string; status: string }
  | { type: 'verified'; id: number; title: string; passed: boolean; summary: string }

const STATUS = { open: 'Open', planned: 'Planned', building: 'In progress', shipped: 'Shipped' } as Record<string, string>

function message(e: BoardEvent, board: string, link: string) {
  if (e.type === 'posted') return `New request on ${board}: "${e.title}"\n${link}`
  if (e.type === 'moved') return `"${e.title}" moved to ${STATUS[e.status] ?? e.status} on ${board}${e.status === 'shipped' ? ' (shipped by hand, not verified by Kane CLI)' : ''}\n${link}`
  return e.passed
    ? `Shipped on ${board}: "${e.title}", verified with Kane CLI\n${link}`
    : `Kane CLI failed "${e.title}" on ${board}: ${e.summary.split('\n').find((l) => l.trim() && !/^Kane:/.test(l)) ?? e.summary.split('\n')[0]}\n${link}`
}

/** Posts a board event to the board's Slack and Discord in the background; never slows or fails the request. */
export function notify(orgId: number, e: BoardEvent) {
  waitUntil((async () => {
    const rows = await db.query.integrations.findMany({ where: eq(integrations.orgId, orgId) })
    if (!rows.length) return
    const org = await db.query.orgs.findFirst({ where: eq(orgs.id, orgId), columns: { slug: true, name: true } })
    if (!org) return
    const text = message(e, org.name, `${env.BETTER_AUTH_URL}/${org.slug}/posts/${e.id}`)
    await Promise.all(rows.map((r) => send(r, text)))
  })().catch(() => {}))
}

export async function sendTest(orgId: number, kind: IntegrationKind) {
  const row = await db.query.integrations.findFirst({ where: and(eq(integrations.orgId, orgId), eq(integrations.kind, kind)) })
  if (!row) return null
  const org = await db.query.orgs.findFirst({ where: eq(orgs.id, orgId), columns: { name: true, slug: true } })
  return send(row, `hearloop is connected. ${org?.name} will post new requests, status changes and Kane CLI verdicts here.\n${env.BETTER_AUTH_URL}/${org?.slug}`)
}
