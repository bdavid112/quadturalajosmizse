import * as React from 'react'

import './input-button.scss'

interface Props {
  icon: string
  label?: string
  isParentOpen?: boolean
  rotate?: boolean
  rounded?: string
  small?: boolean
  tabIndex?: number
  onClick?: () => void
  closeParent?: () => void
}

const InputButton = React.forwardRef<HTMLButtonElement, Props>(
  (
    {
      icon,
      label,
      isParentOpen = false,
      rotate = false,
      rounded = false,
      small = false,
      tabIndex = -1,
      onClick,
      closeParent,
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
        onKeyDown={(e) => {
          if (e.key == 'Tab') {
            closeParent && closeParent()
          }
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
