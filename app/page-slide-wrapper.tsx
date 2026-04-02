'use client'

import { FC } from 'react'
import Header from './components/header/Header'
import { NavigationDrawer } from './components/NavigationDrawer'
import ScrollToTopButton from './components/ScrollToTopButton'
import { useHeaderSeletor } from './lib/redux/store'
import useScrollToTop from '@/app/lib/hooks/useScrollTop'
import { ChildrenProps } from './lib/types/common-types'
import Footer from './components/Footer'

const PageSlideWrapper: FC<ChildrenProps> = ({ children }) => {
  const { navigationDrawer } = useHeaderSeletor()
  useScrollToTop()

  return (
    <>
      <NavigationDrawer />
      <Header />
      <div
        className={`transform transition-transform duration-200 ease-in-out overflow-hidden ${
          navigationDrawer ? 'translate-x-0  lg:translate-x-[280px] mt-20' : 'translate-x-0'
        }`}
      >
        <main>{children}</main>
        <Footer />
      </div>
      <ScrollToTopButton />
    </>
  )
}

export default PageSlideWrapper
