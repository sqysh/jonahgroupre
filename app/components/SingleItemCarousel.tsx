import React, { useCallback } from 'react'
import Picture from './common/Picture'
import Link from 'next/link'
import PropertyCardBottomBox from './property-card/PropertyCardBottomBox'
import addCommas from '../lib/utils/addCommas'
import { MapPin, Tag, Calendar, User } from 'lucide-react'
import { RepliersListing } from '../lib/types/repliers'

interface SingleItemCarouselProps {
  items: RepliersListing[]
  setCurrentIndex: (number: number) => void
  currentIndex: number
  totalItems: number
}

const SingleItemCarousel: React.FC<SingleItemCarouselProps> = ({
  items,
  setCurrentIndex,
  currentIndex,
  totalItems
}) => {
  const handleDotClick = useCallback(
    (index: number) => {
      setCurrentIndex(index)
    },
    [setCurrentIndex]
  )

  return (
    <div className="relative flex flex-col items-center w-full max-w-300 mx-auto">
      <div className="overflow-hidden w-full">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((property, index) => {
            const fullAddress = [
              property?.address?.streetNumber,
              property?.address?.streetName,
              property?.address?.streetSuffix
            ]
              .filter(Boolean)
              .join(' ')

            return (
              <div key={property.mlsNumber} className="flex-shrink-0 w-full">
                <Link href={`/listings/${property?.mlsNumber}`} className={`bg-[#f8f8f8] w-full`}>
                  <div
                    className={`single-item-carousel w-full flex flex-col px-3 xl:px-0 990:flex-row gap-y-4 sm:gap-x-4 md:gap-x-8`}
                  >
                    {/* Image Section */}
                    <div className="relative w-full 990:w-1/2">
                      {property?.images && property.images.length > 0 && (
                        <>
                          <Picture
                            className={`w-full h-full max-h-80 object-cover`}
                            src={`https://cdn.repliers.io/${property.images[0]}`}
                            alt={property?.mlsNumber || 'Property Image'}
                            priority={true}
                          />
                          {/* Image overlay badges */}
                          <div className="absolute top-4 left-4 flex flex-col gap-2">
                            <div className="bg-orange-500 text-white px-3 py-1 text-xs font-semibold rounded">
                              Featured
                            </div>
                            <div className="bg-red-500 text-white px-3 py-1 text-xs font-semibold rounded">
                              {property?.type === 'Sale' ? 'For Sale' : 'For Rent'}
                            </div>
                          </div>
                          {property?.photoCount && (
                            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 text-xs rounded">
                              {property.photoCount} Photos
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    {/* Details Section */}
                    <div className="flex flex-col justify-between w-full 990:w-1/2 py-4">
                      <div className="pb-6 990:pb-0">
                        {/* Title and Price */}
                        <div className="mb-4">
                          <h2 className="text-wrap w-full font-Poppins-Medium text-[27px] sm:text-[32px] tracking-tighter text-gray-800 mb-2 hover:text-orange-500 duration-200 line-clamp-2">
                            {property?.details?.style || property?.class} in{' '}
                            {property?.address?.city}
                          </h2>
                          <div className="flex items-baseline mb-3">
                            <span className="font-bold text-orange-500 mr-2 text-xs sm:text-sm">
                              Start From
                            </span>
                            <p className="font-Poppins-Bold text-2xl mr-3">
                              ${addCommas(property?.listPrice)}
                            </p>
                          </div>
                        </div>

                        {/* Address */}
                        <div className="flex items-start gap-2 mb-4">
                          <MapPin className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-600 text-sm">
                            {fullAddress}, {property?.address?.city}, {property?.address?.state}{' '}
                            {property?.address?.zip}
                          </p>
                        </div>

                        {/* Property Type */}
                        {property?.details?.propertyType && (
                          <div className="flex items-center gap-2 mb-3">
                            <Tag className="w-4 h-4 text-orange-500" />
                            <p className="text-gray-600 text-sm">{property.details.propertyType}</p>
                          </div>
                        )}

                        {/* Agent Info */}
                        {property?.agents?.[0]?.name && (
                          <div className="flex items-center gap-2 mb-3">
                            <User className="w-4 h-4 text-orange-500" />
                            <p className="text-gray-600 text-sm">{property.agents[0].name}</p>
                          </div>
                        )}

                        {/* Year Built */}
                        {property?.details?.yearBuilt && (
                          <div className="flex items-center gap-2 mb-4">
                            <Calendar className="w-4 h-4 text-orange-500" />
                            <p className="text-gray-600 text-sm">
                              Built in {property.details.yearBuilt}
                            </p>
                          </div>
                        )}

                        {/* Description Preview */}
                        {property?.details?.description && (
                          <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                            {property.details.description}
                          </p>
                        )}
                      </div>

                      {/* Bottom Stats Box */}
                      <PropertyCardBottomBox
                        index={index}
                        sqFt={property?.details?.sqft || ''}
                        bedrooms={Number(property?.details?.numBedrooms) || 0}
                        bathrooms={Number(property?.details?.numBathrooms) || 0}
                      />
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </div>

      {/* Carousel Dots */}
      <div className="flex mt-16 space-x-2">
        {Array.from({ length: totalItems }).map((_, index) => (
          <button
            key={index}
            className={`w-6 h-1 transition-colors ${
              index === currentIndex ? 'bg-orange-500' : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => handleDotClick(index)}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  )
}

export default SingleItemCarousel
