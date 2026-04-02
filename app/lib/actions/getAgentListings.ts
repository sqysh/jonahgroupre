'use server'

const REPLIERS_API_KEY = process.env.REPLIERS_API_KEY!
const EILEEN_BOARD_AGENT_ID = 'C8000274'

export async function getAgentListings(params: {
  agentName?: string
  status: any
  page: any
  resultsPerPage?: any
  sortBy?: any
}) {
  try {
    const { page = 1, resultsPerPage = 24, status = 'A', sortBy = 'updatedOnDesc' } = params

    const queryParams = new URLSearchParams({
      status,
      boardAgentId: EILEEN_BOARD_AGENT_ID,
      pageNum: page.toString(),
      resultsPerPage: resultsPerPage.toString(),
      sortBy
    })

    const res = await fetch(`https://api.repliers.io/listings?${queryParams}`, {
      headers: {
        accept: 'application/json',
        'REPLIERS-API-KEY': REPLIERS_API_KEY
      },
      next: { revalidate: 3600 }
    })

    if (!res.ok) return null

    const data = await res.json()

    return {
      page: data.page,
      numPages: data.numPages,
      pageSize: data.pageSize,
      count: data.count,
      listings: data.listings ?? []
    }
  } catch {
    return null
  }
}
