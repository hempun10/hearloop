import { z } from 'zod'
import { POST_STATUSES } from '#/db/schema'
import { orgSlugSchema } from '#/features/orgs/org.schema'

export const postStatusSchema = z.enum(POST_STATUSES)
export const postIdSchema = z.coerce.number().int().positive()

export const postRefSchema = z.object({ org: orgSlugSchema, id: postIdSchema })

export const newPostSchema = z.object({
  title: z.string().trim().min(4, 'Give it a title of a few words.').max(140),
  body: z.string().trim().max(4000),
})
export type NewPostInput = z.infer<typeof newPostSchema>
export const createPostSchema = newPostSchema.extend({ org: orgSlugSchema })

export const setStatusSchema = postRefSchema.extend({ status: postStatusSchema })

// what the loop reports after a Kane run (POST /api/:org/posts/:id/runs)
export const recordRunSchema = z.object({
  passed: z.boolean(),
  summary: z.string().max(8000).default(''),
  changelog: z.string().max(4000).optional(),
})
