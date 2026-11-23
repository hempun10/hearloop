import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Bento } from '#/features/landing/components/bento'
import { Closing } from '#/features/landing/components/closing'
import { Faq } from '#/features/landing/components/faq'
import { Hero } from '#/features/landing/components/hero'
import { HowItWorks } from '#/features/landing/components/how-it-works'
import { LoopStory } from '#/features/landing/components/loop-story'
import { landingQuery } from '#/features/landing/landing.queries'

export const Route = createFileRoute('/_site/')({
  loader: ({ context }) => context.queryClient.query(landingQuery()),
  component: Landing,
})

function Landing() {
  const { data } = useSuspenseQuery(landingQuery())
  return (
    <main className="flex w-full flex-col items-center divide-y">
      <Hero />
      <HowItWorks lastPass={data.lastPass} />
      <Bento top={data.top} lastPass={data.lastPass} shipped={data.shipped} />
      <LoopStory stats={data.stats} />
      <Faq />
      <Closing />
    </main>
  )
}
