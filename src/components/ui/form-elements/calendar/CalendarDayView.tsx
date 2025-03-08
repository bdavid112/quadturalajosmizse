import '/src/styles/utilities.scss'
import './custom-calendar.scss'

import * as React from 'react'
import { isToday } from '../../../../utils/calendarUtils'
import { useCalendarDayView } from '../../../../hooks/useCalendarDayView'

interface Props {
  selectedYear: number
  selectedMonth: number
  calendarDays: (number | null)[]
  dateIndice: number[]
  handleDateSelect?: (date: Date) => void
  closeDatePicker: () => void
}

const CalendarDayView: React.FunctionComponent<Props> = ({
  selectedYear,
  selectedMonth,
  calendarDays,
  dateIndice,
  handleDateSelect,
}) => {
  const { dayLabels, focusedDateIndex, activeDateIndex } = useCalendarDayView(
    calendarDays,
    dateIndice
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
            className={`relative calendar-cell flex align-center justify-center transition-bezier-fast ${day == focusedDateIndex ? 'calendar-cell-focus' : ''} ${day == activeDateIndex ? 'calendar-cell-active' : ''} ${!day ? 'cursor-default' : ''} ${day && isToday(selectedYear, selectedMonth, day) ? 'calendar-today' : ''}`}
            onClick={() => {
              if (handleDateSelect && day) {
                handleDateSelect(new Date(selectedYear, selectedMonth, day))
              }
            }}
            role="button"
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
