'use client'

import { ReactNode, useEffect } from 'react'
import { Provider } from 'react-redux'
import Hotjar from '@hotjar/browser'
import { store } from './lib/redux/store'
import ThemeProvider from './lib/providers/ThemeProvider'
import { NavigationDrawer } from './components/NavigationDrawer'
import Header from './components/header/Header'
import { usePathname } from 'next/navigation'
import Footer from './components/Footer'

const siteId = 5189124
const hotjarVersion = 6

const showLink = (path: string) =>
  !['/login', '/portal', '/super'].some((str) => path.includes(str))

export function RootLayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  useEffect(() => {
    Hotjar.init(siteId, hotjarVersion)
  }, [])

  return (
    <Provider store={store}>
      <ThemeProvider>
        <NavigationDrawer />
        {showLink(pathname) && <Header />}
        <main>{children}</main>
        {showLink(pathname) && <Footer />}
      </ThemeProvider>
    </Provider>
  )
}
