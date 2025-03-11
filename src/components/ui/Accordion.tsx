import { useState } from 'react'

import './accordion.scss'

import * as React from 'react'

interface Props {
  label: string
  text: string
  isDisabled?: boolean
}

const Accordion: React.FunctionComponent<Props> = ({ label, text }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className="width-full border border-rounded-sm padding-x-lg accordion-container transition-bezier-fast box-shadow-light relative"
      tabIndex={0}
    >
      <div
        className="flex align-center min-height-lg justify-between width-full height-full cursor-pointer"
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      >
        <span
          className={`${isOpen ? 'font-semi-bold' : 'font-medium'} transition-ease-in`}
        >
          {label}
        </span>
        <span
          className={`material-symbols-rounded size-20 text-secondary transition-bezier-fast user-select-none ${isOpen ? 'rotate-180' : ''}`}
        >
          keyboard_arrow_down
        </span>
      </div>
      <div
        className={`animated-content transition-bezier-smooth ${isOpen ? 'open' : ''}`}
      >
        <div className="divider-gray absolute"></div>
        <div className="padding-y-lg">
          <p className="text-primary">{text}</p>
        </div>
      </div>
    </div>
  )
}
export default Accordion
