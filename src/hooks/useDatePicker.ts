import { useEffect, useRef, useState } from 'react'
import { generateCalendarDays } from '../utils/calendarUtils'

export const useDatePicker = (
  lang: string,
  name: string,
  minYear: number,
  maxYear: number,
  defaultValue?: Date,
  handleOnChange?: (name: string, value: string) => void
) => {
  /* Current date for initializing calendar */
  const currentDate = new Date()

  /* State variables */

  const [isOpen, setIsOpen] = useState(false)
  const [touched, setTouched] = useState(false)
  const [activeView, setActiveView] = useState('date')
  const [calendarDays, setCalendarDays] = useState(
    generateCalendarDays(currentDate, lang)
  )
  const [selectedDate, setSelectedDate] = useState(
    defaultValue ? defaultValue : null
  )
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear())
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth())

  /* Function to close the date picker */

  const closeDatePicker = () => setIsOpen(false)

  /* Refs */

  const containerRef = useRef<HTMLDivElement>(null)

  /* Handle selecting an option */

  const onDateSelect = (date: Date) => {
    setSelectedDate(date)
    handleOnChange && handleOnChange(name, date.toLocaleDateString())
    setIsOpen(false)
    setTouched(true)
  }

  /* Increase/decrease the value of selected year and month on left and right arrow button clicks within the bounds  */

  const changeSelectedYear = (newValue: number, clicked?: boolean) => {
    if (newValue >= minYear && newValue <= maxYear) setSelectedYear(newValue)
    if (clicked) toggleYearView()
  }

  const changeSelectedMonth = (newValue: number, clicked?: boolean) => {
    if (newValue > 11) {
      newValue = 0
      changeSelectedYear(selectedYear + 1)
    }
    if (newValue < 0) {
      newValue = 11
      changeSelectedYear(selectedYear - 1)
    }
    setSelectedMonth(newValue)
    if (clicked) toggleMonthView()
  }

  /* Generate new calendar days on chaning the selected year or month */

  useEffect(() => {
    setCalendarDays(
      generateCalendarDays(new Date(selectedYear, selectedMonth), lang)
    )
  }, [selectedYear, selectedMonth])

  /* Helper function to toggle isOpen state */

  const toggleIsOpen = () => {
    setIsOpen(!isOpen)
  }

  /* Helper functions to toggle views */

  const toggleYearView = () => {
    if (activeView != 'year') setActiveView('year')
    else setActiveView('date')
  }

  const toggleMonthView = () => {
    if (activeView != 'month') setActiveView('month')
    else setActiveView('date')
  }

  const viewTogglers = [toggleYearView, toggleMonthView]

  return {
    isOpen,
    setIsOpen,
    touched,
    setTouched,
    selectedDate,
    selectedYear,
    setSelectedYear,
    selectedMonth,
    setSelectedMonth,
    activeView,
    calendarDays,
    containerRef,
    viewTogglers,
    toggleIsOpen,
    closeDatePicker,
    onDateSelect,
    changeSelectedYear,
    changeSelectedMonth,
  }
}
