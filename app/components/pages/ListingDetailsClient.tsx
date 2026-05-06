'use client'

import SqFtBedroomsAndBathroomsBox from '@/app/components/home-page/SqFtBedroomsAndBathroomsBox'
import PropertyIdAndBarcode from '@/app/components/listings/PropertyIdAndBarcode'
import TitleWithOrangeLine from '@/app/components/listings/TitleWithOrangeLine'
import ListingDetailsImageCarousel from '@/app/components/listings/ListingImageCarousel'
import DetailsGridOne from '@/app/components/listings/DetailsGridOne'
import DetailsGridTwo from '@/app/components/listings/DetailsGridTwo'
import DetailsGridThree from '@/app/components/listings/DetailsGridThree'
import Picture from '@/app/components/common/Picture'
import addCommas from '@/app/lib/utils/addCommas'
import dynamic from 'next/dynamic'
import { Send } from 'lucide-react'
import { ContactForm } from '../forms/ContactForm'
import { useState } from 'react'
const SingleListingMap = dynamic(() => import('@/app/components/SingleMapListing'), { ssr: false })

const ListingDetailsClient = ({ listing }: { listing: any | null }) => {
  const [submitted, setSubmitted] = useState(false)

  const fullAddress = listing
    ? [
        listing?.address?.streetNumber,
        listing?.address?.streetName,
        listing?.address?.neighborhood,
        listing?.address?.zip
      ]
        .filter(Boolean)
        .join(' ')
    : ''

  const cityState = listing ? `${listing?.address?.city}, ${listing?.address?.state}` : ''

  return (
    <>
      {/* Map + Address Overlay */}
      <div className="h-105 w-full relative">
        <SingleListingMap
          latitude={listing?.map?.latitude || 0}
          longitude={listing?.map?.longitude || 0}
        />
        <div className="max-w-3xl px-3 1240:px-0 990:max-w-247.5 lg:max-w-300 absolute bottom-0 left-1/2 -translate-x-1/2 w-full">
          <div className="max-w-screen-sm bg-black/70">
            <div className="text-white p-4 sm:p-6">
              <h2 className="text-2xl sm:text-4xl font-bold mb-3 leading-tight">
                {fullAddress}, {listing?.address?.city}
              </h2>
              <div className="flex items-center gap-2">
                <p className="text-xl sm:text-2xl font-bold leading-6">
                  ${addCommas(listing?.listPrice)}
                </p>
                <div className="bg-primary-light dark:bg-primary-dark text-white dark:text-bg-dark font-semibold py-1 px-2 text-xs uppercase">
                  {listing?.type === 'Sale' ? 'For Sale' : 'For Rent'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl px-3 1240:px-0 990:max-w-247.5 lg:max-w-300 mx-auto w-full">
        {/* Stats Bar */}
        <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark gap-y-3 px-5 py-4 mb-12 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="gap-y-4 sm:gap-8 flex flex-col sm:flex-row sm:items-center">
            <SqFtBedroomsAndBathroomsBox
              sqFt={listing?.details?.sqft || ''}
              bedrooms={Number(listing?.details?.numBedrooms) || 0}
              bathrooms={Number(listing?.details?.numBathrooms) || 0}
              iconColor="text-primary-light dark:text-primary-dark"
            />
            <PropertyIdAndBarcode id={listing?.mlsNumber} />
          </div>
        </div>

        {/* Main Grid */}
        <div className="max-w-300 mx-auto grid grid-cols-12 gap-y-8 sm:gap-8">
          {/* Left Column */}
          <div className="col-span-12 lg:col-span-9">
            {/* Image Carousel */}
            <ListingDetailsImageCarousel images={listing?.images} />

            {/* Description */}
            <div className="mb-12">
              <TitleWithOrangeLine section="Description" />
              <p className="text-muted-light dark:text-muted-dark text-sm leading-7 font-normal">
                {listing?.details?.description || 'No description available'}
              </p>
            </div>

            {/* Address */}
            <div className="mb-12 text-sm flex flex-col gap-y-2">
              <TitleWithOrangeLine section="Address" />
              <div className="flex items-start gap-2">
                <span className="text-xs uppercase font-semibold text-muted-light dark:text-muted-dark w-16 shrink-0 pt-0.5">
                  Address
                </span>
                <span className="text-text2-light dark:text-text2-dark">
                  {fullAddress} {cityState}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-xs uppercase font-semibold text-muted-light dark:text-muted-dark w-16 shrink-0 pt-0.5">
                  Country
                </span>
                <span className="text-text2-light dark:text-text2-dark">
                  {listing?.address?.country || 'United States'}
                </span>
              </div>
            </div>

            {/* Detail Grids */}
            <DetailsGridOne listing={listing} />
            <DetailsGridTwo listing={listing} />
            <DetailsGridThree listing={listing} />

            {/* MLS Disclaimer */}
            <div className="text-xs text-muted-light dark:text-muted-dark mb-16 leading-6 border-t border-border-light dark:border-border-dark pt-8">
              <span className="inline-block align-middle">
                <Picture
                  src="/images/mls-pin-2.png"
                  alt="MLS Pin"
                  className="w-16 h-auto object-contain inline-block align-middle mr-1"
                  priority={false}
                />
              </span>
              &copy; {new Date().getFullYear()} MLS Property Information Network, Inc. (MLSPIN). The
              property listing data and information set forth herein were provided to MLS Property
              Information Network, Inc. from third party sources, including sellers, lessors and
              public records, and were compiled by MLS Property Information Network, Inc. The
              property listing data and information are for the personal, non commercial use of
              consumers having a good faith interest in purchasing or leasing listed properties of
              the type displayed to them and may not be used for any purpose other than to identify
              prospective properties which such consumers may have a good faith interest in
              purchasing or leasing. MLS Property Information Network, Inc. and its subscribers
              disclaim any and all representations and warranties as to the accuracy of the property
              listing data and information set forth herein. This information was last updated on{' '}
              {new Date(
                listing?.timestamps?.listingUpdated || listing?.updatedOn
              ).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
              . Some properties which appear for sale on this web site may subsequently have sold or
              may no longer be available. The listing broker&apos;s offer of compensation is made
              only to participants of the MLS where the listing is filed. Please contact{' '}
              {listing?.agents?.[0]?.name || 'the listing agent'} directly for additional
              information pertaining to the status and availability of properties displayed on this
              website.
            </div>
          </div>

          {/* Right Column — Search */}
          <div className="hidden md:flex col-span-12 lg:col-span-3 flex-col gap-y-6">
            {/* Contact Form */}
            <div className="mt-20 pt-12 border-t border-border-light dark:border-border-dark">
              <div className="max-w-155 mx-auto w-full">
                <div className="mb-10">
                  <h2 className="text-2xl sm:text-3xl font-bold uppercase text-text-light dark:text-text-dark mb-2">
                    Get in Touch
                  </h2>
                  <div
                    className="w-10 h-1 bg-primary-light dark:bg-primary-dark mb-4"
                    aria-hidden="true"
                  />
                  <p className="text-sm text-muted-light dark:text-muted-dark leading-relaxed">
                    Fill out the form below and Eileen will get back to you as soon as possible.
                  </p>
                </div>
                {submitted ? (
                  <div
                    role="alert"
                    className="bg-primary-light/10 dark:bg-primary-dark/10 border border-primary-light dark:border-primary-dark p-10 text-center"
                  >
                    <Send
                      className="w-10 h-10 text-primary-light dark:text-primary-dark mx-auto mb-4"
                      aria-hidden="true"
                    />
                    <p className="text-lg font-bold text-text-light dark:text-text-dark mb-2">
                      Message Sent!
                    </p>
                    <p className="text-sm text-muted-light dark:text-muted-dark mb-6">
                      Eileen will be in touch with you shortly.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs uppercase font-semibold text-primary-light dark:text-primary-dark hover:underline focus-visible:outline-none focus-visible:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <ContactForm setSubmitted={setSubmitted} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ListingDetailsClient
