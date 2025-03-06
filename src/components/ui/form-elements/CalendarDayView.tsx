import * as React from 'react'
import { isToday } from '../../../utils/calendarUtils'

import '/src/styles/utilities.scss'
import './custom-calendar.scss'
import { useCalendarDayView } from '../../../hooks/useCalendarDayView'

interface Props {
  lang?: string
  selectedYear: number
  selectedMonth: number
  onDateSelect?: (date: Date) => void
}

const CalendarDayView: React.FunctionComponent<Props> = ({
  lang = 'hu',
  selectedYear,
  selectedMonth,
  onDateSelect: onDateSelect,
}) => {
  const {
    dayLabels,
    setFocusedDateIndex,
    activeDateIndex,
    calendarDays,
    dateRefs,
    handleKeyDown,
    handleKeyUp,
  } = useCalendarDayView(
    lang,
    new Date(selectedYear, selectedMonth),
    onDateSelect
  )

  return (
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
            className={`relative calendar-cell flex align-center justify-center transition-ease-out ${day == activeDateIndex ? 'calendar-cell-active' : ''} ${!day ? 'cursor-default' : ''} ${day && isToday(selectedYear, selectedMonth, day) ? 'calendar-today' : ''}`}
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
  )
}

export default CalendarDayView
