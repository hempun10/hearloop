import { z } from 'zod'
import { orgSlugSchema } from '#/features/orgs/org.schema'

export const tokenNameSchema = z.object({
  name: z.string().trim().min(1, 'Name it after where it runs, like "Asha\'s laptop" or "GitHub Actions".').max(40),
})
export type TokenNameInput = z.infer<typeof tokenNameSchema>

export const createTokenSchema = tokenNameSchema.extend({ org: orgSlugSchema })
export const revokeTokenSchema = z.object({ org: orgSlugSchema, id: z.number().int().positive() })
