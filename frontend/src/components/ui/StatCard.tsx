import Icon from './IconComponent'
import './stat-card.scss'

import * as React from 'react'

interface Props {
  title: string
  subtext: string
  icon: string
}

const StatCard: React.FunctionComponent<Props> = ({ title, subtext, icon }) => {
  return (
    <div className="transition-bezier-smooth stat-card width-full flex flex-col align-center justify-center border-rounded-md box-shadow-medium">
      <Icon name={icon} className="size-40 primary margin-bottom-xl" />
      <span className="font-medium">{title}</span>
      <span className="text-secondary font-size-secondary">{subtext}</span>
    </div>
  )
}
export default StatCard
