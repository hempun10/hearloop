import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { DEMO_ORG } from '../landing.functions'
import { PrimaryCta } from './cta-link'
import { LoopTerminal } from './loop-terminal'

export function Hero({ lastPass }: { lastPass: { title: string; summary: string } | null }) {
  return (
    <section className="relative">
      <div className="dot-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="hero-glow pointer-events-none absolute inset-x-0 top-0 h-[480px]" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 pt-20 text-center md:px-8 md:pt-28">
        <Link to="/$org/changelog" params={{ org: DEMO_ORG }}
          className="type-in inline-flex items-center gap-2 rounded-full border border-input bg-card/80 py-1 pr-3 pl-1.5 text-xs text-muted-foreground hover:text-foreground">
          <Badge className="bg-brand/15 text-brand">New</Badge>
          Every shipped item is verified with Kane CLI
          <ArrowRight className="size-3" />
        </Link>
        <h1 className="type-in mx-auto mt-6 max-w-3xl text-[44px] leading-[1.05] font-semibold sm:text-[64px]" style={{ animationDelay: '80ms' }}>
          Feedback that ships itself.
          <span className="block text-muted-foreground">Proven before it's announced.</span>
        </h1>
        <p className="type-in mx-auto mt-6 max-w-xl text-base leading-7 text-muted-foreground" style={{ animationDelay: '160ms' }}>
          Users post and vote. A coding agent builds the top request. Kane CLI tests it in a real browser. Only a passing run reaches the changelog.
        </p>
        <div className="type-in mt-8 flex flex-wrap justify-center gap-3" style={{ animationDelay: '240ms' }}>
          <PrimaryCta />
          <Button variant="outline" size="lg" asChild>
            <Link to="/$org" params={{ org: DEMO_ORG }}>Try the live demo</Link>
          </Button>
        </div>
        <LoopTerminal run={lastPass} />
      </div>
    </section>
  )
}
