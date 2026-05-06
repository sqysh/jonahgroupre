'use client'

import { FC, FormEvent, useEffect } from 'react'
import useForm from '@/app/lib/hooks/useForm'
import {
  ALL_TYPES_OPTIONS,
  BATHROOM_OPTIONS,
  BEDROOM_OPTIONS,
  MAX_PRICE_OPTIONS,
  MIN_PRICE_OPTIONS,
  STATUS_OPTIONS
} from '@/app/lib/constants/form-select-options'
import { ADVANCED_SEARCH_FIELDS } from '@/app/lib/constants/form-input-fields'
import { useRouter, useSearchParams } from 'next/navigation'
import { PropertySearchFormProps } from '@/app/lib/types/home-page-types'
import getPropertySearchFormStyles from '@/app/lib/utils/getPropertySearchFormStylts'
import cleanInputs from '@/app/lib/utils/cleanInputs'
import { Filter, Rotate3d, Search } from 'lucide-react'

const PropertySearchForm: FC<PropertySearchFormProps> = ({ type }) => {
  const router = useRouter()
  const { inputs, handleInput, handleSelect, setInputs } = useForm(ADVANCED_SEARCH_FIELDS)
  const searchParams = useSearchParams()
  const styles = getPropertySearchFormStyles(type)

  // Sync URL params with form inputs on mount and when URL changes
  useEffect(() => {
    const urlInputs: any = {}

    // Map Repliers API params back to form field names
    if (searchParams.get('class')) urlInputs.class = searchParams.get('class')
    if (searchParams.get('status')) urlInputs.status = searchParams.get('status')
    if (searchParams.get('numBedrooms'))
      urlInputs.numBedrooms = searchParams.get('numBedrooms') + '+'
    if (searchParams.get('numBathrooms'))
      urlInputs.numBathrooms = searchParams.get('numBathrooms') + '+'
    if (searchParams.get('minPrice')) urlInputs.minPrice = searchParams.get('minPrice')
    if (searchParams.get('maxPrice')) urlInputs.maxPrice = searchParams.get('maxPrice')
    if (searchParams.get('minSqft'))
      urlInputs.minSqft = parseInt(searchParams.get('minSqft') || '0')
    if (searchParams.get('maxSqft'))
      urlInputs.maxSqft = parseInt(searchParams.get('maxSqft') || '10000')
    if (searchParams.get('city')) urlInputs.city = searchParams.get('city')
    if (searchParams.get('mlsNumber')) urlInputs.mlsNumber = searchParams.get('mlsNumber')

    if (Object.keys(urlInputs).length > 0) {
      setInputs((prev: any) => ({ ...prev, ...urlInputs }))
    }
  }, [searchParams, setInputs])

  const handleSubmitPropertySearch = (e: FormEvent) => {
    e.preventDefault()
    const cleanedInputs = cleanInputs(inputs)

    if (Object.keys(cleanedInputs).length > 0) {
      // Map old field names to new Repliers API params
      const mappedInputs: Record<string, string> = {}

      if (cleanedInputs.class) mappedInputs.class = String(cleanedInputs.class)
      if (cleanedInputs.status) mappedInputs.standardStatus = cleanedInputs.status

      // CRITICAL: Strip the "+" before sending to API
      if (cleanedInputs.bedrooms) {
        mappedInputs.minBedrooms = String(cleanedInputs.bedrooms).replace('+', '')
      }
      if (cleanedInputs.totalBaths) {
        mappedInputs.minBaths = String(cleanedInputs.totalBaths).replace('+', '')
      }

      if (cleanedInputs.minPrice) mappedInputs.minPrice = String(cleanedInputs.minPrice)
      if (cleanedInputs.maxPrice) mappedInputs.maxPrice = String(cleanedInputs.maxPrice)
      if (cleanedInputs.minSqft) mappedInputs.minSqft = String(cleanedInputs.minSqft)
      if (cleanedInputs.maxSqft) mappedInputs.maxSqft = String(cleanedInputs.maxSqft)
      if (cleanedInputs.mlsNumber) mappedInputs.mlsNumber = String(cleanedInputs.mlsNumber)
      if (cleanedInputs.city) mappedInputs.city = String(cleanedInputs.city)

      const queryString = new URLSearchParams(mappedInputs).toString()
      router.push(`/listings?${queryString}`)
    }
  }

  const handleReset = (e: FormEvent) => {
    e.preventDefault()
    setInputs({})
    router.push('/listings')
  }

  return (
    <form onSubmit={handleSubmitPropertySearch}>
      <div className={styles.form}>
        <select
          name="class"
          onChange={handleSelect}
          value={(inputs.class as string) || ''}
          className={styles.inputs}
          aria-label="Property Type"
          tabIndex={0}
        >
          {ALL_TYPES_OPTIONS.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>

        <select
          name="status"
          onChange={handleSelect}
          value={(inputs.status as string) || ''}
          className={styles.inputs}
          aria-label="Property Status"
          tabIndex={0}
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>

        <select
          name="bedrooms"
          onChange={handleSelect}
          value={(inputs.bedrooms as string) || ''}
          className={styles.inputs}
          aria-label="Bedrooms"
          tabIndex={0}
        >
          {BEDROOM_OPTIONS.map((bedroom, index) => (
            <option key={bedroom} value={index === 0 ? '' : bedroom}>
              {bedroom}
            </option>
          ))}
        </select>

        <select
          name="totalBaths"
          onChange={handleSelect}
          value={(inputs.totalBaths as string) || ''}
          className={styles.inputs}
          aria-label="Bathrooms"
          tabIndex={0}
        >
          {BATHROOM_OPTIONS.map((bathroom, index) => (
            <option key={bathroom} value={index === 0 ? '' : bathroom}>
              {bathroom}
            </option>
          ))}
        </select>

        <div className={styles.minMaxContainer}>
          <select
            name="minPrice"
            onChange={handleSelect}
            value={(inputs.minPrice as string) || ''}
            className={`w-full ${styles.inputs}`}
            aria-label="Min Price"
            tabIndex={0}
          >
            {MIN_PRICE_OPTIONS.map((minPrice, index) => (
              <option key={minPrice} value={index === 0 ? '' : minPrice}>
                {minPrice}
              </option>
            ))}
          </select>
          <select
            name="maxPrice"
            onChange={handleSelect}
            value={(inputs.maxPrice as string) || ''}
            className={`w-full ${styles.inputs}`}
            aria-label="Max Price"
            tabIndex={0}
          >
            {MAX_PRICE_OPTIONS.map((maxPrice, index) => (
              <option key={maxPrice} value={index === 0 ? '' : maxPrice}>
                {maxPrice}
              </option>
            ))}
          </select>
        </div>

        <input
          name="mlsNumber"
          onChange={handleInput}
          value={(inputs.mlsNumber as string) || ''}
          className={styles.inputs}
          aria-label="MLS Number"
          placeholder="MLS Number"
        />

        <div className={`${styles.button} flex gap-x-2 items-center w-full justify-end`}>
          <button
            type="submit"
            className="gap-1.5 flex justify-center w-28 shrink-0 items-center py-2.5 bg-primary-light dark:bg-primary-dark border-2 border-primary-light dark:border-primary-dark group duration-200 hover:bg-transparent"
          >
            {type === 'listings' ? (
              <Filter className="text-sm text-white dark:text-bg-dark group-hover:text-primary-light dark:group-hover:text-primary-dark" />
            ) : (
              <Search className="text-sm text-white dark:text-bg-dark group-hover:text-primary-light dark:group-hover:text-primary-dark" />
            )}
          </button>
        </div>

        {type === 'listings' && (
          <button
            onClick={handleReset}
            type="button"
            className="bg-surface2-dark flex items-center justify-center gap-x-1 px-5 py-2.5 text-muted-dark text-center w-full hover:bg-border-dark transition-colors duration-200"
          >
            <Rotate3d className="w-3 h-3" />
            <span className="text-sm">Reset</span>
          </button>
        )}
      </div>
    </form>
  )
}

export default PropertySearchForm
