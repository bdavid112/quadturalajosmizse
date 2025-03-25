import { useEffect, useRef, useState } from 'react'
import { generateCalendarDays } from '@utils/calendarUtils'
import axios from 'axios'

export const useDatePicker = (
  lang: string,
  name: string,
  minYear: number,
  maxYear: number,
  defaultValue?: Date,
  handleOnChange?: (name: string, value: string) => void
) => {
  /* Allowed time blocks for bookings */
  const allowedTimes = [9, 12, 15, 18]

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
  const [selectedDay, setSelectedDay] = useState(currentDate.getDate())
  const [selectedTime, setSelectedTime] = useState<number | null>(null)

  /* Function to close the date picker */

  const closeDatePicker = () => {
    setActiveView('date')
    setIsOpen(false)
  }

  /* Refs */

  const containerRef = useRef<HTMLDivElement>(null)

  /* Handle selecting an option */

  const [takenDates, setTakenDates] = useState<Date[]>([])

  useEffect(() => {
    axios
      .get('/api/bookings/upcoming')
      .then((res) => {
        const dates = res.data.map((booking: any) => new Date(booking.date))
        setTakenDates(dates)
      })
      .catch((err) => console.error('Error fetching bookings:', err))
  }, [])

  const isTakenDate = (day: number) => {
    return allowedTimes.every((hour) =>
      takenDates.some(
        (d) =>
          d.getFullYear() === selectedYear &&
          d.getMonth() === selectedMonth &&
          d.getDate() === day &&
          d.getHours() === hour
      )
    )
  }

  const isTakenTime = (time: number) => {
    return takenDates.some(
      (d) =>
        d.getFullYear() === selectedYear &&
        d.getMonth() === selectedMonth &&
        d.getDate() === selectedDay &&
        d.getHours() === time
    )
  }

  const isWeekend = (day: number) => {
    const date = new Date(selectedYear, selectedMonth, day)
    return (
      date.getMonth() === selectedMonth &&
      (date.getDay() === 0 || date.getDay() === 6)
    )
  }

  const isPast = (date: Date) => {
    return date < new Date()
  }

  const onDateSelect = (date: Date) => {
    if (
      isTakenDate(date.getDate()) ||
      !isWeekend(date.getDate()) ||
      isPast(date)
    ) {
      return
    }
    setSelectedTime(null)
    setActiveView('time')
    setSelectedDay(date.getDate())
    setTouched(true)
  }

  useEffect(() => {
    if (selectedTime && allowedTimes.includes(selectedTime)) {
      const date = new Date(
        selectedYear,
        selectedMonth,
        selectedDay,
        selectedTime
      )
      setSelectedDate(date)
      handleOnChange && handleOnChange(name, date.toISOString())
      setActiveView('date')
      setIsOpen(false)
    }
  }, [selectedTime])

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
    setSelectedTime,
    isTakenDate,
    isTakenTime,
    isWeekend,
    isPast,
  }
}
