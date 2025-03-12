import './fab.scss'

import * as React from 'react'

interface Props {
  icon: string
  isDisabled?: boolean
  className?: string
  onClick?: () => void
}

const FAB: React.FunctionComponent<Props> = ({ icon, className, onClick }) => {
  return (
    <button
      className={`${className} fab transition-bezier-fast flex-gap-xs flex align-center justify-center cursor-pointer box-shadow-light`}
      onClick={() => {
        onClick && onClick()
      }}
    >
      <span className="material-symbols-rounded size-24 text-primary">
        {icon}
      </span>
    </button>
  )
}
export default FAB
