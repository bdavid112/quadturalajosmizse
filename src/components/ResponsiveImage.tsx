import './profile-bio-short.scss'

import * as React from 'react'

interface Props {
  img: { url: string; alt: string }
  className?: string
}

const ResponsiveImage: React.FunctionComponent<Props> = ({
  img,
  className,
}) => {
  return (
    <picture>
      <source
        srcSet={`images/${img.url}-3840.avif`}
        media="(min-width: 1920px)"
        type="image/avif"
      ></source>
      <source
        srcSet={`images/${img.url}-3840.webp`}
        media="(min-width: 1920px)"
        type="image/webp"
      ></source>
      <source
        srcSet={`images/${img.url}-1920.avif`}
        media="(min-width: 1280px)"
        type="image/avif"
      ></source>
      <source
        srcSet={`images/${img.url}-1920.webp`}
        media="(min-width: 1280px)"
        type="image/webp"
      ></source>
      <source
        srcSet={`images/${img.url}-1280.avif`}
        media="(min-width: 768px)"
        type="image/avif"
      ></source>
      <source
        srcSet={`images/${img.url}-1280.webp`}
        media="(min-width: 768px)"
        type="image/webp"
      ></source>
      <source srcSet={`images/${img.url}-800.avif`} type="image/avif"></source>
      <source srcSet={`images/${img.url}-800.webp`} type="image/webp"></source>
      <img
        srcSet={`
        images/${img.url}-3840.jpg 3840w,
        images/${img.url}-1920.jpg 1920w,
        images/${img.url}-1280.jpg 1280w,
        images/${img.url}-800.jpg 800w
      `}
        sizes="(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, (min-width: 768px) 768px, 100vw"
        src={`images/${img.url}-800.jpg`}
        alt={img.alt}
        className={className}
        loading="eager"
        fetchPriority="high"
      ></img>
    </picture>
  )
}
export default ResponsiveImage
