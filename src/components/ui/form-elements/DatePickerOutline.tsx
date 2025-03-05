import * as React from 'react'
import '/src/styles/utilities.scss'
import './date-picker-outline.scss'
import { useEffect, useRef, useState } from 'react'
import InputButton from '../buttons/InputButton'
import CustomCalendar from './CustomCalendar'
import { t } from '../../../utils/translator'

interface Props {
  lang?: string
  id: string
  name: string
  label: string
  error?: boolean
  helperText: string
  defaultValue?: Date
  onChange?: (date: Date) => void
}

const DatePickerOutline: React.FunctionComponent<Props> = ({
  lang = 'hu',
  id,
  name,
  label,
  error = false,
  helperText,
  defaultValue,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(true)
  const [selectedDate, setSelectedDate] = useState(
    defaultValue ? defaultValue : null
  )

  const containerRef = useRef<HTMLDivElement>(null)
  const calendarContainerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  /* Handle if the user clicks outside of the container */

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

  /* Handle if the user presses tab or esc */

  useEffect(() => {
    const handleCloseOnKeyDown = (event: KeyboardEvent) => {
      if (isOpen && (event.key == '' || event.key == 'Escape')) {
        setIsOpen(false)
      }
    }

    if (isOpen && calendarContainerRef.current) {
      calendarContainerRef.current.focus()
    } else if (!isOpen && buttonRef.current && selectedDate) {
      buttonRef.current.focus()
    }

    document.addEventListener('keydown', handleCloseOnKeyDown)
    return () => document.removeEventListener('keydown', handleCloseOnKeyDown)
  }, [isOpen])

  /* Only change focusedOptionValue within bounds */

  /* const changeFocusedOptionValue = (newValue: number) => {
    if (newValue <= 0) newValue = options.length
    if (newValue > options.length) newValue = 1
    setFocusedOptionValue(newValue)
  } */

  /* Handle selecting an option */

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    onChange && onChange(date)
    setIsOpen(false)
  }

  const toggleIsOpen = () => {
    setIsOpen(!isOpen)
  }

  /* Handle navigating between options with arrow keys and select with enter */

  /* const handleArrowKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (isOpen && event.key == 'ArrowDown') {
      event.preventDefault()
      changeFocusedOptionValue(focusedOptionValue + 1)
    }
  } */

  /* const handleArrowKeyUp = (event: React.KeyboardEvent) => {
    if (isOpen && event.key == 'ArrowUp') {
      event.preventDefault()
      changeFocusedOptionValue(focusedOptionValue - 1)
    }
  } */

  const handleEnterKeyDown = (event: React.KeyboardEvent) => {
    if (isOpen && event.key == 'Enter') {
      event.preventDefault()
      /* if (focusedOptionValue > 0) setActiveOptionValue(focusedOptionValue) */
    }
  }

  /* const handleEnterKeyUp = (event: React.KeyboardEvent) => {
    if (isOpen && event.key == 'Enter') {
      event.preventDefault()
      const option = options.find((o) => o.value === focusedOptionValue)
      option && handleOptionClick(option)
      setFocusedOptionValue(0)
      setActiveOptionValue(0)
    }
  } */

  return (
    <>
      <div ref={containerRef}>
        <div
          className={`flex align-center min-width-lg relative input-container border background-transparent ${isOpen ? 'input-focused' : ''} ${error ? 'border-error' : ''}`}
        >
          <label
            htmlFor={id}
            className={`absolute z-overlay input-label padding-x-lg populated ${error ? 'text-error' : ''}`}
          >
            {label}
          </label>
          <span className="padding-x-lg width-full absolute user-select-none">
            {selectedDate
              ? selectedDate.toLocaleDateString()
              : `${t('ui.calendar.placeholder-text', lang)}`}
          </span>
          <div className="button-container absolute z-overlay flex">
            <InputButton
              ref={buttonRef}
              icon={'calendar_month'}
              onClick={() => {
                toggleIsOpen()
              }}
              isParentOpen={isOpen}
            ></InputButton>
          </div>
          <input
            id={id}
            name={name}
            value={selectedDate ? selectedDate.toLocaleString() : 0}
            type="date"
            className="cursor-pointer relative z-base min-height-lg width-full font-size-base input-field padding-x-lg background-transparent custom-date-picker"
            onClick={() => {
              setIsOpen(!isOpen)
            }}
            onChange={() => {}}
            tabIndex={-1}
          ></input>
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
            ref={calendarContainerRef}
            onKeyDown={(e) => {
              /* handleArrowKeyDown(e)
              handleArrowKeyUp(e) */
              handleEnterKeyDown(e)
            }}
            onKeyUp={(e) => {
              /*  handleEnterKeyUp(e) */
            }}
            className="option-container border-rounded-sm box-shadow-medium"
          >
            <CustomCalendar
              lang={lang}
              onDateSelect={handleDateSelect}
            ></CustomCalendar>
          </div>
        )}
      </div>
    </>
  )
}

export default DatePickerOutline
