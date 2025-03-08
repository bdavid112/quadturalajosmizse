import * as React from 'react'
import '/src/styles/utilities.scss'
import './input-button.scss'

interface Props {
  icon: string
  label?: string
  onClick?: () => void
  isParentOpen?: boolean
  rotate?: boolean
  rounded?: string
  small?: boolean
  tabIndex?: number
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
      tabIndex = -1,
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={`${!small ? 'input-button' : 'input-button-small'} ${label ? 'padding-left-sm label-input-button' : ''} ${rounded}`}
        onClick={() => {
          onClick && onClick()
        }}
        tabIndex={tabIndex}
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
