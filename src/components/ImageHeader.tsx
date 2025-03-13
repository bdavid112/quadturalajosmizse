import { insertStrongTags } from '../utils/formatText'
import './image-header.scss'

import * as React from 'react'

interface Props {
  title: string
  img: string
}

const ImageHeader: React.FunctionComponent<Props> = ({ title, img }) => {
  return (
    <div className="relative">
      <picture>
        <source srcSet={img} type="image/avif"></source>
        <img
          src={`../assets/${img}.jpg`}
          alt="Tour overview"
          className="header-image"
          loading="eager"
          fetchPriority="high"
        ></img>
      </picture>
      <h1 className="absolute centered font-size-hero text-inverted">
        {insertStrongTags(title)}
      </h1>
    </div>
  )
}
export default ImageHeader
