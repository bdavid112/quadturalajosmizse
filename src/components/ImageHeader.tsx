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
      <img
        src={`/images/${img}.avif`}
        alt="Tour overview"
        className="header-image box-shadow-medium"
        loading="eager"
        fetchPriority="high"
      ></img>
      <h1 className="absolute font-size-2xl centered text-center text-inverted">
        {insertStrongTags(title)}
      </h1>
    </div>
  )
}
export default ImageHeader
