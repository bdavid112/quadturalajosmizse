import * as React from 'react'
import '/src/styles/utilities.scss'
import './input-button.scss'
import { useState } from 'react'

interface Props {
  icon: string
  onClick?: () => void
  isParentOpen?: boolean
  rotate?: boolean
}

const InputButton = React.forwardRef<HTMLButtonElement, Props>(
  ({ icon, onClick, isParentOpen = false, rotate = false }, ref) => {
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
        className={`input-button ${isActive ? 'input-button-active' : ''}`}
        onClick={() => {
          onClick && onClick()
        }}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
      >
        <span
          className={`material-symbols-rounded size-20 transition-ease-in ${
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
