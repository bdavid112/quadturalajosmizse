import * as React from 'react'

import './custom-option.scss'

interface Option {
  value: number
  label: string
}

interface Props {
  option: Option
  icon?: string
  isSelected?: boolean
  isFocused?: boolean
  isActive?: boolean
  onClick?: () => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void
  onKeyUp?: (e: React.KeyboardEvent<HTMLDivElement>) => void
}

const CustomOption = React.forwardRef<HTMLDivElement, Props>(
  (
    {
      option,
      icon,
      isSelected = false,
      isFocused,
      isActive,
      onClick,
      onKeyDown,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`min-height-lg flex justify-between align-center padding-x-lg cursor-pointer custom-option transition-bezier-fast ${isFocused ? 'custom-option-focus' : ''} ${isActive ? 'custom-option-active' : ''}`}
        role="option"
        aria-selected={isSelected}
        onClick={() => {
          onClick && onClick()
        }}
        onKeyDown={(e) => {
          onKeyDown && onKeyDown(e)
          if (e.key == 'Enter') {
            /* setIsActive(true) */
          }
        }}
        onKeyUp={(e) => {
          if (e.key == 'Enter') {
            if (onClick) {
              onClick()
              /* setIsActive(false) */
            }
          }
        }}
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
