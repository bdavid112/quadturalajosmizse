import './fab.scss'

import * as React from 'react'

interface Props {
  icon: string
  isDisabled?: boolean
  className?: string
  onClick?: () => void
}

const FAB: React.FunctionComponent<Props> = ({
  icon,
  isDisabled,
  className,
  onClick,
}) => {
  return (
    <button
      className={`${className} fab ${isDisabled ? 'disabled cursor-not-allowed' : ''} transition-bezier-fast flex-gap-xs flex align-center justify-center cursor-pointer box-shadow-light`}
      onClick={() => {
        onClick && onClick()
      }}
    >
      <span
        className={`material-symbols-rounded size-24 text-primary ${isDisabled ? 'text-secondary' : ''}`}
      >
        {icon}
      </span>
    </button>
  )
}
export default FAB
