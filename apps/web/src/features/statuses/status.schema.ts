import { z } from 'zod'
import { POST_STATUSES } from '#/db/schema'
import { orgSlugSchema } from '#/features/orgs/org.schema'

export const STATUS_SWATCHES = ['#f2b53d', '#b08cff', '#7170ff', '#3ecf8e', '#e0705f', '#5fc8e0', '#ff8fab', '#8a8a93']

const statusFieldsSchema = z.object({
  name: z.string().trim().min(1, 'Name it.').max(32),
  color: z.string().regex(/^#[0-9a-f]{6}$/i, 'Pick a colour.'),
})
export const newStatusSchema = statusFieldsSchema.extend({ kind: z.enum(POST_STATUSES) })
export type NewStatusInput = z.infer<typeof newStatusSchema>

const ref = z.object({ org: orgSlugSchema, id: z.number().int().positive() })
export const addStatusSchema = newStatusSchema.extend({ org: orgSlugSchema })
export const editStatusSchema = ref.extend(statusFieldsSchema.shape)
export const statusRefSchema = ref
export const moveStatusSchema = ref.extend({ dir: z.union([z.literal(-1), z.literal(1)]) })
