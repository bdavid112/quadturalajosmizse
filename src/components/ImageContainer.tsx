import './image-container.scss'

import * as React from 'react'
import FAB from './ui/buttons/FAB'

interface Props {
  title: string
  subtext: string
  images?: string[]
}

const ImageContainer: React.FunctionComponent<Props> = ({
  title,
  subtext,
  images,
}) => {
  return (
    <div className="margin-bottom-4xl">
      <div>
        <h2>{title}</h2>
        <p>{subtext}</p>
        <div className="gallery-grid padding-y-xl">
          {images?.map((image, index) => (
            <div key={index} className="image-placeholder">
              <span>Image Placeholder{image}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center margin-bottom-lg padding-y-lg">
        <FAB icon={'add'} className="border-rounded-full"></FAB>
      </div>
      <div className="divider-gray"></div>
    </div>
  )
}
export default ImageContainer
