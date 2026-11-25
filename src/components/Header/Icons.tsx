import type { ReactElement, ReactNode } from 'react'
import type { IconName } from '../../types'

const svg = (children: ReactNode) => () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">{children}</svg>
)

export const ICONS: Record<IconName, () => ReactElement> = {
  home: svg(<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />),
  sparkle: svg(<><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" /><path d="M19 17v4M17 19h4" /></>),
  drop: svg(<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" />),
  gift: svg(<><rect x="3" y="9" width="18" height="12" rx="2" /><path d="M12 9v12M3 14h18" /><path d="M12 9C9 9 7 7.6 7 6a2.2 2.2 0 0 1 4-1.2L12 9zM12 9c3 0 5-1.4 5-3a2.2 2.2 0 0 0-4-1.2L12 9z" /></>),
}
