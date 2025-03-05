import * as React from 'react'
import '/src/styles/utilities.scss'
import './custom-option.scss'

interface Option {
  value: number
  label: string
}

interface Props {
  onClick?: () => void
  option: Option
  isFocused: boolean
  isActive: boolean
  isSelected?: boolean
  icon?: string
}

const CustomOption: React.FunctionComponent<Props> = ({
  onClick,
  option,
  isFocused,
  isActive,
  isSelected = false,
  icon,
}) => {
  return (
    <div
      key={option.value}
      className={`min-height-lg flex justify-between align-center padding-x-lg cursor-pointer custom-option transition-ease-out ${isFocused ? 'custom-option-focus' : ''} ${isActive ? 'custom-option-active' : ''}`}
      role="option"
      aria-selected={isSelected}
      onClick={() => {
        onClick && onClick()
      }}
      tabIndex={0}
    >
      {option.label}
      {icon && isSelected && (
        <span className="material-symbols-rounded size-20 transition-ease-in">
          {icon}
        </span>
      )}
    </div>
  )
}

export default CustomOption
