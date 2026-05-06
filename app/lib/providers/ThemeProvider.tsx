'use client'

import { useEffect } from 'react'

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')

    const apply = (dark: boolean) => {
      document.documentElement.classList.toggle('dark', dark)
    }

    apply(media.matches)
    media.addEventListener('change', (e) => apply(e.matches))

    return () => media.removeEventListener('change', (e) => apply(e.matches))
  }, [])

  return <>{children}</>
}
