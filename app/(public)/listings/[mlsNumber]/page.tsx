import { getListingByMlsNumber } from '@/app/lib/actions/repliers/getListingByMlsNumber'
import ListingDetailsClient from '@/app/components/pages/ListingDetailsClient'

export default async function ListingDetailsPage({
  params
}: {
  params: Promise<{ mlsNumber: string }>
}) {
  const { mlsNumber } = await params
  const listing = await getListingByMlsNumber(mlsNumber)
  return <ListingDetailsClient listing={listing} />
}
