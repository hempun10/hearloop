import { z } from 'zod'

// slugs that would shadow app routes
export const RESERVED_SLUGS = ['api', 'login', 'new', 'demo', 'settings', 'admin', 'assets', 'changelog', 'board', 'posts', 'docs', 'mcp', 'consent', 'oauth', 'invite']

export const toSlug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 32)

export const orgSlugSchema = z.string().trim().toLowerCase().min(1).max(64)

export const createOrgSchema = z.object({
  name: z.string().trim().min(1, 'Give your board a name.').max(60),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9][a-z0-9-]{1,30}[a-z0-9]$/, 'Use 3 to 32 lowercase letters, numbers or dashes.')
    .refine((s) => !RESERVED_SLUGS.includes(s), 'That address is reserved. Try another.'),
})
export type CreateOrgInput = z.infer<typeof createOrgSchema>

const optionalUrl = z
  .string()
  .trim()
  .max(500)
  .refine((u) => u === '' || /^https:\/\/[^\s"'<>]+$/.test(u), 'Logo must be an https:// image URL.')

export const orgSettingsSchema = z.object({
  name: z.string().trim().min(1, 'Name can’t be empty.').max(60),
  tagline: z.string().trim().max(160),
  accent: z.string().trim().refine((c) => c === '' || /^#[0-9a-f]{6}$/i.test(c), 'Use a hex colour like #6e8bff.'),
  logoUrl: optionalUrl,
  theme: z.enum(['dark', 'light']),
  poweredBy: z.boolean(),
  showRoadmap: z.boolean(),
  showChangelog: z.boolean(),
  whoCanPost: z.enum(['anyone', 'signed_in']),
})
export type OrgSettings = z.infer<typeof orgSettingsSchema>

export const updateOrgSchema = z.object({ org: orgSlugSchema, settings: orgSettingsSchema })

export const ACCENT_SWATCHES = [
  { name: 'Blue', value: '#6e8bff' },
  { name: 'Green', value: '#7fb894' },
  { name: 'Amber', value: '#e5a65a' },
  { name: 'Red', value: '#e56b6f' },
  { name: 'Violet', value: '#b38bfa' },
  { name: 'Teal', value: '#4fb8b2' },
  { name: 'White', value: '#ededf0' },
] as const
export const DEFAULT_ACCENT = ACCENT_SWATCHES[0].value
