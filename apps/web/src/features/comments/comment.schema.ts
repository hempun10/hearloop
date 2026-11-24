import { z } from 'zod'
import { postRefSchema } from '#/features/posts/post.schema'

export const newCommentSchema = z.object({
  body: z.string().trim().min(1, 'Write something first.').max(4000),
  internal: z.boolean(),
})
export type NewCommentInput = z.infer<typeof newCommentSchema>
export const addCommentSchema = postRefSchema.extend(newCommentSchema.shape)
