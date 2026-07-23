'use client'

import { motion } from 'framer-motion'
import { MapPin, Bed, Bath, Square } from 'lucide-react'

// ── Hero Skeleton ─────────────────────────────────────────────────────────────
const HomeHeroSkeleton = () => (
  <div className="relative w-full h-105 xs:h-120 sm:h-125 bg-zinc-900 overflow-hidden">
    {/* Simulated video shimmer */}
    <div className="absolute inset-0 bg-linear-to-br from-zinc-800 via-zinc-900 to-zinc-800 animate-pulse" />
    <div className="absolute inset-0 bg-black/50" />

    <div className="absolute inset-0 z-10 flex flex-col justify-center px-3 sm:px-4">
      <div className="max-w-300 mx-auto w-full flex flex-col gap-2">
        {/* Top content box */}
        <div className="bg-black/60 px-4 py-3 sm:px-6 sm:py-4 w-full sm:w-fit">
          {/* Mobile title */}
          <div className="h-6 w-36 bg-white/10 animate-pulse mb-3 sm:hidden" />
          {/* Desktop title */}
          <div className="h-9 w-80 bg-white/10 animate-pulse mb-4 hidden sm:block" />

          <div className="flex flex-col gap-y-2 md:flex-row md:items-end md:justify-between md:gap-0">
            {/* Price + badge */}
            <div className="flex items-center gap-2">
              <div className="h-7 w-28 bg-white/10 animate-pulse" />
              <div className="h-5 w-16 bg-primary-light/30 animate-pulse" />
            </div>
            {/* Address */}
            <div className="flex items-center gap-2">
              <MapPin className="text-primary-dark w-3 h-3 shrink-0 opacity-40" />
              <div className="h-4 w-48 bg-white/10 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Bottom content box */}
        <div className="bg-white/20 px-4 py-2.5 sm:px-6 sm:py-3 w-full md:w-fit">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Square className="w-4 h-4 text-zinc-400" />
              <div className="h-4 w-16 bg-white/20 animate-pulse" />
            </div>
            <div className="flex items-center gap-1.5">
              <Bed className="w-4 h-4 text-zinc-400" />
              <div className="h-4 w-10 bg-white/20 animate-pulse" />
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-zinc-400" />
              <div className="h-4 w-10 bg-white/20 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

// ── Property Search Skeleton ───────────────────────────────────────────────────
const PropertySearchSkeleton = () => (
  <div className="bg-surface-dark w-full overflow-hidden">
    <div className="max-w-300 w-full mx-auto grid grid-cols-12">
      {/* Left — heading */}
      <div className="col-span-12 md:col-span-3 py-12 flex flex-col items-center xl:items-start sm:pt-28">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="h-4 w-24 bg-white/10 animate-pulse" />
          <div className="h-10 w-40 bg-white/15 animate-pulse" />
          <div className="h-10 w-32 bg-white/15 animate-pulse" />
        </div>
      </div>

      {/* Right — form */}
      <div
        className="col-span-12 md:col-span-9 bg-surface2-dark relative px-3 pt-1.5 pb-5 flex items-center
        after:absolute after:content-[''] after:z-0 after:w-[1000%] after:bg-surface2-dark after:left-0 after:bottom-0 after:top-0"
      >
        <div className="relative z-10 w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 py-8">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-1.5">
              <div className="h-3 w-16 bg-white/10 animate-pulse" />
              <div className="h-10 w-full bg-white/10 animate-pulse" />
            </div>
          ))}
          <div className="flex items-end">
            <div className="h-10 w-full bg-primary-light/20 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  </div>
)

// ── Listing Card Skeleton ─────────────────────────────────────────────────────
const ListingCardSkeleton = () => (
  <div className="flex flex-col border border-border-light dark:border-border-dark overflow-hidden">
    <div className="w-full aspect-4/3 bg-surface2-light dark:bg-surface2-dark animate-pulse" />
    <div className="p-3 flex flex-col gap-2">
      <div className="h-5 w-24 bg-surface2-light dark:bg-surface2-dark animate-pulse" />
      <div className="h-4 w-40 bg-surface2-light dark:bg-surface2-dark animate-pulse" />
      <div className="h-3 w-32 bg-surface2-light dark:bg-surface2-dark animate-pulse" />
      <div className="flex gap-3 mt-1">
        <div className="h-3 w-12 bg-surface2-light dark:bg-surface2-dark animate-pulse" />
        <div className="h-3 w-12 bg-surface2-light dark:bg-surface2-dark animate-pulse" />
        <div className="h-3 w-16 bg-surface2-light dark:bg-surface2-dark animate-pulse" />
      </div>
    </div>
  </div>
)

// ── Find A Property Skeleton ──────────────────────────────────────────────────
const FindAPropertySkeleton = () => (
  <div className="w-full py-12 px-3 sm:px-4">
    <div className="max-w-300 mx-auto">
      {/* Section header */}
      <div className="flex items-center justify-between mb-8">
        <div className="h-8 w-48 bg-surface2-light dark:bg-surface2-dark animate-pulse" />
        <div className="h-4 w-24 bg-surface2-light dark:bg-surface2-dark animate-pulse" />
      </div>
      {/* Grid */}
      <div className="grid grid-cols-1 xxs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ListingCardSkeleton key={i} />
        ))}
      </div>
    </div>
  </div>
)

// ── Composed Home Skeleton ────────────────────────────────────────────────────
export default function HomeSkeleton() {
  return (
    <motion.div
      className="min-h-screen w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <HomeHeroSkeleton />
      <PropertySearchSkeleton />
      <FindAPropertySkeleton />
    </motion.div>
  )
}
