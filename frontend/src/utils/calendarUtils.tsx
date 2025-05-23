import { t } from './translator'

export const generateCalendarDays = (date: Date, lang: string = 'hu') => {
  const year = date.getFullYear()
  const month = date.getMonth()

  let firstDayOfMonth = new Date(year, month, 1).getDay() // 0–6 (Sun–Sat)
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  // Adjust for Hungarian (week starts on Monday)
  if (lang === 'hu') {
    firstDayOfMonth = (firstDayOfMonth + 6) % 7
  }

  const calendarDays: (number | null)[] = []

  // Add blank days for alignment
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null)
  }

  // Add actual days
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  return calendarDays
}

/* Format month from number to string */

export const formatMonthToString = (
  month: number,
  lang: string = 'hu',
  short: boolean = true
) => {
  return short
    ? t(`ui.calendar.months.short.${month}`, lang)
    : t(`ui.calendar.months.long.${month}`, lang)
}

/* Decide whether a given date is today's date */

export const isToday = (year: number, month: number, day: number) => {
  const currentDate = new Date()
  return (
    year == currentDate.getFullYear() &&
    month == currentDate.getMonth() &&
    day == currentDate.getDate()
  )
}

/* Generate year option objects */

export const generateYearOptions = (minYear: number, maxYear: number) => {
  const yearOptions = []
  for (let i = minYear; i <= maxYear; i++) {
    yearOptions.push({ label: i.toString(), value: i.toString() })
  }
  return yearOptions
}

/* Generate localized month option objects */

export const generateMonthOptions = (lang: string) => {
  const monthOptions = []
  for (let i = 0; i < 12; i++) {
    const month = t(`ui.calendar.months.long.${i}`, lang)
    monthOptions.push({ label: month.toString(), value: i.toString() })
  }
  return monthOptions
}

/* Generate localized day label objects */

export const generateDayLabels = (lang: string) => {
  const dayLabels = []
  for (let i = 0; i < 7; i++) {
    const day = t(`ui.calendar.days.${i}`, lang)
    dayLabels.push({ label: day.label, isWeekendDay: day.weekend })
  }
  return dayLabels
}

/* Helper functions for keyboard navigation */

export const jumpWeek = (
  minValue: number,
  maxValue: number,
  newValue: number,
  increment: number
) => {
  let prevMonth = false
  let nextMonth = false

  if (newValue < minValue) {
    prevMonth = true
    while (newValue + increment <= maxValue) {
      newValue += increment
    }
  } else if (newValue > maxValue) {
    nextMonth = true
    while (newValue - increment >= minValue) {
      newValue -= increment
    }
  }

  return { value: newValue, prevMonth: prevMonth, nextMonth: nextMonth }
}

export const jumpDay = (
  minValue: number,
  maxValue: number,
  newValue: number
) => {
  let prevMonth = false
  let nextMonth = false

  if (newValue < minValue) {
    prevMonth = true
    newValue = maxValue
  } else if (newValue > maxValue) {
    nextMonth = true
    newValue = minValue
  }

  return { value: newValue, prevMonth: prevMonth, nextMonth: nextMonth }
}
