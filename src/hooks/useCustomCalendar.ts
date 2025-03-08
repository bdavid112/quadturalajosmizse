import { useState } from 'react'
import { generateMonthOptions } from '../utils/calendarUtils'

export const useCustomCalendar = (
  lang: string,
  currentDate: Date,
  minYear: number,
  maxYear: number
) => {
  /* Array of options for month selecting localized */

  const monthOptions = generateMonthOptions(lang)

  /* State variables */

  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear())
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth())

  /* Increase/decrease the value of selected year and month on left and right arrow button clicks within the bounds  */

  const changeSelectedYear = (newValue: number) => {
    if (newValue >= minYear && newValue <= maxYear) setSelectedYear(newValue)
  }

  const changeSelectedMonth = (newValue: number) => {
    if (newValue > 11) {
      newValue = 0
      changeSelectedYear(selectedYear + 1)
    }
    if (newValue < 0) {
      newValue = 11
      changeSelectedYear(selectedYear - 1)
    }
    setSelectedMonth(newValue)
  }

  return {
    selectedYear,
    changeSelectedYear,
    selectedMonth,
    changeSelectedMonth,
    monthOptions,
  }
}
