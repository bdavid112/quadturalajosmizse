import * as React from 'react'

import './button-secondary-outline.scss'

interface Props {
  label: string
  fullWidth?: boolean
  isDisabled?: boolean
  className?: string
  onClick?: () => void
}

const ButtonSecondaryOutline: React.FunctionComponent<Props> = ({
  label,
  fullWidth = false,
  isDisabled,
  className,
  onClick,
}) => {
  return (
    <button
      className={`${className} padding-x-lg box-shadow-light ${!isDisabled ? 'button-secondary-outline-enabled' : 'button-secondary-outline-disabled'} ${fullWidth ? 'width-full' : ''}`}
      onClick={() => {
        !isDisabled && onClick && onClick()
      }}
    >
      {label}
    </button>
  )
}

export default ButtonSecondaryOutline
