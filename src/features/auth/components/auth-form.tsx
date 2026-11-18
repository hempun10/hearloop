import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from '@tanstack/react-router'
import { Controller, useForm } from 'react-hook-form'
import { BrandMark } from '#/components/brand-mark'
import { Button } from '#/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { authClient } from '#/lib/auth/auth-client'
import { safeRedirect } from '#/lib/safe-redirect'
import { type AuthInput, signInSchema, signUpSchema } from '../auth.schema'
import { useRefreshSession } from '../use-session'

export function AuthForm({ mode, next }: { mode: 'signin' | 'signup'; next?: string }) {
  const signup = mode === 'signup'
  const navigate = useNavigate()
  const refreshSession = useRefreshSession()
  const form = useForm<AuthInput>({
    resolver: zodResolver(signup ? signUpSchema : signInSchema),
    defaultValues: { name: '', email: '', password: '' },
  })

  async function onSubmit({ name, email, password }: AuthInput) {
    const res = signup
      ? await authClient.signUp.email({ email, password, name: name || email.split('@')[0] })
      : await authClient.signIn.email({ email, password })
    if (res.error) return form.setError('root', { message: res.error.message ?? 'Something went wrong. Try again.' })
    const session = await refreshSession()
    const home = session?.orgs[0] ? `/${session.orgs[0].slug}` : '/new'
    await navigate({ to: safeRedirect(next) ?? home })
  }

  return (
    <main className="mx-auto max-w-sm px-4 pt-20">
      <BrandMark className="size-9" />
      <h1 className="mt-6 text-2xl font-semibold">{signup ? 'Create your account' : 'Sign in'}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{signup ? 'Then name your board. It takes a minute.' : 'Welcome back.'}</p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8" aria-label={signup ? 'Sign up' : 'Sign in'} noValidate>
        <FieldGroup>
          {signup && (
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input {...field} id="name" autoComplete="name" placeholder="Ada Lovelace" />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
          )}
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input {...field} id="email" type="email" autoComplete="email" placeholder="you@company.com" aria-invalid={fieldState.invalid} />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  {...field}
                  id="password"
                  type="password"
                  autoComplete={signup ? 'new-password' : 'current-password'}
                  placeholder={signup ? 'At least 8 characters' : ''}
                  aria-invalid={fieldState.invalid}
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
          {form.formState.errors.root && <FieldError role="alert">{form.formState.errors.root.message}</FieldError>}
          <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'One moment' : signup ? 'Create account' : 'Sign in'}
          </Button>
        </FieldGroup>
      </form>

      <p className="mt-6 text-sm text-muted-foreground">
        {signup ? 'Already have an account? ' : 'New to hearloop? '}
        <Link to="/login" search={{ mode: signup ? undefined : 'signup', next }} className="font-medium text-foreground hover:underline">
          {signup ? 'Sign in' : 'Create an account'}
        </Link>
      </p>
    </main>
  )
}
