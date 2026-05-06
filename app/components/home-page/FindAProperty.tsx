'use client'

import Link from 'next/link'
import { underline } from '../common/styles'
import { motion } from 'framer-motion'
import { buttonVariants, containerVariants, titleVariants } from '@/app/lib/constants/motion'
import { RepliersListing } from '@/app/lib/types/repliers'
import HorizontalScrollCards from '../HorizontalScrollCards'

const FindAProperty = ({ allListings }: { allListings: RepliersListing[] }) => {
  if (allListings?.length === 0) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="pt-24 pb-36"
      >
        <div className="max-w-300 mx-auto w-full px-3">
          {/* Header */}
          <motion.div variants={titleVariants} className={`pb-4 relative ${underline} mb-12`}>
            <h1 className="text-3xl mb-1 uppercase font-semibold text-text-light dark:text-text-dark">
              Find a Property
            </h1>
            <p className="uppercase font-normal text-muted-light dark:text-muted-dark text-sm">
              Your Perfect Home Awaits
            </p>
          </motion.div>

          {/* Empty State */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark p-12 text-center"
          >
            <p className="text-text-light dark:text-text-dark text-lg font-medium mb-3">
              No listings available at this time.
            </p>
            <p className="text-muted-light dark:text-muted-dark text-base mb-8">
              Please check back soon or contact Eileen for more information.
            </p>
            <motion.div whileHover="hover" whileTap="tap">
              <a
                href="tel:7817187665"
                className="inline-block bg-primary-light dark:bg-primary-dark text-white dark:text-bg-dark font-bold uppercase text-sm px-6 py-3 hover:bg-button-light dark:hover:bg-button-dark transition-colors duration-200 w-fit"
              >
                Contact Eileen
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="pt-24 pb-36"
    >
      <div className="max-w-300 mx-auto w-full px-3">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-8">
          {/* Title */}
          <motion.div variants={titleVariants} className={`pb-4 relative ${underline}`}>
            <h1 className="text-3xl mb-1 uppercase font-semibold text-text-light dark:text-text-dark">
              Find a Property
            </h1>
            <p className="uppercase font-normal text-muted-light dark:text-muted-dark text-sm">
              Your Perfect Home Awaits
            </p>
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
              <Link
                href="/listings?page=1&county=Essex"
                className="bg-button-light dark:bg-button-dark text-white dark:text-bg-dark text-sm font-semibold uppercase px-6 py-2.5 hover:bg-primary-light dark:hover:bg-primary-dark transition-colors duration-200"
              >
                View All
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Carousel */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <HorizontalScrollCards items={allListings} />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default FindAProperty
