import './image-header.scss'

import { insertStrongTags } from '@utils/formatText'

import * as React from 'react'
import { useEffect } from 'react'

interface Props {
  title: string
  img: string
}

const ImageHeader: React.FunctionComponent<Props> = ({ title, img }) => {
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = `/images/${img}.avif`
    link.type = 'image/avif'
    link.fetchPriority = 'high'

    document.head.appendChild(link)

    return () => {
      document.head.removeChild(link) // Cleanup on unmount
    }
  }, [])

  return (
    <div className="relative">
      <div className="image-wrapper">
        <picture>
          <source srcSet={`images/${img}.avif`} type="image/avif"></source>
          <source srcSet={`images/${img}.webp`} type="image/webp"></source>
          <img
            src={`images/${img}.jpg`}
            alt="Hero Background"
            className="header-image"
            loading="eager"
            fetchPriority="high"
          ></img>
        </picture>
      </div>
      <h1 className="absolute font-size-2xl centered text-center text-inverted">
        {insertStrongTags(title)}
      </h1>
    </div>
  )
}
export default ImageHeader
