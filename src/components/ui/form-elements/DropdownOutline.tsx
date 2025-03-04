import * as React from 'react'
import '/src/styles/utilities.scss'
import './dropdown-outline.scss'
import { useEffect, useRef, useState } from 'react'
import InputButton from '../buttons/InputButton'
import CustomOption from './CustomOption'

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
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(
    defaultValue ? defaultValue : null
  )
  const [focusedOptionValue, setFocusedOptionValue] = useState(0)
  const [activeOptionValue, setActiveOptionValue] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)
  const optionContainerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  /* Handle if the user clicks outside of the container */

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
        setFocusedOptionValue(0)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  /* Handle if the user presses tab or esc */

  useEffect(() => {
    const handleCloseOnKeyDown = (event: KeyboardEvent) => {
      if (isOpen && (event.key == 'Tab' || event.key == 'Escape')) {
        setIsOpen(false)
        setFocusedOptionValue(0)
      }
    }

    if (isOpen && optionContainerRef.current) {
      optionContainerRef.current.focus()
    } else if (!isOpen && buttonRef.current && selectedOption) {
      buttonRef.current.focus()
    }

    document.addEventListener('keydown', handleCloseOnKeyDown)
    return () => document.removeEventListener('keydown', handleCloseOnKeyDown)
  }, [isOpen])

  /* Only change focusedOptionValue within bounds */

  const changeFocusedOptionValue = (newValue: number) => {
    if (newValue <= 0) newValue = options.length
    if (newValue > options.length) newValue = 1
    setFocusedOptionValue(newValue)
  }

  /* Handle selecting an option */

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option)
    onChange && onChange(option)
    setIsOpen(false)
  }

  const toggleIsOpen = () => {
    setIsOpen(!isOpen)
  }

  /* Handle navigating between options with arrow keys and select with enter */

  const handleArrowKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (isOpen && event.key == 'ArrowDown') {
      event.preventDefault()
      changeFocusedOptionValue(focusedOptionValue + 1)
    }
  }

  const handleArrowKeyUp = (event: React.KeyboardEvent) => {
    if (isOpen && event.key == 'ArrowUp') {
      event.preventDefault()
      changeFocusedOptionValue(focusedOptionValue - 1)
    }
  }

  const handleEnterKeyDown = (event: React.KeyboardEvent) => {
    if (isOpen && event.key == 'Enter') {
      event.preventDefault()
      if (focusedOptionValue > 0) setActiveOptionValue(focusedOptionValue)
    }
  }

  const handleEnterKeyUp = (event: React.KeyboardEvent) => {
    if (isOpen && event.key == 'Enter') {
      event.preventDefault()
      const option = options.find((o) => o.value === focusedOptionValue)
      option && handleOptionClick(option)
      setFocusedOptionValue(0)
      setActiveOptionValue(0)
    }
  }

  return (
    <>
      <div ref={containerRef}>
        <div
          className={`flex align-center min-width-md relative input-container border background-transparent ${isOpen ? 'input-focused' : ''} ${error && 'border-error'}`}
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
          <div
            ref={optionContainerRef}
            onKeyDown={(e) => {
              handleArrowKeyDown(e)
              handleArrowKeyUp(e)
              handleEnterKeyDown(e)
            }}
            onKeyUp={(e) => {
              handleEnterKeyUp(e)
            }}
            className="option-container border-rounded-sm box-shadow-medium"
            tabIndex={0}
          >
            {options.map((option) => (
              <CustomOption
                option={option}
                isFocused={focusedOptionValue == option.value}
                isActive={activeOptionValue == option.value}
                onClick={() => {
                  handleOptionClick(option)
                }}
              ></CustomOption>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default DropdownOutline
