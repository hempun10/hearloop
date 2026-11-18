import { ArrowRight } from 'lucide-react'
import { Button } from '#/components/ui/button'
import { useSession } from '#/features/auth/use-session'

/** "Go to your board" / "Create your board", depending on who is looking. */
export function PrimaryCta({ className }: { className?: string }) {
  const session = useSession()
  const home = session?.orgs[0]?.slug
  const [href, label] = home ? [`/${home}`, 'Go to your board'] : session ? ['/new', 'Create your board'] : ['/login?mode=signup', 'Create your board']
  return (
    <Button size="lg" className={className} asChild>
      <a href={href}>{label} <ArrowRight /></a>
    </Button>
  )
}
