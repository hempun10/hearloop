import { z } from 'zod'
import { orgSlugSchema } from '#/features/orgs/org.schema'

export const categoryFieldsSchema = z.object({
  name: z.string().trim().min(1, 'Name it.').max(40),
  description: z.string().trim().max(160),
})
export type CategoryFields = z.infer<typeof categoryFieldsSchema>

const ref = z.object({ org: orgSlugSchema, id: z.number().int().positive() })
export const addCategorySchema = categoryFieldsSchema.extend({ org: orgSlugSchema })
export const editCategorySchema = ref.extend(categoryFieldsSchema.shape)
export const categoryRefSchema = ref
export const tagNameSchema = z.object({ org: orgSlugSchema, name: z.string().trim().min(1, 'Name it.').max(32) })
