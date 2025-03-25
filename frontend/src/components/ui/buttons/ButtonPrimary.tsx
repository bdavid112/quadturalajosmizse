import * as React from 'react'

import './button-primary.scss'

interface Props {
  label: string
  fullWidth?: boolean
  isDisabled?: boolean
  className?: string
  type?: 'submit' | 'reset' | 'button'
  onClick?: () => void
}

const ButtonPrimary: React.FunctionComponent<Props> = ({
  label,
  fullWidth = false,
  isDisabled,
  className,
  type,
  onClick,
}) => {
  return (
    <button
      type={type}
      className={`${className} padding-x-lg font-bold box-shadow-light ${!isDisabled ? 'button-primary-enabled' : 'button-primary-disabled'} ${fullWidth ? 'width-full' : ''}`}
      onClick={() => {
        if (isDisabled) return
        onClick && onClick()
      }}
    >
      {label}
    </button>
  )
}

export default ButtonPrimary
