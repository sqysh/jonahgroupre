'use client'

import { RepliersListing } from '@/app/lib/types/repliers.types'
import { FC } from 'react'

interface DetailsGridThreeProps {
  listing: RepliersListing
}

const DetailsGridThree: FC<DetailsGridThreeProps> = ({ listing }) => {
  const listingFinancialData = (listing: RepliersListing) =>
    [
      {
        textKey: 'List Price',
        value: listing?.listPrice ? `$${listing.listPrice.toLocaleString()}` : 'N/A'
      },
      {
        textKey: 'Original Price',
        value: listing?.originalPrice ? `$${listing.originalPrice.toLocaleString()}` : 'N/A'
      },
      {
        textKey: 'Sold Price',
        value: listing?.soldPrice ? `$${listing.soldPrice.toLocaleString()}` : 'N/A'
      },
      {
        textKey: 'Price per Sqft',
        value:
          listing?.listPrice && listing?.details?.sqft
            ? `$${Math.round(listing.listPrice / parseInt(listing.details.sqft)).toLocaleString()}`
            : 'N/A'
      },
      {
        textKey: 'Annual Property Taxes',
        value: listing?.taxes?.annualAmount
          ? `$${listing.taxes.annualAmount.toLocaleString()}`
          : 'N/A'
      },
      { textKey: 'Tax Assessment Year', value: listing?.taxes?.assessmentYear || 'N/A' },
      {
        textKey: 'Monthly Tax Estimate',
        value: listing?.taxes?.annualAmount
          ? `$${Math.round(listing.taxes.annualAmount / 12).toLocaleString()}`
          : 'N/A'
      },
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
        textKey: 'Total Monthly HOA',
        value:
          [listing?.details?.HOAFee, listing?.details?.HOAFee2, listing?.details?.HOAFee3]
            .filter(Boolean)
            .reduce((sum, fee) => sum + parseFloat(fee || '0'), 0) > 0
            ? `$${[listing?.details?.HOAFee, listing?.details?.HOAFee2, listing?.details?.HOAFee3]
                .filter(Boolean)
                .reduce((sum, fee) => sum + parseFloat(fee || '0'), 0)
                .toLocaleString()}`
            : 'N/A'
      },
      {
        textKey: 'Parking Cost (Monthly)',
        value: listing?.details?.parkCostMonthly ? `$${listing.details.parkCostMonthly}` : 'N/A'
      },
      {
        textKey: 'Condo Corporation',
        value: listing?.condominium?.condoCorp || 'N/A'
      },
      {
        textKey: 'Condo Corp Number',
        value: listing?.condominium?.condoCorpNum || 'N/A'
      },
      {
        textKey: 'Building Insurance',
        value: listing?.condominium?.buildingInsurance || 'N/A'
      },
      {
        textKey: 'Co-op Compensation',
        value: listing?.coopCompensation || 'N/A'
      },
      { textKey: 'Lease Terms', value: listing?.details?.leaseTerms || 'N/A' },
      { textKey: 'Occupancy', value: listing?.occupancy || 'N/A' }
    ].filter((item) => item.value !== 'N/A' && item.value !== null)

  return (
    <div className="w-full mb-16">
      {/* Tab Bar */}
      <div className="bg-surface2-light dark:bg-surface2-dark h-14.5 mb-7 flex border border-border-light dark:border-border-dark">
        <button
          aria-pressed={true}
          className="px-6 sm:px-8 h-full text-sm font-semibold uppercase tracking-wide bg-primary-light dark:bg-primary-dark text-white dark:text-bg-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark focus-visible:ring-inset"
        >
          Financial
        </button>
      </div>

      {/* Data Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-px text-sm bg-border-light dark:bg-border-dark">
        {listingFinancialData(listing).map((obj, i) => (
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

export default DetailsGridThree
