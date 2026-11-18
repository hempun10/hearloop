import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { me } from '../lib/fns'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  beforeLoad: async () => ({ me: await me() }),
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'hearloop',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="font-sans antialiased [overflow-wrap:anywhere] selection:bg-link/30">
        {children}
        <Scripts />
      </body>
    </html>
  )
}
