import { FC, useState } from 'react'
import Picture from '../common/Picture'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

interface ListingImageCarouselProps {
  images: any
}

const ListingImageCarousel: FC<ListingImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  if (!images || images.length === 0) {
    return (
      <div className="mb-16 w-full h-96 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark flex items-center justify-center">
        <span className="text-muted-light dark:text-muted-dark text-sm">No images available</span>
      </div>
    )
  }

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length)
  const previous = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)

  return (
    <>
      <div className="mb-16">
        {/* Main Image */}
        <div className="mb-4 relative overflow-hidden w-full bg-surface-light dark:bg-surface-dark aspect-video">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <Picture
                priority={true}
                src={`https://cdn.repliers.io/${images[currentIndex]}`}
                alt={`Property image ${currentIndex + 1}`}
                className="w-full h-full object-contain cursor-pointer"
                onClick={() => setIsFullscreen(true)}
              />
            </motion.div>
          </AnimatePresence>

          {/* Nav Buttons */}
          <div className="absolute inset-0 flex items-center justify-between p-3 sm:p-4 pointer-events-none">
            <button
              onClick={previous}
              className="pointer-events-auto w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-bg-light/90 dark:bg-bg-dark/90 hover:bg-bg-light dark:hover:bg-bg-dark shadow-lg transition-all hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-text-light dark:text-text-dark" />
            </button>
            <button
              onClick={next}
              className="pointer-events-auto w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-primary-light dark:bg-primary-dark hover:bg-button-light dark:hover:bg-button-dark shadow-lg transition-all hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white dark:text-bg-dark" />
            </button>
          </div>

          {/* Counter */}
          <div className="absolute top-3 right-3 bg-black/60 text-white px-3 py-1 text-xs sm:text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-1.5 sm:gap-2">
          {images.map((img: string, i: number) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              aria-label={`View image ${i + 1}`}
              aria-pressed={i === currentIndex}
              className={`aspect-square overflow-hidden transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light dark:focus-visible:ring-primary-dark ${
                i === currentIndex
                  ? 'ring-2 ring-primary-light dark:ring-primary-dark ring-offset-2 ring-offset-bg-light dark:ring-offset-bg-dark scale-105'
                  : 'opacity-50 hover:opacity-100'
              }`}
            >
              <Picture
                priority={true}
                src={`https://cdn.repliers.io/${img}`}
                alt={`Thumbnail ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
            onClick={() => setIsFullscreen(false)}
          >
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Close fullscreen"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
            <div className="absolute inset-0 flex items-center justify-between p-3 sm:p-4 z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  previous()
                }}
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  next()
                }}
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-primary-light dark:bg-primary-dark hover:bg-button-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white dark:text-bg-dark" />
              </button>
            </div>
            =
            <Picture
              priority
              src={`https://cdn.repliers.io/${images[currentIndex]}`}
              alt={`Property image ${currentIndex + 1}`}
              className="relative z-0 max-w-[90vw] max-h-[90vh] w-auto h-auto object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 text-sm z-10">
              {currentIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ListingImageCarousel
