import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import { RootProvider } from 'fumadocs-ui/provider/tanstack'
import type { ReactNode } from 'react'
import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'hearloop docs' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  component: () => <Outlet />,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="flex min-h-screen flex-col selection:bg-brand/30">
        {/* ponytail: no docs search, a handful of pages; add a static Orama index if it grows */}
        <RootProvider theme={{ defaultTheme: 'dark' }} search={{ enabled: false }}>
          {children}
        </RootProvider>
        <Scripts />
      </body>
    </html>
  )
}
