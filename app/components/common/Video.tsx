import { FC } from 'react'
import { VideoProps } from '@/app/lib/types/common-types'

const Video: FC<VideoProps> = ({ videoRef, src }) => {
  return (
    <video
      ref={videoRef}
      className="absolute inset-0 w-full h-full object-cover z-0"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}

export default Video
