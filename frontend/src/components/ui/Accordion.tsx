import './accordion.scss'

import * as React from 'react'
import { useState } from 'react'
import Icon from './IconComponent'

interface Props {
  label: string
  text: string
  isDisabled?: boolean
}

const Accordion: React.FunctionComponent<Props> = ({ label, text }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className="width-full border border-rounded-sm accordion-container transition-bezier-fast box-shadow-light relative"
      tabIndex={0}
    >
      <div
        className="flex align-center min-height-lg justify-between padding-x-lg padding-y-sm width-full height-full cursor-pointer"
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      >
        <span
          className={`${isOpen ? 'font-semi-bold' : 'font-medium'} transition-ease-in`}
        >
          {label}
        </span>
        <Icon
          name="keyboard_arrow_down"
          className={`secondary transition-bezier-smooth user-select-none ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>
      <div
        className={`animated-content transition-bezier-smooth ${isOpen ? 'open' : ''}`}
      >
        <div className="divider-gray absolute"></div>
        <div className="padding-y-lg padding-x-lg">
          <p className="text-primary">{text}</p>
        </div>
      </div>
    </div>
  )
}
export default Accordion
