import './review-card.scss'

import image from '@assets/review-image.avif'

import * as React from 'react'
import Icon from './IconComponent'

interface Props {
  title: string
  subtext: string
  name: string
  date: string
}

const ReviewCard: React.FunctionComponent<Props> = ({
  title,
  subtext,
  name,
  date,
}) => {
  const stars = []
  for (let i = 0; i < 5; i++) {
    stars.push(<Icon name="star" className="warning" />)
  }

  return (
    <div className="review-card width-full flex flex-col flex-gap-xl padding-x-xl padding-y-xl border-rounded-md box-shadow-medium">
      <div className="flex">{stars.map((star) => star)}</div>
      <span className="font-medium font-size-md">{title}</span>
      <p className="text-primary font-size-secondary">{subtext}</p>
      <div className="flex flex-gap-sm author">
        <img
          className="review-image border-rounded-full"
          src={image}
          alt="Review profile image"
        />
        <div className="flex flex-col">
          <span className="font-medium">{name}</span>
          <span className="font-size-caption text-secondary">{date}</span>
        </div>
      </div>
    </div>
  )
}
export default ReviewCard
