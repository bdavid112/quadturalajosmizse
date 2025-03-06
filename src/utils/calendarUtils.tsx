import { t } from './translator'

export const generateCalendarDays = (date: Date, lang: string = 'hu') => {
  const year = date.getFullYear()
  const month = date.getMonth()

  const firstDayOfMonth = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const calendarDays: (number | null)[] = []

  // Fill the blank days according to calendar format
  let i = lang == 'hu' ? 1 : 0

  // Fill in blank days from previous month
  for (i; i < firstDayOfMonth; i++) {
    calendarDays.push(null)
  }

  // Fill in actual days
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
    yearOptions.push({ label: i.toString(), value: i })
  }
  return yearOptions
}

/* Generate localized month option objects */

export const generateMonthOptions = (lang: string) => {
  const monthOptions = []
  for (let i = 0; i < 12; i++) {
    const month = t(`ui.calendar.months.long.${i}`, lang)
    monthOptions.push({ label: month, value: i })
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
  if (newValue < minValue) {
    while (newValue + increment <= maxValue) {
      newValue += increment
    }
  } else if (newValue > maxValue) {
    while (newValue - increment >= minValue) {
      newValue -= increment
    }
  }
  return newValue
}

export const jumpDay = (
  minValue: number,
  maxValue: number,
  newValue: number
) => {
  if (newValue <= 0) {
    newValue = maxValue
  } else if (newValue > maxValue) {
    newValue = minValue
  }
  return newValue
}
