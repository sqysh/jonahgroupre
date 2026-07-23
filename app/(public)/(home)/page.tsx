import { getAgentListings } from '../../lib/actions/repliers/getAgentListings'
import { getListings } from '../../lib/actions/repliers/getListings'
import HomeClient from './HomeClient'
import { Suspense } from 'react'

export const revalidate = 3600

export default async function HomePage() {
  // Get Eileen's active listings
  const agentListings = await getAgentListings({
    agentName: 'Eileen Jonah',
    status: 'A',
    page: 1
  })

  const allListings = await getListings({
    page: 1
  })

  return (
    <Suspense fallback={null}>
      <HomeClient agentListings={agentListings} allListings={allListings} />
    </Suspense>
  )
}
