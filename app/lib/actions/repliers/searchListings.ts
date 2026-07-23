'use server'

import { RepliersListing } from '../../types/repliers.types'

export async function searchListings(query: string): Promise<RepliersListing[]> {
  if (!query || query.trim().length < 2) return []

  try {
    const params = new URLSearchParams({
      search: query.trim(),
      searchFields: 'address.streetNumber,address.streetName,address.city',
      standardStatus: 'Active',
      resultsPerPage: '8',
      pageNum: '1',
      type: 'Sale'
    })

    const response = await fetch(`https://api.repliers.io/listings?${params.toString()}`, {
      headers: {
        accept: 'application/json',
        'REPLIERS-API-KEY': process.env.REPLIERS_API_KEY || ''
      },
      cache: 'no-store'
    })

    if (!response.ok) return []
    const data = await response.json()
    return data.listings ?? []
  } catch {
    return []
  }
}
