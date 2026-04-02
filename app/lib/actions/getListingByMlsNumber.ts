'use server'

export interface RepliersListingResponse {
  mlsNumber: string
  resource: string
  status: string
  class: string
  type: string
  listPrice: number
  address: any
  details: any
  images: string[]
  agents: any[]
}

export async function getListingByMlsNumber(mlsNumber: string): Promise<any | null> {
  try {
    // Use query param, not path param, and include all statuses
    const response = await fetch(
      `https://api.repliers.io/listings?mlsNumber=${mlsNumber}&status=A&status=U`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'REPLIERS-API-KEY': process.env.REPLIERS_API_KEY || ''
        },
        cache: 'no-store'
      }
    )

    if (!response.ok) {
      return null
    }

    const data = await response.json()

    // Returns an array, get the first listing
    if (data.listings && data.listings.length > 0) {
      return data.listings[0]
    }

    return null
  } catch (error) {
    return null
  }
}
