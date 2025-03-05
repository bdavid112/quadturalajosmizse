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
  lang?: string
  currentDate?: Date
  minYear?: number
  maxYear?: number
  onDateSelect?: (date: Date) => void
}

const CustomCalendar: React.FunctionComponent<Props> = ({
  lang = 'hu',
  currentDate = new Date(),
  minYear = 2000,
  maxYear = 2100,
  onDateSelect: onDateSelect,
}) => {
  /* Array of day labels localized */

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

  /* Array of options for month selecting localized */

  const monthOptions = []
  for (let i = 0; i < 12; i++) {
    const month = t(`ui.calendar.months.long.${i}`, lang)
    monthOptions.push({ label: month, value: i })
  }

  /* State variables */

  const [calendarDays, setCalendarDays] = useState(
    generateCalendarDays(currentDate, lang)
  )
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear())
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth())
  const [yearView, setYearView] = useState(false)
  const [monthView, setMonthView] = useState(false)
  const [focusedDateIndex, setFocusedDateIndex] = useState(0)
  const [activeDateIndex, setActiveDateIndex] = useState(0)

  /* Refs */

  const selectedYearOptionRef = useRef<HTMLDivElement>(null)
  const selectedMonthOptionRef = useRef<HTMLDivElement>(null)
  const dateRefs = useRef<(HTMLDivElement | null)[]>([])

  /* Effects */

  useEffect(() => {
    setCalendarDays(
      generateCalendarDays(new Date(selectedYear, selectedMonth), lang)
    )
  }, [selectedYear, selectedMonth])

  useEffect(() => {
    if (yearView && selectedYearOptionRef.current) {
      selectedYearOptionRef.current.scrollIntoView({
        behavior: 'instant',
        block: 'center',
      })
    }
  }, [yearView])

  useEffect(() => {
    if (monthView && selectedMonthOptionRef.current) {
      selectedMonthOptionRef.current.scrollIntoView({
        behavior: 'instant',
        block: 'center',
      })
    }
  }, [monthView])

  useEffect(() => {
    if (focusedDateIndex) {
      dateRefs.current[focusedDateIndex]?.focus()
    }
    console.log(dateRefs)
  }, [focusedDateIndex])

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

  /* Handles for keyboard navigation */

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault()
        changeDateIndex(focusedDateIndex - 1, setFocusedDateIndex)
        break
      case 'ArrowRight':
        e.preventDefault()
        changeDateIndex(focusedDateIndex + 1, setFocusedDateIndex)
        break
      case 'ArrowUp':
        e.preventDefault()
        changeDateIndex(
          focusedDateIndex - dayLabels.length,
          setFocusedDateIndex,
          true
        )
        break
      case 'ArrowDown':
        e.preventDefault()
        changeDateIndex(
          focusedDateIndex + dayLabels.length,
          setFocusedDateIndex,
          true
        )
        break
      case 'Enter':
        if (focusedDateIndex > 0 && focusedDateIndex <= calendarDays.length) {
          e.preventDefault()
          setActiveDateIndex(focusedDateIndex)
        }
        break
    }
  }

  const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'Enter':
        if (activeDateIndex > 0 && activeDateIndex <= calendarDays.length) {
          e.preventDefault()
          onDateSelect &&
            onDateSelect(new Date(selectedYear, selectedMonth, activeDateIndex))
          setActiveDateIndex(0)
          setFocusedDateIndex(0)
        }
        break
    }
  }

  /* Helper functions */

  // Style the current day in the calendar

  const isToday = (day: number) => {
    return (
      selectedYear == currentDate.getFullYear() &&
      selectedMonth == currentDate.getMonth() &&
      day == currentDate.getDate()
    )
  }

  // Set values only within bounds

  /* TODO Tidy up */
  const changeDateIndex = (
    newValue: number,
    setter: React.Dispatch<React.SetStateAction<number>>,
    week: boolean = false
  ) => {
    const filteredCalendarDays = calendarDays.filter((day) => day != null)
    if (newValue <= 0) {
      if (week) {
        while (newValue + dayLabels.length <= filteredCalendarDays.length) {
          newValue = newValue + dayLabels.length
        }
      } else {
        newValue = filteredCalendarDays.length
      }
    }
    if (newValue > filteredCalendarDays.length) {
      if (week) {
        while (newValue - dayLabels.length > 0) {
          newValue = newValue - dayLabels.length
        }
      } else {
        newValue = 1
      }
    }
    setter(newValue)
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
              isParentOpen={yearView}
              onClick={() => {
                setYearView(!yearView)
                setMonthView(false)
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
              rotate={true}
              isParentOpen={monthView}
              onClick={() => {
                setYearView(false)
                setMonthView(!monthView)
              }}
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
      {!yearView && !monthView && (
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
                className={`relative calendar-cell flex align-center justify-center transition-ease-out ${day == activeDateIndex ? 'calendar-cell-active' : ''} ${!day ? 'cursor-default' : ''} ${day && isToday(day) ? 'calendar-today' : ''}`}
                ref={(el) => {
                  if (day) {
                    dateRefs.current[day] = el
                  }
                }}
                onClick={() => {
                  if (onDateSelect && day) {
                    onDateSelect(new Date(selectedYear, selectedMonth, day))
                  }
                }}
                onKeyDown={(e) => {
                  handleKeyDown(e)
                }}
                onKeyUp={(e) => {
                  handleKeyUp(e)
                }}
                onFocus={() => {
                  day && setFocusedDateIndex(day)
                }}
                role="button"
                tabIndex={day ? 0 : -1}
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
                year.value == selectedYear ? { ref: selectedYearOptionRef } : {}

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
      {monthView && (
        <>
          <div className="calendar-row">
            <div className="divider-gray solid col-7 margin-y-sm"></div>
          </div>
          <div className="max-height-lg col-7 overflow-y-scroll">
            {monthOptions.map((month, index) => {
              const refProp =
                month.value == selectedMonth
                  ? { ref: selectedMonthOptionRef }
                  : {}

              return (
                <div key={index} {...refProp}>
                  <CustomOption
                    option={{ label: month.label, value: month.value }}
                    isActive={false}
                    isFocused={false}
                    icon="check"
                    isSelected={month.value == selectedMonth}
                    onClick={() => {
                      setSelectedMonth(month.value)
                      setMonthView(false)
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
