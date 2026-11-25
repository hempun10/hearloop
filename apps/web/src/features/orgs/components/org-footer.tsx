import { KeyboardHints } from '#/components/keyboard-hints'
import { useOrg } from '../use-org'

export function OrgFooter() {
  const { org } = useOrg()
  return (
    <footer className="mt-24 pb-12">
      <KeyboardHints />
      {org.poweredBy && (
        <p className="mt-4 text-center text-xs text-faint">
          <a href="/" className="hover:text-muted-foreground">
            Powered by hearloop
          </a>{' '}
          · every shipped item verified with Kane CLI
        </p>
      )}
    </footer>
  )
}
