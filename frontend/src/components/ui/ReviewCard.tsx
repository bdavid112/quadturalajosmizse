import './review-card.scss'

import * as React from 'react'
import Icon from './IconComponent'

interface Props {
  title: string
  subtext: string
  name: string
  date: string
  rating: number
}

const ReviewCard: React.FunctionComponent<Props> = ({
  title,
  subtext,
  name,
  date,
  rating,
}) => {
  const stars = []
  for (let i = 0; i < 5; i++) {
    stars.push(
      i <= rating - 1 ? (
        <Icon name="star_fill" className="warning" />
      ) : (
        <Icon name="star" className="warning" />
      )
    )
  }

  return (
    <div className="review-card width-full flex flex-col flex-gap-xl padding-x-xl padding-y-xl border-rounded-md box-shadow-medium">
      <div className="flex flex-col flex-gap-sm">
        <div className="flex">{stars.map((star) => star)}</div>
        <span className="font-medium font-size-md">{title}</span>
      </div>
      <div className="height-full break-words">
        <p className="text-primary font-size-secondary">{subtext}</p>
      </div>
      <div className="flex flex-gap-sm author height-content">
        {/* <img
          className="review-image border-rounded-full"
          src={image}
          alt="Review profile image"
        /> */}
        <div className="flex flex-col">
          <span className="font-medium">{name}</span>
          <span className="font-size-caption text-secondary">{date}</span>
        </div>
      </div>
    </div>
  )
}
export default ReviewCard
