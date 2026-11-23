import { BrandMark } from '@hearloop/ui/components/brand-mark'
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'

const WEB = import.meta.env.VITE_WEB_URL

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <span className="flex items-center gap-2 font-semibold"><BrandMark className="size-5" />hearloop</span>,
      url: WEB,
    },
    links: [{ text: 'Live demo', url: `${WEB}/demo` }],
  }
}
