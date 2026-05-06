'use client'

import { headerLinksData } from '@/app/lib/utils/navigation'
import Link from 'next/link'
import { eileenInsta } from '@/app/lib/constants/social-media-links'
import { usePathname } from 'next/navigation'
import { ChevronRight, ChevronUp, Mail, MapPin, Phone } from 'lucide-react'
import { logoLines } from './common/styles'
import Logo from './common/Logo'

const InstagramIcon = () => {
  return (
    <svg
      className="w-5 h-5"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

const Footer = () => {
  const pathname = usePathname()
  const routes = [
    '/',
    '/team',
    '/listings',
    /^\/listings\/\d+$/,
    '/services',
    '/contact',
    '/search'
  ]

  const isRouteMatched = routes.some((route) =>
    typeof route === 'string' ? route === pathname : route.test(pathname)
  )

  return (
    <footer className={`${isRouteMatched ? 'flex' : 'hidden'} flex-col`}>
      {/* Main Footer */}
      <div className="bg-footer-light dark:bg-footer-dark relative">
        <div className="max-w-300 mx-auto grid grid-cols-12 gap-y-8 sm:gap-8 pt-16 pb-9 px-6">
          {/* Logo Col */}
          <div
            className={`footer-after col-span-12 md:col-span-4 relative z-10 bg-repeat
              before:absolute before:content-[''] before:h-77
              before:w-[1000%] before:-top-16 before:bottom-0
              before:z-0 before:bg-surface-dark
              before:990:right-0
              before:hidden before:990:block
            `}
          >
            <div className="relative z-10">
              <div className={`mb-9 ${logoLines}`}>
                <Logo width="w-60" src="/images/logo-removebg.png" />
              </div>
              <p className="text-footer-text-light dark:text-footer-text-dark font-semibold text-sm mb-5">
                Century 21 North East is dedicated to serving our communities with expert real
                estate services.
              </p>
              <div
                onClick={() => window.open(eileenInsta, '_blank')}
                className="w-10 h-10 rounded-full bg-surface2-dark hover:bg-surface-light dark:hover:bg-border-dark duration-200 flex items-center justify-center group cursor-pointer text-primary-dark hover:text-primary-light"
              >
                <InstagramIcon />
              </div>
            </div>
          </div>

          {/* Contact Col */}
          <div className="col-span-12 md:col-span-4">
            <h5 className="text-text-dark text-lg font-bold mb-5">Get in touch</h5>
            <div className="flex items-center gap-2 mb-1.5">
              <MapPin className="text-primary-light dark:text-primary-dark w-3 h-3" />
              <p className="text-footer-text-light dark:text-footer-text-dark text-sm">
                100 Sagamore St Lynn, MA 01902
              </p>
            </div>
            <div className="flex items-center gap-2 mb-1.5">
              <Phone className="text-primary-light dark:text-primary-dark w-3 h-3" />
              <p className="text-footer-text-light dark:text-footer-text-dark text-sm">
                (781) 718-7665
              </p>
            </div>
            <div className="flex items-center gap-2 mb-1.5">
              <Mail className="text-primary-light dark:text-primary-dark w-3 h-3" />
              <p className="text-footer-text-light dark:text-footer-text-dark text-sm">
                ejonah@c21ne.com
              </p>
            </div>
          </div>

          {/* Nav Links Col */}
          <div className="col-span-12 md:col-span-4">
            <h5 className="text-text-dark text-lg font-bold mb-5">Quick Links</h5>
            <div className="flex flex-col gap-2">
              {headerLinksData(pathname).map((link, i) => (
                <Link
                  key={i}
                  href={link.linkKey}
                  className={`flex items-center gap-1 group w-fit ${
                    link.active
                      ? 'text-primary-light dark:text-primary-dark'
                      : 'text-footer-text-light dark:text-footer-text-dark'
                  } hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-200`}
                >
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-150" />
                  <span className="text-sm uppercase">{link.textKey}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark">
        <div className="max-w-300 w-full mx-auto flex items-center justify-between gap-2 px-6 py-3">
          {/* Scroll to Top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-xs uppercase font-semibold text-muted-light dark:text-muted-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-200 group"
          >
            <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-200" />
            <span>Top</span>
          </button>

          {/* Sqysh credit */}
          <p className="uppercase text-muted-light dark:text-muted-dark text-xs">
            &copy; {new Date().getFullYear()} -{' '}
            <span
              onClick={() => window.open('https://sqysh.io', '_blank')}
              className="text-primary-light dark:text-primary-dark cursor-pointer hover:text-button-light dark:hover:text-button-dark transition-colors duration-200"
            >
              Sqysh
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
export default Footer
