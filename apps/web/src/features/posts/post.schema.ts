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

/** A status key: a built-in kind, or c<id> for one of the board's own. */
const statusKeySchema = z.string().regex(/^(open|planned|building|shipped|c\d+)$/, 'Pick a status.')

// the new-post form: members also pick the status; anyone picks a category and the board's tags
export const composeSchema = newPostSchema.extend({
  categoryId: z.number().int().positive().nullable(),
  status: statusKeySchema,
  tags: z.array(z.string().trim().max(32)).max(5),
})
export type ComposeInput = z.infer<typeof composeSchema>
export const createPostSchema = composeSchema.extend({ org: orgSlugSchema })
export const editPostSchema = postRefSchema.extend(newPostSchema.shape)

export const setStatusKeySchema = postRefSchema.extend({ status: statusKeySchema })
export const setCategorySchema = postRefSchema.extend({ categoryId: z.number().int().positive().nullable() })
/** "u:<user id>" for a member, "a:<token id>" for an agent, null for nobody */
const assigneeKeySchema = z.string().regex(/^(u:.+|a:\d+)$/)
export const setAssigneeSchema = postRefSchema.extend({ assignee: assigneeKeySchema.nullable() })

// what the loop reports after a Kane run (POST /api/:org/posts/:id/runs)
export const recordRunSchema = z.object({
  passed: z.boolean(),
  summary: z.string().max(8000).default(''),
  changelog: z.string().max(4000).optional(),
})
