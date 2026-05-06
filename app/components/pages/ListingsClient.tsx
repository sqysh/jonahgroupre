'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import ListingsPropertyCard from '../listings/ListingsPropertyCard'
import { RepliersListing } from '@/app/lib/types/repliers'
import { useState } from 'react'
import { ChevronDown, Filter, Rotate3d } from 'lucide-react'
import { MA_COUNTIES } from '@/app/(public)/listings/page'

interface ListingsClientProps {
  data: {
    page: number
    numPages: number
    pageSize: number
    count: number
    listings: RepliersListing[]
  }
}

export default function ListingsClient({ data }: ListingsClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [filtersOpen, setFiltersOpen] = useState(false)

  const handlePageChange = (newPage: number) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    current.set('page', newPage.toString())
    router.push(`/listings?${current.toString()}`)
    router.refresh()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleFilterChange = (key: string, value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    if (value) {
      current.set(key, value)
    } else {
      current.delete(key)
    }
    current.set('page', '1')
    router.push(`/listings?${current.toString()}`)
    router.refresh()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const selectClass = `w-full px-3 py-2.5 border border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark text-sm focus:border-primary-light dark:focus:border-primary-dark focus:outline-none transition-colors duration-200 appearance-none`
  const labelClass = `block text-xs uppercase font-semibold text-muted-light dark:text-muted-dark mb-1.5`

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark">
      {/* Header */}
      <div className="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark">
        <div className="max-w-300 mx-auto px-4 sm:px-6 py-8">
          <h1 className="text-2xl sm:text-3xl font-bold uppercase text-text-light dark:text-text-dark mb-1">
            Property Listings
          </h1>
          <div
            className="w-10 h-1 bg-primary-light dark:bg-primary-dark mt-3 mb-4"
            aria-hidden="true"
          />
          <p className="text-sm text-muted-light dark:text-muted-dark">
            Showing {data.listings.length} of {data.count.toLocaleString()} properties
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark">
        <div className="max-w-300 mx-auto px-4 sm:px-6 py-4">
          {/* Mobile Toggle */}
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            aria-expanded={filtersOpen}
            aria-controls="filters-panel"
            className="lg:hidden w-full flex items-center justify-between px-4 py-3 bg-primary-light dark:bg-primary-dark text-white dark:text-bg-dark font-semibold text-sm uppercase mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark"
          >
            <span className="flex items-center gap-2">
              <Filter className="w-4 h-4" aria-hidden="true" />
              Filter Properties
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${filtersOpen ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </button>

          {/* Filter Grid */}
          <div id="filters-panel" className={`${filtersOpen ? 'block' : 'hidden'} lg:block`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* County */}
              <div>
                <label htmlFor="county" className={labelClass}>
                  County
                </label>
                <select
                  id="county"
                  defaultValue={searchParams.get('county') || ''}
                  onChange={(e) => handleFilterChange('county', e.target.value)}
                  className={selectClass}
                  aria-label="Filter by county"
                >
                  <option value="">All Counties</option>
                  {Object.keys(MA_COUNTIES)
                    .sort()
                    .map((county) => (
                      <option key={county} value={county}>
                        {county} County
                      </option>
                    ))}
                </select>
              </div>

              {/* City */}
              <div>
                <label htmlFor="city" className={labelClass}>
                  City
                </label>
                <select
                  id="city"
                  defaultValue={searchParams.get('city') || ''}
                  onChange={(e) => handleFilterChange('city', e.target.value)}
                  className={selectClass}
                  aria-label="Filter by city"
                >
                  <option value="">All Cities</option>
                  <option value="Boston">Boston</option>
                  <option value="Cambridge">Cambridge</option>
                  <option value="Somerville">Somerville</option>
                  <option value="Brookline">Brookline</option>
                  <option value="Newton">Newton</option>
                  <option value="Quincy">Quincy</option>
                  <option value="Lynn">Lynn</option>
                  <option value="Salem">Salem</option>
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label htmlFor="priceRange" className={labelClass}>
                  Price Range
                </label>
                <select
                  id="priceRange"
                  defaultValue={searchParams.get('priceRange') || ''}
                  onChange={(e) => {
                    const [min, max] = e.target.value.split('-')
                    const current = new URLSearchParams(Array.from(searchParams.entries()))
                    if (min && max) {
                      current.set('minPrice', min)
                      current.set('maxPrice', max)
                    } else {
                      current.delete('minPrice')
                      current.delete('maxPrice')
                    }
                    current.set('page', '1')
                    router.push(`/listings?${current.toString()}`)
                  }}
                  className={selectClass}
                  aria-label="Filter by price range"
                >
                  <option value="">Any Price</option>
                  <option value="0-250000">Under $250K</option>
                  <option value="250000-500000">$250K – $500K</option>
                  <option value="500000-750000">$500K – $750K</option>
                  <option value="750000-1000000">$750K – $1M</option>
                  <option value="1000000-1500000">$1M – $1.5M</option>
                  <option value="1500000-2000000">$1.5M – $2M</option>
                  <option value="2000000-99999999">$2M+</option>
                </select>
              </div>

              {/* Bedrooms */}
              <div>
                <label htmlFor="minBedrooms" className={labelClass}>
                  Bedrooms
                </label>
                <select
                  id="minBedrooms"
                  defaultValue={searchParams.get('minBedrooms') || ''}
                  onChange={(e) => handleFilterChange('minBedrooms', e.target.value)}
                  className={selectClass}
                  aria-label="Filter by bedrooms"
                >
                  <option value="">Any Beds</option>
                  <option value="1">1+ Beds</option>
                  <option value="2">2+ Beds</option>
                  <option value="3">3+ Beds</option>
                  <option value="4">4+ Beds</option>
                  <option value="5">5+ Beds</option>
                </select>
              </div>

              {/* Bathrooms */}
              <div>
                <label htmlFor="minBaths" className={labelClass}>
                  Bathrooms
                </label>
                <select
                  id="minBaths"
                  defaultValue={searchParams.get('minBaths') || ''}
                  onChange={(e) => handleFilterChange('minBaths', e.target.value)}
                  className={selectClass}
                  aria-label="Filter by bathrooms"
                >
                  <option value="">Any Baths</option>
                  <option value="1">1+ Baths</option>
                  <option value="2">2+ Baths</option>
                  <option value="3">3+ Baths</option>
                  <option value="4">4+ Baths</option>
                </select>
              </div>

              {/* Property Type */}
              <div>
                <label htmlFor="class" className={labelClass}>
                  Property Type
                </label>
                <select
                  id="class"
                  value={searchParams.get('class') || ''}
                  onChange={(e) => handleFilterChange('class', e.target.value)}
                  className={selectClass}
                  aria-label="Filter by property type"
                >
                  <option value="">All Types</option>
                  <option value="ResidentialProperty">Residential</option>
                  <option value="CondoProperty">Condo</option>
                  <option value="CommercialProperty">Commercial</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label htmlFor="standardStatus" className={labelClass}>
                  Status
                </label>
                <select
                  id="standardStatus"
                  value={searchParams.get('standardStatus') || 'Active'}
                  onChange={(e) => handleFilterChange('standardStatus', e.target.value)}
                  className={selectClass}
                  aria-label="Filter by status"
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Closed">Sold / Closed</option>
                </select>
              </div>

              {/* Clear */}
              <div className="flex items-end">
                <button
                  onClick={() => {
                    router.push('/listings')
                    setFiltersOpen(false)
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark text-muted-light dark:text-muted-dark text-sm font-semibold uppercase hover:border-primary-light dark:hover:border-primary-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark"
                >
                  <Rotate3d className="w-3.5 h-3.5" aria-hidden="true" />
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="max-w-300 mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {data.listings.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-light dark:text-muted-dark text-base mb-4">
              No properties found matching your criteria.
            </p>
            <button
              onClick={() => router.push('/listings')}
              className="text-sm font-semibold uppercase text-primary-light dark:text-primary-dark hover:underline focus-visible:outline-none focus-visible:underline"
            >
              Clear filters and try again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {data?.listings?.map((listing, index) => (
              <ListingsPropertyCard key={listing.mlsNumber} property={listing} index={index} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {data.numPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              onClick={() => handlePageChange(data.page - 1)}
              disabled={data.page === 1}
              aria-label="Previous page"
              className="px-5 py-2.5 border border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark text-sm font-semibold uppercase hover:border-primary-light dark:hover:border-primary-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark"
            >
              Previous
            </button>

            <div className="px-5 py-2.5 bg-primary-light dark:bg-primary-dark text-white dark:text-bg-dark text-sm font-bold">
              {data.page} / {data.numPages.toLocaleString()}
            </div>

            <button
              onClick={() => handlePageChange(data.page + 1)}
              disabled={data.page === data.numPages}
              aria-label="Next page"
              className="px-5 py-2.5 border border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark text-sm font-semibold uppercase hover:border-primary-light dark:hover:border-primary-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
