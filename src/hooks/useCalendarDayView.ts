import { useState, useEffect, useRef } from 'react'
import {
  generateCalendarDays,
  generateDayLabels,
  jumpDay,
  jumpWeek,
} from '../utils/calendarUtils'

export const useCalendarDayView = (
  lang: string,
  currentDate: Date,
  onDateSelect?: (date: Date) => void
) => {
  /* Array of localized calendar days of the selected month */

  const calendarDays = generateCalendarDays(currentDate, lang)

  /* Array of day localized labels */

  const dayLabels = generateDayLabels(lang)

  /* State variables */

  const [focusedDateIndex, setFocusedDateIndex] = useState(0)
  const [activeDateIndex, setActiveDateIndex] = useState(0)

  /* Refs */

  const dateRefs = useRef<(HTMLDivElement | null)[]>([])

  /* Auto-focus on the newly selected date */

  useEffect(() => {
    if (focusedDateIndex) {
      dateRefs.current[focusedDateIndex]?.focus()
    }
    console.log(dateRefs)
  }, [focusedDateIndex])

  /* Set values only within bounds */

  const changeDateIndex = (
    newValue: number,
    setter: React.Dispatch<React.SetStateAction<number>>,
    week: boolean = false
  ) => {
    const filteredCalendarDays = calendarDays.filter((day) => day != null)
    const monthLenght = filteredCalendarDays.length
    const weekLenght = dayLabels.length

    week
      ? setter(jumpWeek(1, monthLenght, newValue, weekLenght))
      : setter(jumpDay(1, monthLenght, newValue))
  }

  /* Handle keyboard navigation */

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const directionMap: Record<string, number> = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -dayLabels.length,
      ArrowDown: dayLabels.length,
    }

    if (directionMap[e.key] !== undefined) {
      e.preventDefault()
      changeDateIndex(
        focusedDateIndex + directionMap[e.key],
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

  const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'Enter':
        if (activeDateIndex > 0 && activeDateIndex <= calendarDays.length) {
          e.preventDefault()
          onDateSelect &&
            onDateSelect(
              new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                activeDateIndex
              )
            )
          setActiveDateIndex(0)
          setFocusedDateIndex(0)
        }
        break
    }
  }

  return {
    dayLabels,
    setFocusedDateIndex,
    activeDateIndex,
    calendarDays,
    dateRefs,
    handleKeyDown,
    handleKeyUp,
  }
}
