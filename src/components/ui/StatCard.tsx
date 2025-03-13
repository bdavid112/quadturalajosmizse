import './stat-card.scss'

import * as React from 'react'

interface Props {
  title: string
  subtext: string
  icon: string
}

const StatCard: React.FunctionComponent<Props> = ({ title, subtext, icon }) => {
  return (
    <div className="stat-card width-full flex flex-col align-center justify-center border-rounded-md box-shadow-medium">
      <span className="material-symbols-rounded size-40 margin-bottom-xl">
        {icon}
      </span>
      <span className="font-medium">{title}</span>
      <span className="text-secondary font-size-secondary">{subtext}</span>
    </div>
  )
}
export default StatCard
