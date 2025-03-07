import '/src/styles/utilities.scss'
import './date-picker-outline.scss'

import * as React from 'react'
import InputButton from '../buttons/InputButton'
import CustomCalendar from './calendar/CustomCalendar'
import { t } from '../../../utils/translator'
import { useDatePicker } from '../../../hooks/useDatePicker'

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
  const {
    isOpen,
    setIsOpen,
    selectedDate,
    containerRef,
    handleDateSelect,
    toggleIsOpen,
    closeDatePicker,
  } = useDatePicker(defaultValue, onChange)

  return (
    <>
      <div ref={containerRef}>
        <div
          className={`flex align-center min-width-lg relative input-container border background-transparent ${isOpen ? 'input-focused' : ''} ${error ? 'border-error' : ''}`}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key == 'Enter') {
              toggleIsOpen()
            }
          }}
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
            value={selectedDate ? selectedDate.toLocaleString() : ''}
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
          <div className="calendar-container border-rounded-sm box-shadow-medium">
            <CustomCalendar
              lang={lang}
              onDateSelect={handleDateSelect}
              closeDatePicker={closeDatePicker}
            ></CustomCalendar>
          </div>
        )}
      </div>
    </>
  )
}

export default DatePickerOutline
