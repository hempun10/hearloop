import { useCanGoBack, useRouter } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@hearloop/ui/components/button'

/**
 * "Back" on focused screens (sign in, sign up, new board) that hide the navbar.
 * Returns to wherever the visitor came from (landing page or a public board);
 * a direct visit has no history, so it falls back to the landing page.
 */
export function BackButton() {
  const router = useRouter()
  const canGoBack = useCanGoBack()
  return (
    <Button variant="ghost" size="sm" className="-ml-2.5 mb-8 text-muted-foreground"
      onClick={() => (canGoBack ? router.history.back() : router.navigate({ to: '/' }))}>
      <ArrowLeft />Back
    </Button>
  )
}
