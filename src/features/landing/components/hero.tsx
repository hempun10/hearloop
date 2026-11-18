import { Link } from '@tanstack/react-router'
import { BadgeCheck, Bot, Cloud } from 'lucide-react'
import { BlurFade } from '#/components/magic/blur-fade'
import { BorderBeam } from '#/components/magic/border-beam'
import { Button } from '#/components/ui/button'
import { DEMO_ORG } from '../landing.functions'
import { PrimaryCta } from './cta'

const BUILT_WITH = [['Claude Code', Bot], ['Kane CLI', BadgeCheck], ['Cloudflare Workers', Cloud]] as const

export function Hero() {
  return (
    <section id="hero" className="relative w-full">
      <div className="relative flex w-full flex-col items-center px-6">
        <div aria-hidden className="absolute inset-0 -z-10 h-[600px] w-full rounded-b-xl [background:radial-gradient(125%_125%_at_50%_10%,var(--background)_40%,color-mix(in_oklch,var(--brand)_28%,transparent)_100%)] md:h-[800px]" />
        <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center gap-8 pt-24 md:gap-10 md:pt-32">
          <div className="flex flex-col items-center gap-5">
            <BlurFade>
              <h1 className="text-center text-[28px] font-medium tracking-tighter text-balance sm:text-4xl md:text-5xl lg:text-6xl xl:text-[68px] xl:leading-[1.02]">
                Feedback that ships itself.
              </h1>
            </BlurFade>
            <BlurFade delay={0.08}>
              <p className="max-w-[54ch] text-center text-base leading-relaxed font-medium tracking-tight text-balance text-muted-foreground md:text-lg">
                Users post and vote. Claude Code builds the top request, Kane CLI tests it in a real browser, and only a passing run reaches the changelog.
              </p>
            </BlurFade>
          </div>
          <BlurFade delay={0.16}>
            <div className="flex flex-col items-center gap-6">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <PrimaryCta />
                <Button variant="soft" size="lg" asChild>
                  <Link to="/$org" params={{ org: DEMO_ORG }}>Try the live demo</Link>
                </Button>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
                <span className="text-xs font-medium text-muted-foreground">Built with</span>
                {BUILT_WITH.map(([name, Icon]) => (
                  <span key={name} className="inline-flex items-center gap-2 text-[13px] text-muted-foreground">
                    <Icon className="size-3.5" />{name}
                  </span>
                ))}
              </div>
            </div>
          </BlurFade>
        </div>
      </div>
      <BlurFade delay={0.28} className="relative mt-10 px-6">
        <div className="relative overflow-hidden rounded-2xl border border-input bg-card shadow-xl">
          <div className="flex items-center gap-2 border-b px-4 py-2.5">
            {[0, 1, 2].map((i) => <span key={i} className="size-2.5 rounded-full bg-input" />)}
            <span className="mx-auto rounded-md bg-background px-3 py-0.5 text-[11px] text-faint">hearloop.app/{DEMO_ORG}</span>
          </div>
          <picture>
            <source srcSet="/landing/board.webp" type="image/webp" />
            <img src="/landing/board.png" alt="The hearloop public board: feature requests ranked by votes, with boards and roadmap counts" width={1920} height={1080}
              className="block aspect-[4/3] w-full object-cover object-top sm:aspect-[1920/1000]" fetchPriority="high" />
          </picture>
          <BorderBeam size={260} duration={10} colorFrom="var(--brand)" colorTo="transparent" />
        </div>
      </BlurFade>
      <div className="h-10" />
    </section>
  )
}
