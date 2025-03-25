import * as React from 'react'

import './custom-option.scss'
import Icon from '../IconComponent'

interface Option {
  value: string
  label: string
}

interface Props {
  option: Option
  icon?: string
  isSelected?: boolean
  isFocused?: boolean
  isActive?: boolean
  isDisabled?: boolean
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
      isDisabled,
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
        <span
          className={`${isSelected ? 'font-medium' : ''} ${isDisabled ? 'line-through text-muted' : ''}`}
        >
          {option.label}
        </span>
        {icon && isSelected && (
          <Icon
            name={icon}
            className="primary transition-bezier-fast size-20"
          />
        )}
      </div>
    )
  }
)

export default CustomOption
