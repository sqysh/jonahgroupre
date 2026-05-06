import { Fragment } from 'react'
import HeaderLink from './HeaderLink'
import Logo from '../common/Logo'
import { logoLines } from '../common/styles'
import { useAppDispatch, useHeaderSeletor } from '../../lib/redux/store'
import { openNavigationDrawer } from '../../lib/redux/features/headerSlice'
import Link from 'next/link'
import { LogIn, Mail, Menu } from 'lucide-react'
import { motion } from 'framer-motion'
import { headerVariants, topBarVariants } from '@/app/lib/constants/motion'
import { headerLinksData } from '@/app/lib/utils/navigation'
import { usePathname } from 'next/navigation'

const Header = () => {
  const dispatch = useAppDispatch()
  const path = usePathname()
  const { navigationDrawer } = useHeaderSeletor()

  return (
    <Fragment>
      {/* Top Bar */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={topBarVariants}
        className="hidden 990:block bg-topbar-light dark:bg-topbar-dark px-6 h-10"
      >
        <div className="max-w-300 mx-auto w-full flex gap-x-3 items-center justify-end h-full">
          {/* Login Button */}
          <Link
            href="/login"
            className="flex items-center gap-x-1.5 text-white/70 hover:text-primary-dark text-xs font-medium tracking-wide transition-colors duration-200 mr-3"
          >
            <LogIn className="w-3 h-3" />
            <span>Login</span>
          </Link>

          {/* Divider */}
          <div className="w-px h-4 bg-white/10" />
        </div>
      </motion.div>

      {/* Main Header */}
      <motion.div
        animate={navigationDrawer ? 'open' : 'closed'}
        variants={headerVariants}
        transition={{ duration: 0.2 }}
        className={`${
          navigationDrawer
            ? 'sm:fixed sm:block sm:h-20 sm:w-screen sm:top-0 sm:left-0 sm:right-0 sm:z-60 sm:translate-x-70'
            : 'sticky top-0 z-50'
        }`}
      >
        <div className="bg-navbar-light dark:bg-navbar-dark h-20 border-b border-border-light dark:border-border-dark w-full">
          <div className="max-w-300 mx-auto w-full flex items-center justify-between h-full pl-3">
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.02 }} className={`relative ${logoLines}`}>
              <Link href="/">
                <Logo width="w-48 990:w-60" />
              </Link>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.div
              whileTap={{ scale: 0.95 }}
              className={`w-16 flex items-center 990:hidden ${
                navigationDrawer ? 'hidden' : 'block'
              }`}
              onClick={() => dispatch(openNavigationDrawer())}
            >
              <Menu className="w-5 h-5 cursor-pointer text-text-light dark:text-text-dark" />
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden 990:flex items-center h-full w-full">
              <div className="flex justify-end items-center w-full gap-6 pr-12">
                {headerLinksData(path).map(({ linkKey, active, textKey }, i) => (
                  <motion.div key={i} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <HeaderLink linkKey={linkKey} active={active} textKey={textKey} />
                  </motion.div>
                ))}
              </div>

              {/* Phone Button */}
              <motion.div
                className="hidden sm:flex flex-col z-10 h-20 px-10 items-center justify-center bg-primary-light dark:bg-primary-dark relative cursor-pointer
                  group transition-colors duration-200
                  before:absolute before:content-[''] before:right-full before:z-10 before:bottom-0 before:top-0   
                  before:border-b-primary-light dark:before:border-b-primary-dark before:border-b-80
                  before:border-t-transparent before:border-t-0
                  before:border-l-transparent before:border-l-22
                  before:transition-colors before:duration-200
                  after:absolute after:content-[''] after:bg-primary-light dark:after:bg-primary-dark after:w-screen
                  after:left-0 after:h-full after:top-0 after:z-[-1]
                  after:transition-colors after:duration-200
                  hover:bg-button-light dark:hover:bg-button-dark
                group-hover:before:border-b-button-light dark:group-hover:before:border-b-button-dark
                group-hover:after:bg-button-light dark:group-hover:after:bg-button-dark"
              >
                <Link href="/contact">
                  <Mail className="text-white dark:text-bg-dark w-7 h-7 transition-transform duration-200 group-hover:scale-110" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </Fragment>
  )
}

export default Header
