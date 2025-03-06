import * as React from 'react'
import InputButton from '../buttons/InputButton'
import { formatMonthToString } from '../../../utils/calendarUtils'
import { useCustomCalendar } from '../../../hooks/useCustomCalendar'
import CalendarDayView from './CalendarDayView'
import CalendarYearView from './CalendarYearView'
import CalendarMonthView from './CalendarMonthView'

import '/src/styles/utilities.scss'
import './custom-calendar.scss'

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
  /* Custom hook to handle logic */

  const {
    selectedYear,
    changeSelectedYear,
    selectedMonth,
    changeSelectedMonth,
    yearView,
    setYearView,
    monthView,
    setMonthView,
  } = useCustomCalendar(lang, currentDate, minYear, maxYear)

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
        <CalendarDayView
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          onDateSelect={onDateSelect}
        ></CalendarDayView>
      )}
      {yearView && (
        <CalendarYearView
          selectedYear={selectedYear}
          handleOptionClick={changeSelectedYear}
        ></CalendarYearView>
      )}
      {monthView && (
        <CalendarMonthView
          lang={lang}
          selectedMonth={selectedMonth}
          handleOptionClick={changeSelectedMonth}
        ></CalendarMonthView>
      )}
    </div>
  )
}

export default CustomCalendar
