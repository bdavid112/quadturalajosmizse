import * as React from 'react'
import InputButton from '../buttons/InputButton'
import {
  generateCalendarDays,
  formatMonthToString,
} from '../../../utils/calendarDayGenerator'
import { t } from '../../../utils/translator'
import { useEffect, useRef, useState } from 'react'

import '/src/styles/utilities.scss'
import './custom-calendar.scss'
import CustomOption from './CustomOption'

interface Props {
  onClick?: () => void
  currentDate?: Date
  minYear?: number
  maxYear?: number
  lang?: string
}

const CustomCalendar: React.FunctionComponent<Props> = ({
  onClick,
  currentDate = new Date(),
  minYear = 2000,
  maxYear = 2100,
  lang = 'hu',
}) => {
  /* Dict of day labels localized to selected language */

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

  /* Array of options for year selecting */

  const yearOptions = []
  for (let i = minYear; i <= maxYear; i++) {
    yearOptions.push({ label: i.toString(), value: i })
  }

  /* State variables */

  const [calendarDays, setCalendarDays] = useState(
    generateCalendarDays(currentDate, lang)
  )
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear())
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth())
  const [yearView, setYearView] = useState(true)
  const [monthView, setMonthView] = useState(false)

  /* Refs */

  const currentYearOptionRef = useRef<HTMLDivElement>(null)

  /* Effects */

  useEffect(() => {
    setCalendarDays(
      generateCalendarDays(new Date(selectedYear, selectedMonth), lang)
    )
  }, [selectedYear, selectedMonth])

  useEffect(() => {
    if (yearView && currentYearOptionRef.current) {
      currentYearOptionRef.current.scrollIntoView({
        behavior: 'instant',
        block: 'center',
      })
    }
  }, [yearView])

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
          <div className="flex align-center justify-center min-width-xs">
            {!yearView && !monthView && (
              <InputButton
                icon="keyboard_arrow_left"
                rounded="border-rounded-full-left"
                small={true}
                onClick={() => {
                  changeSelectedYear(selectedYear - 1)
                }}
              ></InputButton>
            )}
            <InputButton
              icon="keyboard_arrow_down"
              label={selectedYear.toString()}
              small={true}
              rotate={true}
              onClick={() => {
                setYearView(!yearView)
              }}
            ></InputButton>
            {!yearView && !monthView && (
              <InputButton
                icon="keyboard_arrow_right"
                rounded="border-rounded-full-right"
                small={true}
                onClick={() => {
                  changeSelectedYear(selectedYear + 1)
                }}
              ></InputButton>
            )}
          </div>
          <div className="flex align-center justify-center min-width-xs">
            {!yearView && !monthView && (
              <InputButton
                icon="keyboard_arrow_left"
                rounded="border-rounded-full-left"
                small={true}
                onClick={() => {
                  changeSelectedMonth(selectedMonth - 1)
                }}
              ></InputButton>
            )}
            <InputButton
              icon="keyboard_arrow_down"
              label={formatMonthToString(selectedMonth, lang)}
              small={true}
            ></InputButton>
            {!yearView && !monthView && (
              <InputButton
                icon="keyboard_arrow_right"
                rounded="border-rounded-full-right"
                small={true}
                onClick={() => {
                  changeSelectedMonth(selectedMonth + 1)
                }}
              ></InputButton>
            )}
          </div>
        </div>
      </div>
      {!yearView && (
        <>
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
        </>
      )}
      {yearView && (
        <>
          <div className="calendar-row">
            <div className="divider-gray solid col-7 margin-y-sm"></div>
          </div>
          <div className="max-height-lg col-7 overflow-y-scroll">
            {yearOptions.map((year, index) => {
              const refProp =
                year.value == selectedYear ? { ref: currentYearOptionRef } : {}

              return (
                <div key={index} {...refProp}>
                  <CustomOption
                    option={{ label: year.label, value: year.value }}
                    isActive={false}
                    isFocused={false}
                    icon="check"
                    isSelected={year.value == selectedYear}
                    onClick={() => {
                      setSelectedYear(year.value)
                      setYearView(false)
                    }}
                  ></CustomOption>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

export default CustomCalendar
