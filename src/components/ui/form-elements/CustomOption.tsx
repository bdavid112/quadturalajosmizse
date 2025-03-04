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
}

const CustomOption: React.FunctionComponent<Props> = ({
  onClick,
  option,
  isFocused,
  isActive,
}) => {
  return (
    <div
      key={option.value}
      className={`min-height-lg flex align-center padding-x-lg cursor-pointer custom-option transition-ease-out ${isFocused ? 'custom-option-focus' : ''} ${isActive ? 'custom-option-active' : ''}`}
      role="option"
      /* aria-selected={selectedOption?.value === option.value} */
      onClick={() => {
        onClick && onClick()
      }}
      tabIndex={0}
    >
      {option.label}
    </div>
  )
}

export default CustomOption
