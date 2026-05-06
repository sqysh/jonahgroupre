import { FC } from 'react'
import Link from 'next/link'
import { HeaderLinkProps } from '@/app/lib/types/header-types'
import { largeChevron } from '../common/styles'

const HeaderLink: FC<HeaderLinkProps> = ({ linkKey, active, textKey }) => {
  return (
    <Link
      href={linkKey}
      className={`text-13 font-medium relative duration-200 text-text-light dark:text-text-dark
      ${
        active
          ? "after:absolute after:content-[''] after:w-3/4 after:h-1 after:bg-primary-light dark:after:bg-primary-dark after:top-7 after:left-0 after:right-0 after:mx-auto after:max-w-full"
          : 'hover:text-primary-light dark:hover:text-primary-dark'
      }`}
    >
      <span className={`relative uppercase ${active ? largeChevron : ''}`}>{textKey}</span>
    </Link>
  )
}

export default HeaderLink
