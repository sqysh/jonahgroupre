'use client'

import { RepliersListing } from '@/app/lib/types/repliers'
import { useState } from 'react'

const DetailsGridOne = ({ listing }: { listing: RepliersListing }) => {
  const [section, setSection] = useState('Overview')

  const listingOverviewData = (listing: RepliersListing) =>
    [
      {
        textKey: 'Property Type',
        value: listing?.details?.propertyType || listing?.class || 'N/A'
      },
      { textKey: 'Property Class', value: listing?.class || 'N/A' },
      { textKey: 'Style', value: listing?.details?.style || 'N/A' },
      { textKey: 'Transaction Type', value: listing?.type || 'N/A' },
      { textKey: 'Year Built', value: listing?.details?.yearBuilt || 'N/A' },
      { textKey: 'Construction Status', value: listing?.details?.constructionStatus || 'N/A' },
      { textKey: 'Total Rooms', value: listing?.details?.numRooms || 'N/A' },
      { textKey: 'Bedrooms', value: listing?.details?.numBedrooms || 0 },
      { textKey: 'Bathrooms (Full)', value: listing?.details?.numBathrooms || 0 },
      { textKey: 'Bathrooms (Half)', value: listing?.details?.numBathroomsHalf || 'N/A' },
      {
        textKey: 'Square Feet',
        value: listing?.details?.sqft
          ? `${parseInt(listing.details.sqft).toLocaleString()} sqft`
          : 'N/A'
      },
      { textKey: 'Square Feet Range', value: listing?.details?.sqftRange || 'N/A' },
      { textKey: 'Living Area', value: listing?.details?.livingAreaMeasurement || 'N/A' },
      {
        textKey: 'Lot Size',
        value: listing?.lot?.squareFeet
          ? `${listing.lot.squareFeet.toLocaleString()} sqft`
          : listing?.lot?.acres
            ? `${listing.lot.acres} acres`
            : 'N/A'
      },
      { textKey: 'Heating', value: listing?.details?.heating || 'N/A' },
      { textKey: 'Cooling', value: listing?.details?.airConditioning || 'N/A' },
      { textKey: 'Flooring', value: listing?.details?.flooringType || 'N/A' },
      { textKey: 'Parking', value: listing?.details?.numParkingSpaces || 'N/A' },
      { textKey: 'Energy Certification', value: listing?.details?.energyCertification || 'N/A' }
    ].filter((item) => item.value !== 'N/A' && item.value !== null && item.value !== 0)

  const listingLocationData = (listing: RepliersListing) =>
    [
      {
        textKey: 'Full Address',
        value:
          `${listing?.address?.streetNumber || ''} ${listing?.address?.streetName || ''} ${listing?.address?.streetSuffix || ''}`.trim() ||
          'N/A'
      },
      { textKey: 'Unit Number', value: listing?.address?.unitNumber || 'N/A' },
      { textKey: 'City', value: listing?.address?.city || 'N/A' },
      { textKey: 'Country', value: listing?.address?.country || 'US' },
      { textKey: 'Area', value: listing?.address?.area || 'N/A' },
      { textKey: 'District', value: listing?.address?.district || 'N/A' },
      { textKey: 'Major Intersection', value: listing?.address?.majorIntersection || 'N/A' },
      { textKey: 'Latitude', value: listing?.map?.latitude?.toFixed(6) || 'N/A' },
      { textKey: 'Longitude', value: listing?.map?.longitude?.toFixed(6) || 'N/A' },
      { textKey: 'Neighborhood', value: listing?.address?.neighborhood || 'N/A' },
      { textKey: 'State', value: listing?.address?.state || 'N/A' },
      { textKey: 'ZIP Code', value: listing?.address?.zip || 'N/A' }
    ].filter((item) => item.value !== 'N/A' && item.value !== null)

  const listingAdditionalData = (listing: RepliersListing) =>
    [
      { textKey: 'MLS Number', value: listing?.mlsNumber || 'N/A' },
      { textKey: 'Board ID', value: listing?.boardId || 'N/A' },
      { textKey: 'Status', value: listing?.standardStatus || listing?.status || 'N/A' },
      { textKey: 'Last Status', value: listing?.lastStatus || 'N/A' },
      {
        textKey: 'List Date',
        value: listing?.listDate
          ? new Date(listing.listDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })
          : 'N/A'
      },
      { textKey: 'Days on Market', value: listing?.simpleDaysOnMarket || 'N/A' },
      { textKey: 'Days on Market (Detailed)', value: listing?.daysOnMarket || 'N/A' },
      {
        textKey: 'List Price',
        value: listing?.listPrice ? `$${listing.listPrice.toLocaleString()}` : 'N/A'
      },
      {
        textKey: 'Original Price',
        value: listing?.originalPrice ? `$${listing.originalPrice.toLocaleString()}` : 'N/A'
      },
      {
        textKey: 'Sold Date',
        value: listing?.soldDate
          ? new Date(listing.soldDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })
          : 'N/A'
      },
      {
        textKey: 'Sold Price',
        value: listing?.soldPrice ? `$${listing.soldPrice.toLocaleString()}` : 'N/A'
      },
      {
        textKey: 'Annual Property Taxes',
        value: listing?.taxes?.annualAmount
          ? `$${listing.taxes.annualAmount.toLocaleString()}`
          : 'N/A'
      },
      { textKey: 'Tax Assessment Year', value: listing?.taxes?.assessmentYear || 'N/A' },
      {
        textKey: 'HOA Fee (Monthly)',
        value: listing?.details?.HOAFee ? `$${listing.details.HOAFee}` : 'N/A'
      },
      {
        textKey: 'HOA Fee 2',
        value: listing?.details?.HOAFee2 ? `$${listing.details.HOAFee2}` : 'N/A'
      },
      {
        textKey: 'HOA Fee 3',
        value: listing?.details?.HOAFee3 ? `$${listing.details.HOAFee3}` : 'N/A'
      },
      {
        textKey: 'Parking Cost (Monthly)',
        value: listing?.details?.parkCostMonthly ? `$${listing.details.parkCostMonthly}` : 'N/A'
      },
      { textKey: 'Occupancy', value: listing?.occupancy || 'N/A' },
      { textKey: 'Lease Terms', value: listing?.details?.leaseTerms || 'N/A' },
      { textKey: 'Co-op Compensation', value: listing?.coopCompensation || 'N/A' },
      { textKey: 'Assignment', value: listing?.assignment || 'N/A' },
      { textKey: 'Photo Count', value: listing?.photoCount || 'N/A' },
      {
        textKey: 'Last Updated',
        value: listing?.updatedOn
          ? new Date(listing.updatedOn).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })
          : 'N/A'
      },
      { textKey: 'Virtual Tour', value: listing?.details?.virtualTourUrl || 'N/A' },
      { textKey: 'Video Link', value: listing?.details?.alternateURLVideoLink || 'N/A' },
      { textKey: 'More Info Link', value: listing?.details?.moreInformationLink || 'N/A' }
    ].filter((item) => item.value !== 'N/A' && item.value !== null)

  const currentData =
    section === 'Additional'
      ? listingAdditionalData(listing)
      : section === 'Location'
        ? listingLocationData(listing)
        : listingOverviewData(listing)

  return (
    <div className="w-full mb-16">
      {/* Tab Bar */}
      <div className="bg-surface2-light dark:bg-surface2-dark h-14.5 mb-7 flex border border-border-light dark:border-border-dark">
        {['Overview', 'Location', 'Additional'].map((tab) => (
          <button
            key={tab}
            onClick={() => setSection(tab)}
            aria-pressed={section === tab}
            className={`px-6 sm:px-8 h-full text-sm font-semibold uppercase tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark focus-visible:ring-inset ${
              section === tab
                ? 'bg-primary-light dark:bg-primary-dark text-white dark:text-bg-dark'
                : 'text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark hover:bg-border-subtle-light dark:hover:bg-border-subtle-dark'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Data Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-px text-sm bg-border-light dark:bg-border-dark">
        {currentData.map((obj, i) => (
          <div
            key={i}
            className="bg-bg-light dark:bg-bg-dark flex items-center justify-between py-2.5 px-3 gap-7 border-b border-border-light dark:border-border-dark"
          >
            <strong className="text-text-light dark:text-text-dark font-semibold">
              {obj?.textKey}
            </strong>
            <p className="text-muted-light dark:text-muted-dark text-right">{obj.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DetailsGridOne
