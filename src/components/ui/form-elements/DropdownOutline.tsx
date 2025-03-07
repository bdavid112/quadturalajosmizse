import '/src/styles/utilities.scss'
import './dropdown-outline.scss'

import * as React from 'react'
import { useRef, useState } from 'react'
import InputButton from '../buttons/InputButton'
import OptionsMenu from './OptionsMenu'
import { useAutoClose } from '../../../hooks/useAutoClose'

interface Option {
  value: number
  label: string
}

interface Props {
  id: string
  name: string
  label: string
  error?: boolean
  helperText: string
  options: Option[]
  defaultValue?: Option
  onChange?: (option: Option) => void
}

const DropdownOutline: React.FunctionComponent<Props> = ({
  id,
  name,
  label,
  error = false,
  helperText,
  options,
  defaultValue,
  onChange,
}) => {
  /* State variables */

  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(
    defaultValue ? defaultValue : null
  )

  /* Refs */

  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  /* Callback function to close the date picker */

  const closeDropdown = () => setIsOpen(false)

  /* Custom hook to close the date picker if the users tabs out */

  useAutoClose(containerRef, isOpen, closeDropdown)

  /* Handle selecting an option */

  const handleOptionClick = (optionValue: number) => {
    const option = options.find((o) => o.value == optionValue)
    if (option) {
      setSelectedOption(option)
      onChange && onChange(option)
      setIsOpen(false)
    }
  }

  const toggleIsOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <div ref={containerRef}>
        <div
          className={`flex align-center min-width-md relative input-container border background-transparent ${isOpen ? 'input-focused' : ''} ${error ? 'border-error' : ''}`}
        >
          <label
            htmlFor={id}
            className={`absolute z-overlay input-label padding-x-lg populated ${error ? 'text-error' : ''}`}
          >
            {label}
          </label>
          <span className="padding-x-lg width-full absolute user-select-none">
            {selectedOption ? selectedOption.label : 'Select an option'}
          </span>
          <div className="button-container absolute z-overlay flex">
            <InputButton
              ref={buttonRef}
              icon={'keyboard_arrow_down'}
              onClick={() => {
                toggleIsOpen()
              }}
              isParentOpen={isOpen}
              rotate={true}
            ></InputButton>
          </div>
          <select
            id={id}
            name={name}
            value={selectedOption ? selectedOption.value : 0}
            className="relative z-base min-height-lg width-full font-size-base input-field padding-x-lg background-transparent"
            onClick={() => {
              setIsOpen(!isOpen)
            }}
            onChange={() => {}}
            tabIndex={-1}
          ></select>
        </div>
        <div className="padding-x-lg">
          <span
            className={`font-size-caption text-secondary ${isOpen ? 'hidden' : ''} ${error ? 'text-error' : ''}`}
          >
            {helperText}
          </span>
        </div>
        {isOpen && (
          <div className="option-container border-rounded-sm box-shadow-medium">
            <OptionsMenu
              options={options}
              selectedOptionValue={selectedOption ? selectedOption.value : -1}
              handleOptionClick={handleOptionClick}
            ></OptionsMenu>
          </div>
        )}
      </div>
    </>
  )
}

export default DropdownOutline
