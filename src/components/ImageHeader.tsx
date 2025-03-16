import './image-header.scss'

import { insertStrongTags } from '@utils/formatText'

import * as React from 'react'
import ResponsiveImage from './ResponsiveImage'

interface Props {
  title: string
  img: { url: string; alt: string }
}

const ImageHeader: React.FunctionComponent<Props> = ({ title, img }) => {
  return (
    <div className="relative">
      <div className="image-wrapper">
        <ResponsiveImage img={img} className="header-image" />
      </div>
      <h1 className="absolute font-size-2xl centered text-center text-inverted">
        {insertStrongTags(title)}
      </h1>
    </div>
  )
}
export default ImageHeader
