import { cloudflare } from '@cloudflare/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { fumadocsMdx } from 'fumadocs-mdx/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    fumadocsMdx(),
    cloudflare({ viteEnvironment: { name: 'ssr' }, inspectorPort: 9230 /* web uses 9229 */ }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
})
