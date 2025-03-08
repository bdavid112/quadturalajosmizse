import { useState } from 'react'
import { jumpDay, jumpWeek } from '../utils/calendarUtils'

export const useDatePickerKeyboardNav = (
  isParentOpen: boolean,
  calendarDays: (number | null)[],
  activeView: string,
  setIsParentOpen: React.Dispatch<React.SetStateAction<boolean>>,
  onDateSelect?: (date: Date) => void
) => {
  /* Get the actual date for intitial opening (the first focus is going to be today's date) */

  const currentDate = new Date()

  /* Filter out null values (blank spaces) from calendar days */

  const filteredCalendarDays = calendarDays.filter((e) => e != null)

  /* Track the current focus of dates */

  const [selectedDateIndex, setSelectedDateIndex] = useState(
    filteredCalendarDays.indexOf(currentDate.getDate()) + 1
  )
  const [focusedDateIndex, setFocusedDateIndex] = useState(0)
  const [activeDateIndex, setActiveDateIndex] = useState(0)

  const dateIndice = [focusedDateIndex, activeDateIndex]

  /* Track the current focus of year options */

  const [selectedYearIndex, setSelectedYearIndex] = useState(
    currentDate.getFullYear()
  )
  const [focusedYearIndex, setFocusedYearIndex] = useState(0)
  const [activeYearIndex, setActiveYearIndex] = useState(0)

  const yearIndice = [focusedYearIndex, activeYearIndex]

  /* Set index values only within bounds */

  const setIndex = (
    newValue: number,
    setter: React.Dispatch<React.SetStateAction<number>>,
    week: boolean = false
  ) => {
    const filteredCalendarDays = calendarDays.filter((day) => day != null)
    const monthLenght = filteredCalendarDays.length

    week
      ? setter(jumpWeek(1, monthLenght, newValue, 7))
      : setter(jumpDay(1, monthLenght, newValue))
  }

  /* Handle selecting a date */

  const handleDateSelect = (date: Date) => {
    if (date) {
      onDateSelect && onDateSelect(new Date(date))
      setSelectedDateIndex(filteredCalendarDays.indexOf(date.getDate()) + 1)
      setActiveDateIndex(0)
      setFocusedDateIndex(0)
      setIsParentOpen && setIsParentOpen(false)
    }
  }

  /* Handle keyboard navigation */

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isParentOpen && e.key === 'Enter') {
      e.preventDefault()
      setIsParentOpen(true)
      selectedDateIndex >= 1
        ? setFocusedDateIndex(selectedDateIndex)
        : setFocusedDateIndex(1)
      return
    }

    const directionMap: Record<string, number> = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -7,
      ArrowDown: 7,
    }

    if (directionMap[e.key] !== undefined) {
      if (activeView == 'date') {
        e.preventDefault()
        setIndex(
          focusedDateIndex + directionMap[e.key],
          setFocusedDateIndex,
          e.key.includes('ArrowUp') || e.key.includes('ArrowDown')
        )
      }
    }

    if (
      e.key === 'Enter' &&
      focusedDateIndex > 0 &&
      focusedDateIndex <= calendarDays.length
    ) {
      e.preventDefault()
      setActiveDateIndex(focusedDateIndex)
    }
  }

  const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'Enter':
        if (activeDateIndex > 0 && activeDateIndex <= calendarDays.length) {
          e.preventDefault()
          handleDateSelect(
            new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              activeDateIndex
            )
          )
        }
        break
    }
  }

  return {
    dateIndice,
    yearIndice,
    handleKeyDown,
    handleKeyUp,
    handleDateSelect,
  }
}
