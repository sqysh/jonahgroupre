import { FC } from 'react'
import { PropertyCardBottomBoxProps } from '@/app/lib/types/home-page-types'
import { Bed, DraftingCompass, ShowerHead } from 'lucide-react'

const PropertyCardBottomBox: FC<PropertyCardBottomBoxProps> = ({
  index,
  sqFt,
  bedrooms,
  bathrooms
}) => {
  return (
    <div
      className={`${
        index % 2 === 0
          ? 'bg-primary-light dark:bg-primary-dark text-white dark:text-bg-dark'
          : 'bg-card-alt-light dark:bg-card-alt-dark text-white'
      } mt-auto h-8 w-full flex items-center justify-between px-3 text-xs`}
    >
      <div className="flex items-center gap-2">
        <DraftingCompass className="w-4 h-4" />
        <p className="font-bold leading-4">{sqFt} SqFt</p>
      </div>
      <div className="flex items-center gap-2">
        <Bed className="w-4 h-4" />
        <p className="font-bold leading-4">{bedrooms || 0}</p>
      </div>
      <div className="flex items-center gap-2 pr-6">
        <ShowerHead className="w-4 h-4" />
        <p className="font-bold leading-4">{bathrooms || 0}</p>
      </div>
    </div>
  )
}

export default PropertyCardBottomBox
