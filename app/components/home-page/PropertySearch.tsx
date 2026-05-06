import PropertySearchForm from '@/app/components/forms/PropertySearchForm'

const PropertySearch = () => {
  return (
    <div className="bg-surface-dark w-full overflow-hidden">
      <div className="max-w-300 w-full mx-auto grid grid-cols-12">
        <div className="col-span-12 md:col-span-3 py-12 flex flex-col items-center xl:items-start sm:pt-28">
          <h1 className="text-4xl lg:text-5xl text-text-dark uppercase font-bold text-center md:text-left">
            <div className="text-center sm:text-lg md:text-left font-normal">Discover Your</div>
            <span className="text-primary-dark">E</span>pic <br />
            <span className="text-primary-dark">J</span>ourney
          </h1>
        </div>
        <div
          className={`col-span-12 md:col-span-9 bg-surface2-dark relative px-3 pt-1.5 pb-5
          after:absolute after:content-[''] after:z-0 
          after:w-[1000%] after:bg-surface2-dark
          after:left-0 after:bottom-0 after:top-0 flex items-center
        `}
        >
          <div className="relative z-10 w-full">
            <PropertySearchForm type="home" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertySearch
