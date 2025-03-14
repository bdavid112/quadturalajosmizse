import { useState } from 'react'
import { jumpDay, jumpWeek } from '@utils/calendarUtils'

export const useDatePickerKeyboardNav = (
  isParentOpen: boolean,
  setIsParentOpen: React.Dispatch<React.SetStateAction<boolean>>,
  calendarDays: (number | null)[],
  selectedYear: number,
  selectedMonth: number,
  changeSelectedMonth: (newValue: number) => void,
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

  /* Set index values only within bounds */

  const setIndex = (
    newValue: number,
    minValue: number,
    maxValue: number,
    setter: React.Dispatch<React.SetStateAction<number>>,
    week: boolean = false
  ) => {
    const result = week
      ? jumpWeek(minValue, maxValue, newValue, 7)
      : jumpDay(minValue, maxValue, newValue)

    if (result.prevMonth) {
      const prevMonthLength = new Date(selectedYear, selectedMonth, 0).getDate()

      changeSelectedMonth(selectedMonth - 1)
      result.value = prevMonthLength
    } else if (result.nextMonth) {
      changeSelectedMonth(selectedMonth + 1)
      result.value = 1
    }
    setter(result.value)
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

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement> | KeyboardEvent
  ) => {
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
      e.preventDefault()
      setIndex(
        focusedDateIndex + directionMap[e.key],
        1,
        filteredCalendarDays.length,
        setFocusedDateIndex,
        e.key.includes('ArrowUp') || e.key.includes('ArrowDown')
      )
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

  const handleKeyUp = (
    e: React.KeyboardEvent<HTMLDivElement> | KeyboardEvent
  ) => {
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
    handleKeyDown,
    handleKeyUp,
    handleDateSelect,
  }
}
