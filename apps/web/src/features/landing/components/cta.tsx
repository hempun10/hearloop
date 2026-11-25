import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { Button } from '@hearloop/ui/components/button'
import { useSession } from '#/features/auth/use-session'
import { cn } from '@hearloop/ui/lib/utils'

/** The inset arrow square on the old primary button. */
export function ArrowBox() {
  return (
    <i
      aria-hidden
      className="pointer-events-none absolute inset-y-1 right-1 grid w-[30px] place-items-center rounded-md bg-black/[.08] shadow-[inset_0_1px_1px_rgba(0,0,0,.12)]"
    >
      <ArrowRight className="size-[13px]" strokeWidth={2.5} />
    </i>
  )
}

/** Sign up, create a board, or open your dashboard, depending on who is looking. */
export function PrimaryCta({ className }: { className?: string }) {
  const session = useSession()
  const org = session?.orgs[0]?.slug
  const label = (
    <>
      {org ? 'Go to dashboard' : 'Create your board'}
      <ArrowBox />
    </>
  )
  return (
    <Button variant="cta" size="lg" className={cn('pr-[46px]', className)} asChild>
      {org ? (
        <Link to="/$org/dashboard" params={{ org }}>
          {label}
        </Link>
      ) : session ? (
        <Link to="/new">{label}</Link>
      ) : (
        <Link to="/login" search={{ mode: 'signup' }}>
          {label}
        </Link>
      )}
    </Button>
  )
}
