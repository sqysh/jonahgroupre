'use client'

import React from 'react'
import Picture from './common/Picture'
import Link from 'next/link'
import PropertyCardBottomBox from './property-card/PropertyCardBottomBox'
import addCommas from '../lib/utils/addCommas'
import { MapPin, Tag, Calendar, User } from 'lucide-react'
import { RepliersListing } from '../lib/types/repliers'

interface HorizontalScrollCardsProps {
  items: RepliersListing[]
  title?: string
}

const HorizontalScrollCards: React.FC<HorizontalScrollCardsProps> = ({ items, title }) => {
  return (
    <div className="w-full max-w-1200 mx-auto px-3 xl:px-0">
      {title && <h2 className="text-3xl font-bold text-zinc-900 mb-8">{title}</h2>}

      {/* Horizontal Scroll Container */}
      <div className="overflow-x-auto scrollbar-hide -mx-3 px-3">
        <div className="flex pb-4">
          {items?.map((property, index) => {
            const fullAddress = [
              property?.address?.streetNumber,
              property?.address?.streetName,
              property?.address?.streetSuffix
            ]
              .filter(Boolean)
              .join(' ')

            return (
              <Link
                key={property.mlsNumber}
                href={`/listings/${property?.mlsNumber}`}
                className="shrink-0 w-87.5 sm:w-100 h-162.5 bg-white shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                {/* Image Section */}
                <div className="relative w-full h-64 shrink-0">
                  {property?.images && property.images.length > 0 ? (
                    <>
                      <Picture
                        className="w-full h-full object-cover"
                        src={`https://cdn.repliers.io/${property.images[0]}`}
                        alt={property?.mlsNumber || 'Property Image'}
                        priority={index < 3}
                      />
                      {/* Image overlay badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        <div className="bg-orange-500 text-white px-3 py-1 text-xs font-semibold">
                          {property?.type === 'Sale' ? 'For Sale' : 'For Rent'}
                        </div>
                      </div>
                      {property?.photoCount && (
                        <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 text-xs">
                          {property.photoCount} Photos
                        </div>
                      )}
                    </>
                  ) : (
                    // No image placeholder
                    <div className="w-full h-full bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <div className="text-center">
                        <svg
                          className="w-16 h-16 mx-auto mb-2 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <p className="text-gray-500 text-sm font-medium">No Images Available</p>
                      </div>
                      {/* Badge still shows even without image */}
                      <div className="absolute top-4 left-4">
                        <div className="bg-orange-500 text-white px-3 py-1 text-xs font-semibold">
                          {property?.type === 'Sale' ? 'For Sale' : 'For Rent'}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Details Section - grows to fill remaining space */}
                <div className="p-4 flex-1 flex flex-col">
                  {/* Title and Price */}
                  <div className="mb-3">
                    <h3 className="font-Poppins-Medium text-xl tracking-tight text-gray-800 mb-2 hover:text-orange-500 duration-200 line-clamp-2">
                      {property?.details?.style || property?.class} in {property?.address?.city}
                    </h3>
                    <div className="flex items-baseline mb-3">
                      <span className="font-bold text-orange-500 mr-2 text-xs">Start From</span>
                      <p className="font-Poppins-Bold text-2xl">
                        ${addCommas(property?.listPrice)}
                      </p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {fullAddress}, {property?.address?.city}, {property?.address?.state}{' '}
                      {property?.address?.zip}
                    </p>
                  </div>

                  {/* Property Type */}
                  {property?.details?.propertyType && (
                    <div className="flex items-center gap-2 mb-2">
                      <Tag className="w-4 h-4 text-orange-500" />
                      <p className="text-gray-600 text-sm">{property.details.propertyType}</p>
                    </div>
                  )}

                  {/* Agent Info */}
                  {property?.agents?.[0]?.name && (
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-orange-500" />
                      <p className="text-gray-600 text-sm">{property.agents[0].name}</p>
                    </div>
                  )}

                  {/* Year Built */}
                  {property?.details?.yearBuilt && (
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="w-4 h-4 text-orange-500" />
                      <p className="text-gray-600 text-sm">Built in {property.details.yearBuilt}</p>
                    </div>
                  )}

                  {/* Description Preview */}
                  {property?.details?.description && (
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                      {property.details.description}
                    </p>
                  )}

                  {/* Spacer to push bottom box down */}
                  <div className="flex-1"></div>
                </div>

                {/* Bottom Stats Box - outside padding, at very bottom */}
                <PropertyCardBottomBox
                  index={index}
                  sqFt={property?.details?.sqft || ''}
                  bedrooms={Number(property?.details?.numBedrooms) || 0}
                  bathrooms={Number(property?.details?.numBathrooms) || 0}
                />
              </Link>
            )
          })}
        </div>
      </div>

      {/* Optional: Add scroll indicators */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}

export default HorizontalScrollCards
