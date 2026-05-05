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
      <div className="mb-16 w-full h-96 bg-gray-200 flex items-center justify-center">
        <span className="text-gray-400">No images available</span>
      </div>
    )
  }

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const previous = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <>
      <div className="mb-16">
        {/* Main Image */}
        <div className="mb-4 relative overflow-hidden w-full bg-gray-100 aspect-video rounded-lg">
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

          {/* Navigation Buttons */}
          <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
            <button
              onClick={previous}
              className="pointer-events-auto w-12 h-12 flex items-center justify-center bg-white/90 hover:bg-white shadow-lg rounded-full transition-all hover:scale-110"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button
              onClick={next}
              className="pointer-events-auto w-12 h-12 flex items-center justify-center bg-orange-500 hover:bg-orange-600 shadow-lg rounded-full transition-all hover:scale-110"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Image Counter */}
          <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
          {images.map((img: string, i: number) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`aspect-square overflow-hidden rounded-lg transition-all ${
                i === currentIndex
                  ? 'ring-2 ring-orange-500 ring-offset-2 scale-105'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <Picture
                priority={false}
                src={`https://cdn.repliers.io/${img}`}
                alt={`Thumbnail ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

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
              className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
              aria-label="Close fullscreen"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <div className="absolute inset-0 flex items-center justify-between p-4">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  previous()
                }}
                className="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  next()
                }}
                className="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>

            <Picture
              priority
              src={`https://cdn.repliers.io/${images[currentIndex]}`}
              alt={`Property image ${currentIndex + 1}`}
              className="max-w-[90%] max-h-[90%] object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ListingImageCarousel
