'use client'

import React, { FC } from 'react'
import { BannerProps } from '@/app/lib/types/common-types'
import Picture from './Picture'
import Breadcrumb from './Breadcrumb'

const Banner: FC<BannerProps> = ({ src, title, breadcrumb }) => {
  return (
    <div className="relative w-full h-72">
      <Picture
        src={src}
        alt="21 North East Listings"
        className="w-full h-full object-cover"
        priority={true}
      />
      <div
        className="absolute z-10 top-1/2  left-1/2 -translate-x-1/2 -translate-y-1/2 flex-col w-full 
      h-full flex justify-center bg-black/70 px-3"
      >
        <div className="max-w-screen-md xl:px-0 990:max-w-[990px] xl:max-w-300 mx-auto w-full flex flex-col 990:items-center 990:flex-row 990:justify-between">
          <h1 className="text-3xl text-white sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 990:mb-0">
            {title}
          </h1>
          <Breadcrumb breadcrumb={breadcrumb} />
        </div>
      </div>
    </div>
  )
}

export default Banner
