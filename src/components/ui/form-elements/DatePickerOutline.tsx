import '/src/styles/utilities.scss'
import './date-picker-outline.scss'

import * as React from 'react'
import InputButton from '../buttons/InputButton'
import CustomCalendar from './calendar/CustomCalendar'
import { t } from '../../../utils/translator'
import { useDatePicker } from '../../../hooks/useDatePicker'
import { useAutoClose } from '../../../hooks/useAutoClose'
import { useDatePickerKeyboardNav } from '../../../hooks/useDatePickerKeyboardNav'
import { useLocalization } from '../../../context/LocalizationContext'

interface Props {
  id: string
  name: string
  label: string
  error?: boolean
  helperText: string
  defaultValue?: Date
  minYear?: number
  maxYear?: number
  onChange?: (date: Date) => void
}

const DatePickerOutline: React.FunctionComponent<Props> = ({
  id,
  name,
  label,
  error = false,
  helperText,
  defaultValue,
  minYear = 2000,
  maxYear = 2100,
  onChange,
}) => {
  const { lang } = useLocalization()

  /* Date picker state manager */

  const {
    isOpen,
    setIsOpen,
    selectedDate,
    selectedYear,
    selectedMonth,
    activeView,
    calendarDays,
    containerRef,
    viewTogglers,
    toggleIsOpen,
    closeDatePicker,
    onDateSelect,
    changeSelectedYear,
    changeSelectedMonth,
  } = useDatePicker(lang, minYear, maxYear, defaultValue, onChange)

  /* Custom hook to close the date picker if the users tabs out */

  useAutoClose(containerRef, isOpen, closeDatePicker)

  /* Keyboard navigation for date picker */

  const { dateIndice, handleKeyDown, handleKeyUp, handleDateSelect } =
    useDatePickerKeyboardNav(
      isOpen,
      setIsOpen,
      calendarDays,
      selectedYear,
      selectedMonth,
      changeSelectedMonth,
      onDateSelect
    )

  return (
    <div ref={containerRef} className="width-full relative">
      <div
        className={`z-overlay flex cursor-pointer align-center min-height-lg relative input-container border background-transparent ${isOpen ? 'input-focused' : ''} ${error ? 'border-error' : ''}`}
        tabIndex={0}
        onKeyDown={(e) => {
          handleKeyDown(e)
        }}
        onKeyUp={(e) => {
          handleKeyUp(e)
        }}
        onClick={() => toggleIsOpen()}
      >
        <div className={`label-container absolute populated`}>
          <label
            htmlFor={id}
            className={`input-label ${error ? 'text-error' : ''}`}
          >
            {label}
          </label>
        </div>
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
        <div
          onClick={() => {
            setIsOpen(!isOpen)
          }}
        ></div>
        <input
          id={id}
          name={name}
          value={selectedDate ? selectedDate.toISOString() : ''}
          type="hidden"
          onChange={() => {}}
        ></input>
      </div>
      <div className="padding-x-lg">
        <span
          className={`font-size-caption text-secondary ${error ? 'text-error' : ''}`}
        >
          {helperText}
        </span>
      </div>
      <div
        className={`z-top min-width-lg calendar-container border-rounded-sm box-shadow-medium absolute width-full flex justify-center transition-bezier-fast animated-content ${isOpen ? 'open' : ''}`}
      >
        <CustomCalendar
          activeView={activeView}
          calendarDays={calendarDays}
          viewTogglers={viewTogglers}
          dateIndice={dateIndice}
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          changeSelectedYear={changeSelectedYear}
          changeSelectedMonth={changeSelectedMonth}
          handleDateSelect={handleDateSelect}
          closeDatePicker={closeDatePicker}
        ></CustomCalendar>
      </div>
    </div>
  )
}

export default DatePickerOutline
