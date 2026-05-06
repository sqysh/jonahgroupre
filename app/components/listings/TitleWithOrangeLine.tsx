import { FC } from 'react'

interface TitleWithOrangeLineProps {
  section: string
  mb?: string
}

const TitleWithOrangeLine: FC<TitleWithOrangeLineProps> = ({ section, mb }) => {
  return (
    <div className={`flex items-center gap-x-4 ${mb ?? 'mb-7'}`}>
      <h3 className="text-2xl font-bold text-text-light dark:text-text-dark">{section}</h3>
      <div className="w-7 h-1 bg-primary-light dark:bg-primary-dark" aria-hidden="true" />
    </div>
  )
}

export default TitleWithOrangeLine
