import { createFileRoute, notFound } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { useFumadocsLoader } from 'fumadocs-core/source/client'
import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page'
import { Suspense, use } from 'react'
import { z } from 'zod'
import { docs, source } from '#/lib/source'
import { baseOptions } from '#/lib/layout.shared'
import { useMDXComponents } from '#/lib/mdx-components'

const loadPage = createServerFn({ method: 'GET' })
  .validator(z.array(z.string()))
  .handler(async ({ data: slugs }) => {
    const page = source.getPage(slugs)
    if (!page) throw notFound()
    return {
      path: page.path,
      title: page.data.title,
      description: page.data.description,
      pageTree: await source.serializePageTree(source.getPageTree()),
    }
  })

export const Route = createFileRoute('/docs/$')({
  loader: async ({ params }) => {
    const data = await loadPage({ data: params._splat?.split('/').filter(Boolean) ?? [] })
    await docs.getPage(data.path)?.preload()
    return data
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.title} · hearloop docs` : 'hearloop docs' },
      ...(loaderData?.description ? [{ name: 'description', content: loaderData.description }] : []),
    ],
  }),
  component: Page,
  notFoundComponent: () => (
    <main className="mx-auto max-w-md px-6 py-24 text-center">
      <h1 className="text-xl font-semibold">No such docs page</h1>
      <a href="/docs" className="mt-3 inline-block text-sm font-medium text-brand hover:underline">Back to the docs</a>
    </main>
  ),
})

function Page() {
  const { path, pageTree } = useFumadocsLoader(Route.useLoaderData())
  return (
    <DocsLayout {...baseOptions()} tree={pageTree}>
      <Suspense>
        <Content path={path} />
      </Suspense>
    </DocsLayout>
  )
}

function Content({ path }: { path: string }) {
  const page = docs.getPage(path)
  if (!page) throw new Error(`unknown docs page: ${path}`)
  const { toc } = use(page.load())
  const MDX = page.body
  return (
    <DocsPage toc={toc}>
      <DocsTitle>{page.title}</DocsTitle>
      <DocsDescription>{page.description}</DocsDescription>
      <DocsBody>
        <MDX components={useMDXComponents()} />
      </DocsBody>
    </DocsPage>
  )
}
