import { z } from 'zod'
import { orgSlugSchema } from '#/features/orgs/org.schema'

export const tokenNameSchema = z.object({
  name: z.string().trim().min(1, 'Name it after where it runs, like "Asha\'s laptop" or "GitHub Actions".').max(40),
})
export type TokenNameInput = z.infer<typeof tokenNameSchema>

export const createTokenSchema = tokenNameSchema.extend({ org: orgSlugSchema })
export const revokeTokenSchema = z.object({ org: orgSlugSchema, id: z.number().int().positive() })
// a small PNG, JPEG or WebP the browser has already shrunk to 64px; ~45 KB is plenty
export const agentIconSchema = z.string().max(60_000).regex(/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/, 'Use a PNG, JPEG or WebP image.')
export const setTokenIconSchema = revokeTokenSchema.extend({ icon: agentIconSchema.nullable() })
