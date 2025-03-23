import './date-picker-outline.scss'

import * as React from 'react'
import InputButton from '../buttons/InputButton'
import CustomCalendar from './calendar/CustomCalendar'
import { t } from '../../../utils/translator'
import { useDatePicker } from '../../../hooks/useDatePicker'
import { useAutoClose } from '../../../hooks/useAutoClose'
import { useDatePickerKeyboardNav } from '../../../hooks/useDatePickerKeyboardNav'
import { useLocalization } from '../../../context/LocalizationContext'
import { formatDateForInput } from '@utils/formatText'

interface Props {
  id: string
  name: string
  label: string
  errorMessage?: string | null
  helperText: string
  defaultValue?: Date
  minYear?: number
  maxYear?: number
  handleOnChange?: (name: string, value: string) => void
}

const DatePickerOutline: React.FunctionComponent<Props> = ({
  id,
  name,
  label,
  errorMessage,
  helperText,
  defaultValue,
  minYear = 2000,
  maxYear = 2100,
  handleOnChange,
}) => {
  const { lang } = useLocalization()

  /* Date picker state manager */

  const {
    isOpen,
    setIsOpen,
    touched,
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
    isTaken,
    isWeekend,
    isPast,
  } = useDatePicker(lang, name, minYear, maxYear, defaultValue, handleOnChange)

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
        className={`z-overlay flex cursor-pointer align-center min-height-md relative input-container border background-transparent ${isOpen ? 'input-focused' : ''} ${touched && !errorMessage ? 'border-success' : ''} ${errorMessage ? 'border-error outline-error' : ''}`}
        tabIndex={0}
        onKeyDown={(e) => {
          handleKeyDown(e)
        }}
        onKeyUp={(e) => {
          handleKeyUp(e)
        }}
        onClick={() => toggleIsOpen()}
        onBlur={() => {
          handleOnChange &&
            !isOpen &&
            handleOnChange(
              name,
              selectedDate ? selectedDate.toLocaleDateString() : ''
            )
        }}
      >
        <div className={`label-container absolute populated`}>
          <label
            htmlFor={id}
            className={`input-label ${touched && !errorMessage ? 'text-success' : ''} ${errorMessage ? 'text-error' : ''}`}
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
          value={
            selectedDate ? formatDateForInput(selectedDate.toISOString()) : ''
          }
          type="date"
          onChange={() => {}}
          disabled={true}
          className="hidden"
        ></input>
      </div>
      <div className="padding-x-lg">
        <span
          className={`helper-text font-size-caption text-secondary ${errorMessage ? 'text-error' : ''}`}
        >
          {errorMessage ? errorMessage : helperText}
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
          isTaken={isTaken}
          isWeekend={isWeekend}
          isPast={isPast}
        ></CustomCalendar>
      </div>
    </div>
  )
}

export default DatePickerOutline
