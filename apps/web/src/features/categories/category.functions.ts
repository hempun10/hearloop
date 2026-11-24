import { createServerFn } from '@tanstack/react-start'
import { authMiddleware } from '#/middleware/auth'
import { addCategorySchema, categoryRefSchema, editCategorySchema, tagNameSchema } from './category.schema'

export const createCategory = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .validator(addCategorySchema)
  .handler(async ({ data: { org, ...c }, context: { user } }) => {
    const { requireMembership } = await import('#/features/orgs/org.server')
    const { addCategory } = await import('./category.server')
    return addCategory((await requireMembership(org, user.id)).id, c)
  })

export const updateCategory = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .validator(editCategorySchema)
  .handler(async ({ data: { org, id, ...c }, context: { user } }) => {
    const { requireMembership } = await import('#/features/orgs/org.server')
    const { editCategory } = await import('./category.server')
    return editCategory((await requireMembership(org, user.id)).id, id, c)
  })

export const deleteCategory = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .validator(categoryRefSchema)
  .handler(async ({ data, context: { user } }) => {
    const { requireMembership } = await import('#/features/orgs/org.server')
    const { removeCategory } = await import('./category.server')
    return removeCategory((await requireMembership(data.org, user.id)).id, data.id)
  })

// tags live with posts; members also add and remove them here, ahead of use
export const createTag = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .validator(tagNameSchema)
  .handler(async ({ data, context: { user } }) => {
    const { requireMembership } = await import('#/features/orgs/org.server')
    const { addTag } = await import('#/features/posts/post.server')
    const name = await addTag((await requireMembership(data.org, user.id)).id, data.name)
    if (!name) throw new Error('Use letters or numbers in a tag.')
    return name
  })

export const removeTag = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .validator(tagNameSchema)
  .handler(async ({ data, context: { user } }) => {
    const { requireMembership } = await import('#/features/orgs/org.server')
    const { deleteTag } = await import('#/features/posts/post.server')
    return deleteTag((await requireMembership(data.org, user.id)).id, data.name)
  })
