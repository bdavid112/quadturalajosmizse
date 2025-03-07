import * as React from 'react'
import '/src/styles/utilities.scss'
import './input-button.scss'
import { useState } from 'react'

interface Props {
  icon: string
  label?: string
  onClick?: () => void
  isParentOpen?: boolean
  rotate?: boolean
  rounded?: string
  small?: boolean
}

const InputButton = React.forwardRef<HTMLButtonElement, Props>(
  (
    {
      icon,
      label,
      onClick,
      isParentOpen = false,
      rotate = false,
      rounded = false,
      small = false,
    },
    ref
  ) => {
    const [isActive, setIsActive] = useState(false)

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'Enter') {
        setIsActive(true)
        e.preventDefault()
      }
    }

    const handleKeyUp = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'Enter') {
        setIsActive(false)
        onClick && onClick()
      }
    }

    return (
      <button
        ref={ref}
        className={`${!small ? 'input-button' : 'input-button-small'} ${label ? 'padding-left-sm label-input-button' : ''} ${isActive ? 'input-button-active' : ''} ${rounded}`}
        onClick={() => {
          onClick && onClick()
        }}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onBlur={() => {
          setIsActive(false)
        }}
      >
        {label && (
          <span className="text-secondary font-size-secondary">{label}</span>
        )}
        <span
          className={`material-symbols-rounded size-20 transition-bezier-fast ${
            rotate && isParentOpen ? 'rotate-180' : ''
          }`}
        >
          {icon}
        </span>
      </button>
    )
  }
)

export default InputButton
