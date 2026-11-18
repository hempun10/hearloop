import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '#/components/ui/button'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '#/components/ui/input-group'
import { useRefreshSession } from '#/features/auth/use-session'
import { createOrg } from '../org.functions'
import { type CreateOrgInput, createOrgSchema, toSlug } from '../org.schema'

export function CreateOrgForm() {
  const navigate = useNavigate()
  const refreshSession = useRefreshSession()
  const form = useForm<CreateOrgInput>({ resolver: zodResolver(createOrgSchema), defaultValues: { name: '', slug: '' } })
  // true once someone types their own address; clearing the address hands it back to the name
  const customSlug = useRef(false)

  async function onSubmit(input: CreateOrgInput) {
    try {
      const org = await createOrg({ data: input })
      await refreshSession()
      await navigate({ to: '/$org/dashboard/settings', params: { org: org.slug }, search: { welcome: true } })
    } catch (e) {
      form.setError('slug', { message: e instanceof Error ? e.message : 'Could not create the board.' })
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8" aria-label="Create board" noValidate>
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="board-name">Board name</FieldLabel>
              <Input
                {...field}
                id="board-name"
                autoFocus
                maxLength={60}
                placeholder="Acme"
                onChange={(e) => {
                  field.onChange(e)
                  if (!customSlug.current) form.setValue('slug', toSlug(e.target.value), { shouldValidate: form.formState.isSubmitted })
                }}
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
        <Controller
          name="slug"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="board-address">Address</FieldLabel>
              <InputGroup>
                <InputGroupAddon><InputGroupText>hearloop/</InputGroupText></InputGroupAddon>
                <InputGroupInput
                  {...field}
                  id="board-address"
                  placeholder="acme"
                  aria-invalid={fieldState.invalid}
                  onChange={(e) => {
                    const slug = toSlug(e.target.value)
                    customSlug.current = slug !== ''
                    field.onChange(slug)
                  }}
                />
              </InputGroup>
              {fieldState.error ? <FieldError role="alert" errors={[fieldState.error]} /> : <FieldDescription>Your board lives at this address.</FieldDescription>}
            </Field>
          )}
        />
        <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Creating' : 'Create board'}
        </Button>
      </FieldGroup>
    </form>
  )
}
