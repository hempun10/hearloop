import { createFileRoute, redirect } from '@tanstack/react-router'
import { z } from 'zod'
import { AuthForm } from '#/features/auth/components/auth-form'
import { safeRedirect } from '#/lib/safe-redirect'

export const Route = createFileRoute('/_site/login')({
  validateSearch: z.object({ mode: z.literal('signup').optional().catch(undefined), next: z.string().optional() }),
  beforeLoad: ({ context: { session }, search }) => {
    if (session)
      throw redirect({ to: safeRedirect(search.next) ?? (session.orgs[0] ? `/${session.orgs[0].slug}` : '/new') })
  },
  component: function Login() {
    const { mode, next } = Route.useSearch()
    return <AuthForm key={mode ?? 'signin'} mode={mode === 'signup' ? 'signup' : 'signin'} next={next} />
  },
})
