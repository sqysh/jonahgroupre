import { PublicSoldClient } from '@/app/components/pages/PublicSoldClient'
import { getAgentListings } from '@/app/lib/actions/repliers/getAgentListings'
import { Suspense } from 'react'

export default async function PublicSoldPage({
  searchParams
}: {
  searchParams: Promise<{ page: string }>
}) {
  const { page } = await searchParams
  const result = await getAgentListings({
    agentName: 'Eileen Jonah',
    status: 'U',
    page: page ? parseInt(page) : 1
  })

  return (
    <Suspense fallback={null}>
      <PublicSoldClient data={result} />
    </Suspense>
  )
}
