'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, MapPin, ChevronRight, Loader2 } from 'lucide-react'
import { RepliersListing } from '@/app/lib/types/repliers.types'
import { searchListings } from '@/app/lib/actions/repliers/searchListings'
import Picture from '../common/Picture'
import { getListingImageUrl } from '@/app/lib/utils/repliers.utils'

interface PropertySearchModalProps {
  isOpen: boolean
  onClose: () => void
}

// helpers unchanged
function formatAddress(listing: RepliersListing): string {
  const { streetNumber, streetName, streetSuffix, unitNumber } = listing.address
  const parts = [streetNumber, streetName, streetSuffix].filter(Boolean).join(' ')
  return unitNumber ? `${parts} #${unitNumber}` : parts
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(price)
}

export default function PropertySearchModal({ isOpen, onClose }: PropertySearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<RepliersListing[]>([])
  const [loading, setLoading] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const router = useRouter()

  // Debounced search
  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setQuery(val)
    setActiveIndex(0)

    if (debounceRef.current) clearTimeout(debounceRef.current)

    if (val.trim().length < 2) {
      setResults([])
      setLoading(false)
      return
    }

    setLoading(true)
    debounceRef.current = setTimeout(async () => {
      const data = await searchListings(val)
      setResults(data)
      setLoading(false)
    }, 300)
  }

  const handleSelect = useCallback(
    (listing: RepliersListing) => {
      router.push(`/listings/${listing.mlsNumber}`)
      onClose()
      setTimeout(() => {
        setQuery('')
        setResults([])
        setActiveIndex(0)
      }, 0)
    },
    [router, onClose]
  )

  // Focus + reset on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
        setQuery('')
        setResults([])
        setActiveIndex(0)
      }, 0)
    }
  }, [isOpen])

  // Keyboard nav
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (results.length === 0) return
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex((i) => Math.min(i + 1, results.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex((i) => Math.max(i - 1, 0))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        handleSelect(results[activeIndex])
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, results, activeIndex, handleSelect, onClose])

  // Scroll active into view
  useEffect(() => {
    const el = listRef.current?.children[activeIndex] as HTMLElement | undefined
    el?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex])

  const showResults = query.trim().length >= 2

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-100 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            key="modal"
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-101 w-full max-w-2xl px-4"
          >
            <div className="bg-navbar-light dark:bg-navbar-dark border border-border-light dark:border-border-dark shadow-2xl overflow-hidden">
              {/* Input */}
              <div className="flex items-center gap-3 px-4 h-14 border-b border-border-light dark:border-border-dark">
                {loading ? (
                  <Loader2 className="w-4 h-4 text-primary-light dark:text-primary-dark shrink-0 animate-spin" />
                ) : (
                  <Search className="w-4 h-4 text-muted-light dark:text-muted-dark shrink-0" />
                )}
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={handleQuery}
                  placeholder="Search by address or city..."
                  className="flex-1 bg-transparent text-sm text-text-light dark:text-text-dark placeholder:text-muted-light dark:placeholder:text-muted-dark outline-none"
                />
                <div className="flex items-center gap-2 shrink-0">
                  {query && (
                    <button
                      onClick={() => {
                        setQuery('')
                        setResults([])
                      }}
                    >
                      <X className="w-4 h-4 text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark transition-colors" />
                    </button>
                  )}
                  <kbd className="hidden sm:flex items-center px-1.5 py-0.5 text-[10px] font-mono text-muted-light dark:text-muted-dark border border-border-light dark:border-border-dark">
                    ESC
                  </kbd>
                </div>
              </div>

              {/* Results */}
              <AnimatePresence mode="wait">
                {showResults && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                  >
                    {results.length > 0 ? (
                      <ul
                        ref={listRef}
                        className="max-h-105 overflow-y-auto divide-y divide-border-light dark:divide-border-dark"
                      >
                        {results.map((listing, i) => (
                          <li key={listing.mlsNumber}>
                            <button
                              className={`w-full flex items-center gap-4 px-4 py-3 text-left transition-colors duration-100 ${i === activeIndex ? 'bg-surface-light dark:bg-surface-dark' : 'hover:bg-surface-light dark:hover:bg-surface-dark'}`}
                              onMouseEnter={() => setActiveIndex(i)}
                              onClick={() => handleSelect(listing)}
                            >
                              <div className="w-16 h-12 shrink-0 overflow-hidden bg-surface2-light dark:bg-surface2-dark">
                                {listing.images[0] ? (
                                  <Picture
                                    priority
                                    src={getListingImageUrl(listing.images[0])}
                                    alt={formatAddress(listing)}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <MapPin className="w-4 h-4 text-muted-light dark:text-muted-dark" />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-text-light dark:text-text-dark truncate">
                                  {formatAddress(listing)}
                                </p>
                                <p className="text-xs text-muted-light dark:text-muted-dark truncate">
                                  {listing.address.city}, {listing.address.state} · MLS#{' '}
                                  {listing.mlsNumber}
                                </p>
                              </div>
                              <div className="shrink-0 text-right">
                                <p className="text-sm font-bold text-primary-light dark:text-primary-dark">
                                  {formatPrice(listing.listPrice)}
                                </p>
                                {listing.details.numBedrooms && (
                                  <p className="text-11 text-muted-light dark:text-muted-dark">
                                    {listing.details.numBedrooms}bd
                                    {listing.details.numBathrooms
                                      ? ` · ${listing.details.numBathrooms}ba`
                                      : ''}
                                  </p>
                                )}
                              </div>
                              <ChevronRight
                                className={`w-4 h-4 shrink-0 transition-colors ${i === activeIndex ? 'text-primary-light dark:text-primary-dark' : 'text-border-light dark:text-border-dark'}`}
                              />
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : !loading ? (
                      <div className="px-4 py-10 text-center">
                        <p className="text-sm text-muted-light dark:text-muted-dark">
                          No properties found for &ldquo;{query}&rdquo;
                        </p>
                      </div>
                    ) : null}

                    <div className="flex items-center gap-4 px-4 py-2 border-t border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
                      <span className="flex items-center gap-1.5 text-[10px] font-mono text-muted-light dark:text-muted-dark">
                        <kbd className="px-1 border border-border-light dark:border-border-dark">
                          ↑↓
                        </kbd>
                        navigate
                      </span>
                      <span className="flex items-center gap-1.5 text-[10px] font-mono text-muted-light dark:text-muted-dark">
                        <kbd className="px-1 border border-border-light dark:border-border-dark">
                          ↵
                        </kbd>
                        open
                      </span>
                      <span className="flex items-center gap-1.5 text-[10px] font-mono text-muted-light dark:text-muted-dark">
                        <kbd className="px-1 border border-border-light dark:border-border-dark">
                          ESC
                        </kbd>
                        close
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {!showResults && (
                <div className="px-4 py-8 text-center">
                  <p className="text-xs font-mono text-muted-light dark:text-muted-dark tracking-widest uppercase">
                    Search all MA listings
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
