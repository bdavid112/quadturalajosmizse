import * as React from 'react'
import { useState } from 'react'

import '/src/styles/utilities.scss'
import './custom-option.scss'

interface Option {
  value: number
  label: string
}

interface Props {
  option: Option
  isSelected?: boolean
  icon?: string
  onClick?: () => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void
  onKeyUp?: (e: React.KeyboardEvent<HTMLDivElement>) => void
}

const CustomOption = React.forwardRef<HTMLDivElement, Props>(
  ({ option, isSelected = false, icon, onClick, onKeyDown }, ref) => {
    const [isActive, setIsActive] = useState(false)

    return (
      <div
        ref={ref}
        className={`min-height-lg flex justify-between align-center padding-x-lg cursor-pointer custom-option transition-bezier-fast ${isActive ? 'custom-option-active' : ''}`}
        role="option"
        aria-selected={isSelected}
        onClick={() => {
          onClick && onClick()
        }}
        onKeyDown={(e) => {
          onKeyDown && onKeyDown(e)
          if (e.key == 'Enter') {
            setIsActive(true)
          }
        }}
        onKeyUp={(e) => {
          if (e.key == 'Enter') {
            if (onClick) {
              onClick()
              setIsActive(false)
            }
          }
        }}
        tabIndex={0}
      >
        <span className={`${isSelected ? 'font-medium' : ''}`}>
          {option.label}
        </span>
        {icon && isSelected && (
          <span
            className={`material-symbols-rounded size-20 transition-bezier-fast`}
          >
            {icon}
          </span>
        )}
      </div>
    )
  }
)

export default CustomOption
