import * as React from 'react'
import InputButton from '../buttons/InputButton'
import {
  generateCalendarDays,
  formatMonthToString,
} from '../../../utils/calendarDayGenerator'
import { t } from '../../../utils/translator'
import { useEffect, useState } from 'react'

import '/src/styles/utilities.scss'
import './custom-calendar.scss'

interface Props {
  onClick?: () => void
  currentDate?: Date
  minYear?: number
  maxYear?: number
  lang?: string
}

const CustomOption: React.FunctionComponent<Props> = ({
  onClick,
  currentDate = new Date(),
  minYear = 1900,
  maxYear = 2100,
  lang = 'hu',
}) => {
  const dayLabels = [
    {
      label: t(`ui.calendar.days.0`, lang),
      isWeekendDay: lang == 'en' ? true : false,
    },
    { label: t(`ui.calendar.days.1`, lang) },
    { label: t(`ui.calendar.days.2`, lang) },
    { label: t(`ui.calendar.days.3`, lang) },
    { label: t(`ui.calendar.days.4`, lang) },
    {
      label: t(`ui.calendar.days.5`, lang),
      isWeekendDay: lang == 'hu' ? true : false,
    },
    { label: t(`ui.calendar.days.6`, lang), isWeekendDay: true },
  ]

  const [calendarDays, setCalendarDays] = useState(
    generateCalendarDays(currentDate, lang)
  )
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear())
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth())

  useEffect(() => {
    setCalendarDays(
      generateCalendarDays(new Date(selectedYear, selectedMonth), lang)
    )
  }, [selectedYear, selectedMonth])

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

  /* Helper function to style the current day in the calendar */

  const isToday = (day: number) => {
    return (
      selectedYear == currentDate.getFullYear() &&
      selectedMonth == currentDate.getMonth() &&
      day == currentDate.getDate()
    )
  }

  return (
    <div className="calendar-grid padding-x-md padding-y-md">
      <div className="calendar-row">
        <div
          className={`col-7 flex justify-between ${lang == 'en' ? 'flex-row-reverse' : ''}`}
        >
          <div className="flex align-center">
            <InputButton
              icon="keyboard_arrow_left"
              rounded="border-rounded-full-left"
              small={true}
              onClick={() => {
                changeSelectedYear(selectedYear - 1)
              }}
            ></InputButton>
            <InputButton
              icon="keyboard_arrow_down"
              label={selectedYear.toString()}
              small={true}
            ></InputButton>
            <InputButton
              icon="keyboard_arrow_right"
              rounded="border-rounded-full-right"
              small={true}
              onClick={() => {
                changeSelectedYear(selectedYear + 1)
              }}
            ></InputButton>
          </div>
          <div className="flex align-center">
            <InputButton
              icon="keyboard_arrow_left"
              rounded="border-rounded-full-left"
              small={true}
              onClick={() => {
                changeSelectedMonth(selectedMonth - 1)
              }}
            ></InputButton>
            <InputButton
              icon="keyboard_arrow_down"
              label={formatMonthToString(selectedMonth, lang)}
              small={true}
            ></InputButton>
            <InputButton
              icon="keyboard_arrow_right"
              rounded="border-rounded-full-right"
              small={true}
              onClick={() => {
                changeSelectedMonth(selectedMonth + 1)
              }}
            ></InputButton>
          </div>
        </div>
      </div>
      <div className="calendar-row calendar-headrow">
        {dayLabels.map((day, index) => (
          <div key={index} className="flex justify-center align-center">
            <span
              className={`font-medium ${day.isWeekendDay ? 'text-error' : ''}`}
            >
              {day.label}
            </span>
          </div>
        ))}
      </div>
      <div className="calendar-row">
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`relative calendar-cell flex align-center justify-center transition-ease-out ${!day ? 'cursor-default' : ''} ${day && isToday(day) ? 'calendar-today' : ''}`}
          >
            <p className="z-overlay">{day ? day : ''}</p>
            {day && (
              <div className="absolute calendar-cell-background width-full height-full z-base"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CustomOption
