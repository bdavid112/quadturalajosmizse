import Icon from '../IconComponent'
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
      <Icon name={icon} className={`${isDisabled ? 'secondary' : 'primary'}`} />
    </button>
  )
}
export default FAB
