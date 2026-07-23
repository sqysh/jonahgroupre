'use client'

import SqFtBedroomsAndBathroomsBox from './SqFtBedroomsAndBathroomsBox'
import useVideo from '@/app/lib/hooks/useVideo'
import Video from '../common/Video'
import Link from 'next/link'
import addCommas from '@/app/lib/utils/addCommas'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { RepliersListing } from '@/app/lib/types/repliers.types'
import { container, fadeDown, fadeLeft, fadeRight, fadeUp } from '@/app/lib/constants/motion'

export default function HomeHero({ listing }: { listing: RepliersListing | null }) {
  const { videoRef } = useVideo()

  const noListings = !listing || Object.keys(listing).length === 0

  const fullAddress = listing
    ? [listing?.address?.streetNumber, listing?.address?.streetName, listing?.address?.streetSuffix]
        .filter(Boolean)
        .join(' ')
    : ''

  const cityState = listing
    ? `${listing?.address?.city}, ${listing?.address?.state?.substring(0, 2).toUpperCase()}`
    : ''

  return (
    <div className="relative w-full h-105 xs:h-120 sm:h-125">
      <Video videoRef={videoRef} src="/videos/home-banner-video.mp4" />

      {/* Overlay */}
      <motion.div
        className="absolute inset-0 z-10 bg-black/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      />

      {!noListings ? (
        <motion.div
          className="absolute inset-0 z-20 flex flex-col justify-center px-3 sm:px-4"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-300 mx-auto w-full flex flex-col">
            <Link href={`/listings/${listing?.mlsNumber}`} className="w-full cursor-pointer">
              {/* Top Content Box */}
              <motion.div variants={fadeDown} className="text-white">
                <div className="bg-black/60 px-4 py-3 sm:px-6 sm:py-4 w-full sm:w-fit">
                  {/* Mobile title */}
                  <motion.h1
                    variants={fadeDown}
                    className="text-[22px] leading-tight font-semibold mb-2 sm:hidden"
                  >
                    {listing?.details?.style || listing?.class}
                  </motion.h1>

                  {/* Desktop title */}
                  <motion.h1
                    variants={fadeDown}
                    className="text-[32px] font-semibold mb-3 hidden sm:block duration-200 hover:text-primary-dark"
                  >
                    {listing?.details?.style || listing?.class} {fullAddress} {cityState}
                  </motion.h1>

                  <div className="flex flex-col gap-y-2 md:flex-row md:items-end md:justify-between md:gap-0">
                    {/* Price */}
                    <motion.div variants={fadeLeft} className="flex items-center gap-2 sm:mr-28">
                      <h3 className="font-bold text-xl sm:text-2xl leading-6">
                        ${addCommas(listing?.listPrice)}
                      </h3>
                      <p className="font-normal px-2 py-0.5 bg-primary-light dark:bg-primary-dark text-white dark:text-bg-dark text-xs sm:text-sm">
                        {listing?.type === 'Sale' ? 'For Sale' : 'For Rent'}
                      </p>
                    </motion.div>

                    {/* Address */}
                    <motion.div variants={fadeRight} className="flex items-center gap-2">
                      <MapPin className="text-primary-dark w-3 h-3 shrink-0" />
                      <p className="text-xs sm:text-sm font-normal leading-tight">
                        {listing?.details?.style || listing?.class} {fullAddress}{' '}
                        {listing?.address?.city}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Bottom Content Box */}
              <motion.div variants={fadeUp} className="text-white w-full">
                <div className="bg-white/80 px-4 py-2.5 sm:px-6 sm:py-3 w-full md:w-fit">
                  <SqFtBedroomsAndBathroomsBox
                    sqFt={listing?.details?.sqft || ''}
                    bedrooms={Number(listing?.details?.numBedrooms) || 0}
                    bathrooms={Number(listing?.details?.numBathrooms) || 0}
                    iconColor="text-zinc-700"
                  />
                </div>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      ) : (
        /* Empty State */
        <motion.div
          className="absolute inset-0 z-20 flex flex-col justify-center px-3 sm:px-4"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-300 mx-auto w-full flex flex-col">
            <motion.div variants={fadeDown} className="text-white">
              <div className="bg-black/60 px-4 py-6 sm:px-6 sm:py-8 w-full sm:w-fit">
                <motion.h1
                  variants={fadeDown}
                  className="text-[22px] leading-tight font-semibold mb-3 sm:text-[32px] sm:mb-4"
                >
                  Featured Listings Coming Soon
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  className="text-border-light text-xs sm:text-sm mb-5 sm:mb-6 max-w-70 sm:max-w-md leading-relaxed"
                >
                  Check back soon or contact Eileen to learn about available properties in
                  Massachusetts.
                </motion.p>

                <motion.div variants={fadeUp}>
                  <Link
                    href="/contact"
                    className="inline-block bg-primary-light dark:bg-primary-dark text-white dark:text-bg-dark font-bold uppercase text-xs sm:text-sm px-5 py-2.5 sm:px-6 sm:py-3 hover:bg-button-light dark:hover:bg-button-dark transition-colors duration-200"
                  >
                    Contact Eileen
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
