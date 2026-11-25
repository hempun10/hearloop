import { Link } from '@tanstack/react-router'
import { Menu } from 'lucide-react'
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import { useState } from 'react'
import { Button } from '@hearloop/ui/components/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@hearloop/ui/components/sheet'
import { useSession, useSignOut } from '#/features/auth/use-session'
import { PrimaryCta } from '#/features/landing/components/cta'
import { DEMO_ORG } from '#/features/landing/landing.functions'
import { cn } from '@hearloop/ui/lib/utils'
import { BrandMark } from '@hearloop/ui/components/brand-mark'
import { UserMenu } from './user-menu'
import { DOCS_URL } from '#/lib/site'

const LINKS = [
  ['/#how', 'How it works'],
  ['/#loop', 'The loop'],
  ['/#faq', 'FAQ'],
] as const

const linkClass =
  'rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground'

export function SiteHeader() {
  const session = useSession()
  const signOut = useSignOut()
  const reduce = useReducedMotion()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useMotionValueEvent(useScroll().scrollY, 'change', (y) => setScrolled(y > 10))
  const org = session?.orgs[0]?.slug

  return (
    <header
      className={cn(
        'sticky z-50 mx-4 flex justify-center transition-all duration-300 md:mx-0',
        scrolled ? 'top-6' : 'top-4 mx-0',
      )}
    >
      <motion.div
        initial={false}
        animate={{ width: scrolled ? '800px' : '70rem' }}
        transition={reduce ? { duration: 0 } : { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="max-w-full"
      >
        <div
          className={cn(
            'mx-auto max-w-7xl rounded-2xl transition-all duration-300',
            scrolled ? 'border bg-background/75 px-2 backdrop-blur-lg' : 'px-7',
          )}
        >
          <div className="flex h-14 items-center justify-between gap-4 p-4">
            <Link to="/" className="flex items-center gap-2.5 text-[15px] font-semibold tracking-[-0.01em]">
              <BrandMark className="size-[22px]" />
              hearloop
            </Link>
            <nav className="hidden items-center gap-1 md:flex">
              {LINKS.map(([href, label]) => (
                <a key={href} href={href} className={linkClass}>
                  {label}
                </a>
              ))}
              <Link to="/$org" params={{ org: DEMO_ORG }} className={linkClass}>
                Live demo
              </Link>
              <a href={DOCS_URL} className={linkClass}>
                Docs
              </a>
            </nav>
            <div className="flex items-center gap-2">
              {session ? (
                <>
                  <Button variant="soft" size="sm" className="hidden sm:inline-flex" asChild>
                    {org ? (
                      <Link to="/$org" params={{ org }}>
                        Your board
                      </Link>
                    ) : (
                      <Link to="/new">Create your board</Link>
                    )}
                  </Button>
                  <UserMenu user={session.user} onSignOut={signOut} />
                </>
              ) : (
                <>
                  <Button variant="ghost" size="sm" className="text-muted-foreground" asChild>
                    <Link to="/login">Sign in</Link>
                  </Button>
                  <Button variant="soft" size="sm" className="hidden sm:inline-flex" asChild>
                    <Link to="/login" search={{ mode: 'signup' }}>
                      Create your board
                    </Link>
                  </Button>
                </>
              )}
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon-sm" className="md:hidden" aria-label="Menu">
                    <Menu />
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="inset-x-3 bottom-3 mx-auto w-auto rounded-xl border p-4">
                  <SheetTitle className="flex items-center gap-2.5 text-[15px]">
                    <BrandMark className="size-[26px]" />
                    hearloop
                  </SheetTitle>
                  <ul className="flex flex-col rounded-md border text-sm">
                    {LINKS.map(([href, label]) => (
                      <li key={href} className="border-b p-2.5 last:border-b-0">
                        <a
                          href={href}
                          onClick={() => setOpen(false)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          {label}
                        </a>
                      </li>
                    ))}
                    <li className="p-2.5">
                      <Link
                        to="/$org"
                        params={{ org: DEMO_ORG }}
                        onClick={() => setOpen(false)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        Live demo
                      </Link>
                    </li>
                  </ul>
                  <PrimaryCta className="w-full" />
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </motion.div>
    </header>
  )
}
