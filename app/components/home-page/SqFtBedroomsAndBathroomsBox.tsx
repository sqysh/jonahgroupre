import { FC } from 'react'
import { Bed, DraftingCompass, ShowerHead } from 'lucide-react'

interface SqFtBedroomsAndBathroomsBoxProps {
  sqFt: string
  bedrooms: number
  bathrooms: number
  iconColor?: string
}

const SqFtBedroomsAndBathroomsBox: FC<SqFtBedroomsAndBathroomsBoxProps> = ({
  sqFt,
  bedrooms,
  bathrooms,
  iconColor
}) => {
  return (
    <div className="flex items-start md:items-center justify-between gap-y-4 sm:gap-8 w-full flex-col sm:flex-row">
      <div className="flex items-center gap-2">
        <DraftingCompass
          className={`${iconColor ?? 'text-text-light dark:text-text-dark'} w-5 h-5`}
          aria-hidden="true"
        />
        <div className="flex flex-col">
          <p className="text-text-light dark:text-text-dark font-bold text-sm leading-4">
            {sqFt} SqFt
          </p>
          <p className="text-muted-light dark:text-muted-dark font-normal text-xs leading-4">
            Size
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Bed
          className={`${iconColor ?? 'text-text-light dark:text-text-dark'} w-5 h-5`}
          aria-hidden="true"
        />
        <div className="flex flex-col">
          <p className="text-text-light dark:text-text-dark font-bold leading-4 text-sm">
            {bedrooms}
          </p>
          <p className="text-muted-light dark:text-muted-dark font-normal leading-4 text-xs">
            Bedrooms
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <ShowerHead
          className={`${iconColor ?? 'text-text-light dark:text-text-dark'} w-5 h-5`}
          aria-hidden="true"
        />
        <div className="flex flex-col">
          <p className="text-text-light dark:text-text-dark font-bold leading-4 text-sm">
            {bathrooms}
          </p>
          <p className="text-muted-light dark:text-muted-dark font-normal leading-4 text-xs">
            Bathrooms
          </p>
        </div>
      </div>
    </div>
  )
}
export default SqFtBedroomsAndBathroomsBox
