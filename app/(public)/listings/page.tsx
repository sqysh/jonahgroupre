import { getListings } from '@/app/lib/actions/getListings'
import ListingsClient from '@/app/components/pages/ListingsClient'
import { Suspense } from 'react'

interface SearchParams {
  page?: string
  class?: string
  city?: any
  minPrice?: string
  maxPrice?: string
  minBedrooms?: string
  maxBedrooms?: string
  minBaths?: string
  maxBaths?: string
  propertyType?: string
  status?: string
  standardStatus?: string
  minSqft?: string
  maxSqft?: string
  mlsNumber?: string
  essexOnly?: string
  county?: string
}

// constants/counties.ts
export const MA_COUNTIES: Record<string, string[]> = {
  Barnstable: [
    'Barnstable',
    'Bourne',
    'Brewster',
    'Chatham',
    'Dennis',
    'Eastham',
    'Falmouth',
    'Harwich',
    'Mashpee',
    'Orleans',
    'Provincetown',
    'Sandwich',
    'Truro',
    'Wellfleet',
    'Yarmouth'
  ],
  Berkshire: [
    'Adams',
    'Alford',
    'Becket',
    'Cheshire',
    'Clarksburg',
    'Dalton',
    'Egremont',
    'Florida',
    'Great Barrington',
    'Hancock',
    'Hinsdale',
    'Lanesborough',
    'Lee',
    'Lenox',
    'Monterey',
    'Mount Washington',
    'New Ashford',
    'New Marlborough',
    'North Adams',
    'Otis',
    'Peru',
    'Pittsfield',
    'Richmond',
    'Sandisfield',
    'Savoy',
    'Sheffield',
    'Stockbridge',
    'Tyringham',
    'Washington',
    'West Stockbridge',
    'Williamstown',
    'Windsor'
  ],
  Bristol: [
    'Acushnet',
    'Attleboro',
    'Berkley',
    'Dartmouth',
    'Dighton',
    'Easton',
    'Fairhaven',
    'Fall River',
    'Freetown',
    'Mansfield',
    'New Bedford',
    'North Attleborough',
    'Norton',
    'Raynham',
    'Rehoboth',
    'Seekonk',
    'Somerset',
    'Swansea',
    'Taunton',
    'Westport'
  ],
  Dukes: ['Aquinnah', 'Chilmark', 'Edgartown', 'Gosnold', 'Oak Bluffs', 'Tisbury', 'West Tisbury'],
  Essex: [
    'Amesbury',
    'Andover',
    'Beverly',
    'Boxford',
    'Danvers',
    'Essex',
    'Georgetown',
    'Gloucester',
    'Groveland',
    'Hamilton',
    'Haverhill',
    'Ipswich',
    'Lawrence',
    'Lynn',
    'Lynnfield',
    'Manchester',
    'Marblehead',
    'Merrimac',
    'Methuen',
    'Middleton',
    'Nahant',
    'Newbury',
    'Newburyport',
    'North Andover',
    'Peabody',
    'Rockport',
    'Rowley',
    'Salem',
    'Salisbury',
    'Saugus',
    'Swampscott',
    'Topsfield',
    'Wenham',
    'West Newbury'
  ],
  Franklin: [
    'Ashfield',
    'Bernardston',
    'Buckland',
    'Charlemont',
    'Colrain',
    'Conway',
    'Deerfield',
    'Erving',
    'Gill',
    'Greenfield',
    'Hawley',
    'Heath',
    'Leverett',
    'Leyden',
    'Monroe',
    'Montague',
    'New Salem',
    'Northfield',
    'Orange',
    'Rowe',
    'Shelburne',
    'Shutesbury',
    'Sunderland',
    'Warwick',
    'Wendell',
    'Whately'
  ],
  Hampden: [
    'Agawam',
    'Blandford',
    'Brimfield',
    'Chester',
    'Chicopee',
    'East Longmeadow',
    'Granville',
    'Hampden',
    'Holland',
    'Holyoke',
    'Longmeadow',
    'Ludlow',
    'Monson',
    'Montgomery',
    'Palmer',
    'Russell',
    'Southwick',
    'Springfield',
    'Tolland',
    'Wales',
    'Westfield',
    'West Springfield',
    'Wilbraham'
  ],
  Hampshire: [
    'Amherst',
    'Belchertown',
    'Chesterfield',
    'Cummington',
    'Easthampton',
    'Goshen',
    'Granby',
    'Hadley',
    'Hatfield',
    'Huntington',
    'Middlefield',
    'Northampton',
    'Pelham',
    'Plainfield',
    'South Hadley',
    'Southampton',
    'Ware',
    'Westhampton',
    'Williamsburg',
    'Worthington'
  ],
  Middlesex: [
    'Acton',
    'Arlington',
    'Ashby',
    'Ashland',
    'Ayer',
    'Bedford',
    'Belmont',
    'Billerica',
    'Boxborough',
    'Burlington',
    'Cambridge',
    'Carlisle',
    'Chelmsford',
    'Concord',
    'Dracut'
  ]
}

export default async function ListingsPage({
  searchParams
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const countyFilter = params.county
  const cityList = countyFilter ? MA_COUNTIES[countyFilter] : undefined

  const data = await getListings({
    page: params.page ? parseInt(params.page) : 1,
    class: params.class,
    city: cityList || params.city || undefined,
    minPrice: params.minPrice ? parseInt(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? parseInt(params.maxPrice) : undefined,
    minBedrooms: params.minBedrooms ? parseInt(params.minBedrooms) : undefined,
    maxBedrooms: params.maxBedrooms ? parseInt(params.maxBedrooms) : undefined,
    minBaths: params.minBaths ? parseInt(params.minBaths) : undefined,
    maxBaths: params.maxBaths ? parseInt(params.maxBaths) : undefined,
    minSqft: params.minSqft ? parseInt(params.minSqft) : undefined,
    maxSqft: params.maxSqft ? parseInt(params.maxSqft) : undefined,
    propertyType: params.propertyType,
    standardStatus: params.standardStatus || 'Active',
    mlsNumber: params.mlsNumber
  })

  if (!data) {
    return (
      <div className="py-16 flex items-center justify-center">
        <p className="text-gray-500">Error loading listings. Please try again.</p>
      </div>
    )
  }

  return (
    <Suspense fallback={null}>
      <ListingsClient data={data} />
    </Suspense>
  )
}
