'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import ListingsPropertyCard from '../listings/ListingsPropertyCard'
import { RepliersListing } from '@/app/lib/types/repliers.types'

export function PublicSoldClient({ data }: any) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handlePageChange = (newPage: number) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    current.set('page', newPage.toString())
    router.push(`/sold?${current.toString()}`)
    router.refresh()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-dvh bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sold Properties</h1>
          <p className="text-gray-600">
            Showing {data.listings.length} of {data.count.toLocaleString()} properties
          </p>
        </div>
      </div>
      {/* Listings Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {data.listings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No properties found matching your criteria.</p>
            <button
              onClick={() => router.push('/sold')}
              className="mt-4 text-orange-500 hover:text-orange-600 font-medium"
            >
              Clear filters and try again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {data?.listings?.map((listing: RepliersListing, index: number) => (
              <ListingsPropertyCard key={listing.mlsNumber} property={listing} index={index} />
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="mt-12 flex items-center justify-center gap-2">
          <button
            onClick={() => handlePageChange(data.page - 1)}
            disabled={data.page === 1}
            className="px-6 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 text-gray-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          <div className="px-6 py-3 bg-orange-500 text-white rounded-lg font-medium">
            Page {data.page} of {data.numPages.toLocaleString()}
          </div>

          <button
            onClick={() => handlePageChange(data.page + 1)}
            disabled={data.page === data.numPages}
            className="px-6 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 text-gray-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
