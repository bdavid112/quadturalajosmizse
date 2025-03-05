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

export const formatMonthToString = (month: number, lang: string = 'hu') => {
  return t(`ui.calendar.months.${month}`, lang)
}
