import { type QueryClient, useQuery } from '@tanstack/react-query'
import { HeadContent, Scripts, createRootRouteWithContext, useMatch } from '@tanstack/react-router'
import type { CSSProperties, ReactNode } from 'react'
import { Toaster } from '@hearloop/ui/components/sonner'
import { TooltipProvider } from '@hearloop/ui/components/tooltip'
import { orgQuery, sessionQuery } from '#/features/orgs/org.queries'
import { RADIUS_CSS } from '#/features/widget/widget.schema'
import appCss from '../styles.css?url'

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  beforeLoad: async ({ context }) => ({ session: await context.queryClient.query(sessionQuery()) }),
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'hearloop' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  shellComponent: RootDocument,
})

/** A board brings its own theme and accent. They go on <html> so dialogs and toasts (portals) match. */
function useBoardLook() {
  const slug = useMatch({ from: '/$org', shouldThrow: false })?.params.org
  const { data } = useQuery({ ...orgQuery(slug ?? ''), enabled: !!slug })
  return slug ? data?.org : undefined
}

function RootDocument({ children }: { children: ReactNode }) {
  const board = useBoardLook()
  // the embeddable widget's panel carries its own look in its address (set by public/widget.js)
  const look = useMatch({ from: '/$org/widget', shouldThrow: false })?.search
  const theme = look?.theme ?? board?.theme
  const accent = look?.accent ?? board?.accent
  const style =
    accent || look?.radius
      ? ({
          ...(accent && { '--brand': accent }),
          ...(look?.radius && { '--radius': RADIUS_CSS[look.radius] }),
        } as CSSProperties)
      : undefined
  return (
    <html lang="en" className={theme === 'light' ? 'light' : 'dark'} style={style}>
      <head>
        <HeadContent />
      </head>
      <body className="selection:bg-brand/30">
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}
