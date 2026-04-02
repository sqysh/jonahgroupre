'use server'

interface GetListingsParams {
  page?: number
  resultsPerPage?: number
  status?: string // Keep for binary A/U filter
  standardStatus?: string // Add for Active/Pending/Closed
  class?: string
  minPrice?: number
  maxPrice?: number
  minBaths?: number
  maxBaths?: number
  minBedrooms?: number
  maxBedrooms?: number
  city?: string
  propertyType?: string
  minSqft?: number
  maxSqft?: number
  minAcres?: number
  maxAcres?: number
  sortBy?: string
  mlsNumber?: string
}

interface RepliersResponse {
  page: number
  numPages: number
  pageSize: number
  count: number
  listings: any[]
}

export async function getListings(
  params: GetListingsParams = {}
): Promise<RepliersResponse | null> {
  try {
    const { page = 1, resultsPerPage = 24, ...filters } = params

    const queryParams = new URLSearchParams()

    // Base params
    queryParams.append('standardStatus', filters.standardStatus || 'Active')
    queryParams.append('pageNum', page.toString())
    queryParams.append('resultsPerPage', resultsPerPage.toString())
    queryParams.append('type', 'Sale')

    // Add filters only if they have actual values
    Object.entries(filters).forEach(([key, value]) => {
      if (key === 'standardStatus' || key === 'city') return
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, String(value))
      }
    })

    // Handle city (string or array)
    if (Array.isArray(filters.city)) {
      filters.city.forEach((c) => queryParams.append('city', c))
    } else if (filters.city) {
      queryParams.append('city', filters.city)
    }

    const response = await fetch(`https://api.repliers.io/listings?${queryParams.toString()}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'REPLIERS-API-KEY': process.env.REPLIERS_API_KEY || ''
      },
      cache: 'no-store'
    })

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    return data
  } catch (error) {
    return null
  }
}
