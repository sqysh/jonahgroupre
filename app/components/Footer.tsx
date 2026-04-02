'use client'

import servicedCities from '@/app/lib/constants/serviced-cities'
import { headerLinksData } from '@/app/lib/utils/navigation'
import Link from 'next/link'
import { eileenInsta } from '@/app/lib/constants/social-media-links'
import { useRouter } from 'next/navigation'
import useCustomPathname from '@/app/lib/utils/useCustomPathname'
import { ChevronRight, Mail, MapPin, Phone } from 'lucide-react'
import { logoOrangeLines } from './common/styles'
import Logo from './common/Logo'

// InstagramIcon.tsx
const InstagramIcon = () => {
  return (
    <>
      {/* Light Mode */}
      <svg
        className=" w-5 h-5"
        fill="#fa7319"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    </>
  )
}

const Footer = () => {
  const router = useRouter()
  const pathname = useCustomPathname()
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

  const handleCitySearch = (city: string) => {
    router.push(`/search?cityName=${city}`)
  }

  return (
    <footer className={`${isRouteMatched ? 'flex' : 'hidden'}  flex-col`}>
      <div className="bg-[#222222] relative">
        <div className="max-w-1200 mx-auto grid grid-cols-12 gap-y-8 sm:gap-8 pt-16 pb-9 px-6">
          <div
            className={`footer-after col-span-12 md:col-span-4 relative z-10 bg-repeat
          before:absolute before:content-[''] before:h-[291px]
          before:w-[1000%] before:-top-[64px] before:bottom-0
          before:z-0 before:bg-[#191919]
          before:990:right-0
          before:hidden before:990:block
          `}
          >
            <div className="relative z-10">
              <div className={`mb-9 ${logoOrangeLines}`}>
                <Logo width="w-60" src="/images/logo-removebg.png" />
              </div>
              <p className="text-[#9d9d9d] font-semibold text-sm mb-5">
                Century 21 North East is dedicated to serving our communities with expert real
                estate services.
              </p>
              <div
                onClick={() => window.open(eileenInsta, '_blank')}
                className="w-10 h-10 rounded-full bg-[#28292b] hover:bg-[#f8f8f8] duration-200 flex items-center justify-center group cursor-pointer"
              >
                <InstagramIcon />
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-4">
            <h5 className="text-white text-lg font-bold mb-5">Get in touch</h5>
            <div className="flex items-center gap-2 mb-1.5">
              <MapPin className="text-orange-500 w-3 h-3" />
              <p className="text-footer-p text-sm">100 Sagamore St Lynn, MA 01902</p>
            </div>
            <div className="flex items-center gap-2 mb-1.5">
              <Phone className="text-orange-500 w-3 h-3" />
              <p className="text-footer-p text-sm">(781) 718-7665</p>
            </div>
            <div className="flex items-center gap-2 mb-1.5">
              <Mail className="text-orange-500 w-3 h-3" />
              <p className="text-footer-p text-sm">ejonah@c21ne.com</p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-4">
            <h5 className="text-white text-lg font-bold mb-5">Property Cities</h5>
            <div className="grid grid-cols-12 gap-2">
              {servicedCities.map((obj, i) => (
                <div
                  onClick={() => handleCitySearch(obj.city)}
                  key={i}
                  className="col-span-6 flex items-center gap-1 cursor-pointer"
                >
                  <ChevronRight className="text-orange-500 w-3 h-3" />
                  <p className="text-[#a6a6a6] text-sm">{obj.city}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white py-2 flex items-center">
        <div className="max-w-1200 w-full mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 px-6 py-2.5">
          <p className="uppercase text-[#919191] text-xs ">
            &copy; {new Date().getFullYear()} -{' '}
            <span
              onClick={() => window.open('https://sqysh.io', '_blank')}
              className="text-orange-500 cursor-pointer hover:text-orange-600"
            >
              Sqysh
            </span>
          </p>
          <div className="flex items-center justify-center flex-wrap gap-3 sm:gap-6">
            {headerLinksData(pathname).map((link, i) => (
              <Link
                key={i}
                href={link.linkKey}
                className={`${
                  link.active ? 'text-orange-500' : 'text-[#919191]'
                } text-xs uppercase hover:text-orange-500`}
              >
                {link.textKey}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
