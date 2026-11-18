import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { ClosingCta } from '#/features/landing/components/closing-cta'
import { Faq } from '#/features/landing/components/faq'
import { Hero } from '#/features/landing/components/hero'
import { HowItWorks } from '#/features/landing/components/how-it-works'
import { RuleSteps } from '#/features/landing/components/rule-steps'
import { ShippedMarquee } from '#/features/landing/components/shipped-marquee'
import { StatsStrip } from '#/features/landing/components/stats-strip'
import { landingQuery } from '#/features/landing/landing.queries'

export const Route = createFileRoute('/_site/')({
  loader: ({ context }) => context.queryClient.query(landingQuery()),
  component: Landing,
})

function Landing() {
  const { data } = useSuspenseQuery(landingQuery())
  return (
    <main className="overflow-x-clip">
      <Hero lastPass={data.lastPass} />
      <StatsStrip stats={data.stats} />
      <HowItWorks top={data.top} lastPass={data.lastPass} latest={data.shipped[0]} />
      <RuleSteps />
      <ShippedMarquee entries={data.shipped} />
      <Faq />
      <ClosingCta />
    </main>
  )
}
