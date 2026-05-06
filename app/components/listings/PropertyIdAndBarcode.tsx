import { Barcode } from 'lucide-react'

const PropertyIdAndBarcode = ({ id }: { id: string | undefined }) => {
  return (
    <div className="flex items-center gap-2">
      <Barcode className="text-primary-light dark:text-primary-dark w-5 h-5" aria-hidden="true" />
      <div className="flex flex-col">
        <p className="text-text-light dark:text-text-dark font-bold text-sm leading-4">{id}</p>
        <p className="text-muted-light dark:text-muted-dark font-normal text-xs leading-4 whitespace-nowrap">
          Property Id
        </p>
      </div>
    </div>
  )
}

export default PropertyIdAndBarcode
