import { FC } from 'react'
import Link from 'next/link'
import { MapPin, Tag, User, Calendar } from 'lucide-react'
import Picture from '@/app/components/common/Picture'
import PropertyCardBottomBox from '../property-card/PropertyCardBottomBox'
import { RepliersListing } from '@/app/lib/types/repliers'

interface PropertyCardProps {
  property: RepliersListing
  index: number
}

const addCommas = (num: number) => num.toLocaleString()

const ListingsPropertyCard: FC<PropertyCardProps> = ({ property, index }) => {
  return (
    <Link
      href={`/listings/${property?.mlsNumber}`}
      className="bg-surface-light dark:bg-surface-dark w-full flex flex-col transition-colors duration-200"
    >
      <div className="flex flex-col justify-between h-full">
        <div className="p-4">
          {/* Image */}
          {property?.images && property.images.length > 0 ? (
            <div className="relative mb-3">
              <Picture
                className="w-full max-h-52 h-full object-cover aspect-video"
                src={`https://cdn.repliers.io/${property.images[0]}`}
                alt={property?.mlsNumber || 'Property Listing'}
                priority={true}
              />
              <div className="absolute top-3 left-3">
                <span className="bg-primary-light dark:bg-primary-dark text-white dark:text-bg-dark text-xs font-semibold px-2 py-1">
                  {property?.type === 'Sale' ? 'For Sale' : 'For Rent'}
                </span>
              </div>
            </div>
          ) : (
            <div className="w-full aspect-video bg-surface2-light dark:bg-surface2-dark flex items-center justify-center mb-3">
              <p className="text-xs text-muted-light dark:text-muted-dark">No Image</p>
            </div>
          )}

          {/* Title */}
          <h2 className="font-bold text-base text-text-light dark:text-text-dark truncate mb-1 hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-200">
            {property?.details?.style} {property?.address?.streetNumber}{' '}
            {property?.address?.streetName} {property?.address?.streetSuffix},{' '}
            {property?.address?.city}, {property?.address?.state?.substring(0, 2).toUpperCase()}
          </h2>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="font-bold text-primary-light dark:text-primary-dark text-xs">
              Start From
            </span>
            <p className="font-bold text-text-light dark:text-text-dark leading-6">
              ${addCommas(property?.listPrice)}
            </p>
          </div>

          {/* Address */}
          <div className="flex items-center gap-1.5 mb-1.5">
            <MapPin
              className="w-3 h-3 text-primary-light dark:text-primary-dark shrink-0"
              aria-hidden="true"
            />
            <p className="text-muted-light dark:text-muted-dark text-xs truncate">
              {property?.address?.streetNumber} {property?.address?.streetName}{' '}
              {property?.address?.streetSuffix}, {property?.address?.city},{' '}
              {property?.address?.state} {property?.address?.zip}
            </p>
          </div>

          {/* Property Type */}
          {property?.details?.propertyType && (
            <div className="flex items-center gap-1.5 mb-1.5">
              <Tag
                className="w-3 h-3 text-primary-light dark:text-primary-dark shrink-0"
                aria-hidden="true"
              />
              <p className="text-muted-light dark:text-muted-dark text-xs">
                {property.details.propertyType}
              </p>
            </div>
          )}

          {/* Agent + Year Built */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-1.5">
              <User
                className="w-3 h-3 text-primary-light dark:text-primary-dark shrink-0"
                aria-hidden="true"
              />
              <p className="text-muted-light dark:text-muted-dark text-xs truncate max-w-[120px]">
                {property?.agents?.[0]?.name || 'Eileen Jonah'}
              </p>
            </div>
            {property?.details?.yearBuilt && (
              <div className="flex items-center gap-1.5">
                <Calendar
                  className="w-3 h-3 text-primary-light dark:text-primary-dark shrink-0"
                  aria-hidden="true"
                />
                <p className="text-muted-light dark:text-muted-dark text-xs">
                  Built {property.details.yearBuilt}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Stats */}
        <PropertyCardBottomBox
          index={index}
          sqFt={property?.details?.sqft || ''}
          bedrooms={Number(property?.details?.numBedrooms) || 0}
          bathrooms={Number(property?.details?.numBathrooms) || 0}
        />
      </div>
    </Link>
  )
}

export default ListingsPropertyCard
