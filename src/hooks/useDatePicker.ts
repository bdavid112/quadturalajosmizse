import { useRef, useState } from 'react'
import { generateCalendarDays } from '../utils/calendarUtils'

export const useDatePicker = (
  lang: string,
  defaultValue?: Date,
  onChange?: (date: Date) => void
) => {
  /* Current date for initializing calendar */
  const currentDate = new Date()

  /* State variables */

  const [isOpen, setIsOpen] = useState(true)
  const [activeView, setActiveView] = useState('date')
  const [selectedDate, setSelectedDate] = useState(
    defaultValue ? defaultValue : null
  )
  const [calendarDays, setCalendarDays] = useState(
    generateCalendarDays(currentDate, lang)
  )

  /* Callback function to close the date picker */

  const closeDatePicker = () => setIsOpen(false)

  /* Refs */

  const containerRef = useRef<HTMLDivElement>(null)

  /* Handle selecting an option */

  const onDateSelect = (date: Date) => {
    setSelectedDate(date)
    onChange && onChange(date)
    setIsOpen(false)
  }

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
    selectedDate,
    activeView,
    calendarDays,
    containerRef,
    viewTogglers,
    toggleIsOpen,
    closeDatePicker,
    onDateSelect,
  }
}
