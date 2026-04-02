import { Fragment } from 'react'
import HeaderLink from './HeaderLink'
import Logo from '../common/Logo'
import { logoOrangeLines } from '../common/styles'
import { useAppDispatch, useHeaderSeletor } from '../../lib/redux/store'
import { openNavigationDrawer } from '../../lib/redux/features/headerSlice'
import { eileenInsta } from '../../lib/constants/social-media-links'
import Link from 'next/link'
import useCustomPathname from '../../lib/utils/useCustomPathname'
import { Menu, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import { headerVariants, iconVariants, topBarVariants } from '@/app/lib/constants/motion'
import { InstagramIcon } from '@/public/svg/social-media'
import { headerLinksData } from '@/app/lib/utils/navigation'

const Header = () => {
  const dispatch = useAppDispatch()
  const path = useCustomPathname()
  const { navigationDrawer } = useHeaderSeletor()

  return (
    <Fragment>
      {/* Top Bar */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={topBarVariants}
        className="hidden 990:block bg-[#222222] px-6 h-10"
      >
        <div className="max-w-[1200px] mx-auto w-full flex gap-x-3 items-center justify-end h-full">
          <motion.div
            whileHover="hover"
            whileTap="tap"
            variants={iconVariants}
            onClick={() => window.open(eileenInsta, '_blank')}
            className="text-white w-3 h-3 cursor-pointer"
          >
            <InstagramIcon className="w-3 h-3" />
          </motion.div>
        </div>
      </motion.div>

      {/* Main Header */}
      <motion.div
        animate={navigationDrawer ? 'open' : 'closed'}
        variants={headerVariants}
        transition={{ duration: 0.2 }}
        className={`${
          navigationDrawer
            ? 'sm:fixed sm:block sm:h-20 sm:w-screen sm:top-0 sm:left-0 sm:right-0 sm:z-[60] sm:translate-x-[280px]'
            : 'sticky top-0 z-50'
        }`}
      >
        <div className="bg-white h-20 overflow-hidden px-3">
          <div className="max-w-screen-md 990:max-w-1200 mx-auto w-full flex items-center justify-between h-full">
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.02 }} className={`relative ${logoOrangeLines}`}>
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
              <Menu className="w-5 h-5 cursor-pointer" />
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
                className="hidden sm:flex flex-col z-10 h-full px-10 items-center justify-center bg-orange-500 relative
                  before:absolute before:content-[''] before:right-full before:z-10 before:bottom-0 before:top-0   
                  before:border-b-orange-500 before:border-b-[80px]
                  before:border-t-transparent before:border-t-0
                  before:border-l-transparent before:border-l-[22px] 
                  
                  after:absolute after:content-[''] after:bg-orange-500 after:w-[1000%]
                  after:left-full after:h-full after:top-0 after:z-10
                  "
              >
                <a href="tel:7817187665">
                  <Phone className="text-white w-7 h-7 rotate-[137deg]" />
                </a>
              </motion.div>
            </div>

            {/* Mobile Close Button Right */}
          </div>
        </div>
      </motion.div>
    </Fragment>
  )
}

export default Header
