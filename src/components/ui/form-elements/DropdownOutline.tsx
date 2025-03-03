import * as React from 'react'
import '/src/styles/utilities.scss'
import './dropdown-outline.scss'
import { useEffect, useRef, useState } from 'react'

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
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option)
    onChange && onChange(option)
    setIsOpen(false)
  }

  return (
    <>
      <div ref={containerRef}>
        <div
          className={`flex align-center min-width-md relative input-container border background-transparent ${error && 'border-error'}`}
        >
          <label
            htmlFor={id}
            className={`absolute z-overlay input-label padding-x-lg populated ${error && 'text-error'}`}
          >
            {label}
          </label>
          <span className="padding-x-lg width-full absolute user-select-none">
            {selectedOption ? selectedOption.label : 'Select an option'}
          </span>
          <div className="button-container absolute z-overlay flex">
            <button
              onClick={() => {
                setIsOpen(!isOpen)
              }}
            >
              <span
                className={`material-symbols-rounded size-20 transition-ease-in ${isOpen && 'rotate-180'}`}
              >
                keyboard_arrow_down
              </span>
            </button>
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
          ></select>
        </div>
        <div className="padding-x-lg">
          <span
            className={`font-size-caption text-muted ${isOpen && 'hidden'} ${error && 'text-error'}`}
          >
            {helperText}
          </span>
        </div>
        {isOpen && (
          <div className="option-container border-rounded-sm box-shadow-medium">
            {options.map((option) => (
              <div
                key={option.value}
                className="min-height-lg flex align-center padding-x-lg cursor-pointer custom-option transition-ease-out"
                role="option"
                aria-selected={selectedOption?.value === option.value}
                onClick={() => {
                  handleOptionClick(option)
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default DropdownOutline
