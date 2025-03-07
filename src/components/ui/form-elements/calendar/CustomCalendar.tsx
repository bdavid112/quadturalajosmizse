import * as React from 'react'
import { formatMonthToString } from '../../../../utils/calendarUtils'
import { useCustomCalendar } from '../../../../hooks/useCustomCalendar'
import CalendarDayView from './CalendarDayView'
import CalendarYearView from './CalendarYearView'
import CalendarMonthView from './CalendarMonthView'

import '/src/styles/utilities.scss'
import './custom-calendar.scss'
import ButtonTriad from '../../buttons/ButtonTriad'

interface Props {
  lang?: string
  currentDate?: Date
  minYear?: number
  maxYear?: number
  onDateSelect?: (date: Date) => void
  closeDatePicker: () => void
}

const CustomCalendar: React.FunctionComponent<Props> = ({
  lang = 'hu',
  currentDate = new Date(),
  minYear = 2000,
  maxYear = 2100,
  onDateSelect,
  closeDatePicker,
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
    <div className="padding-x-md padding-y-md calendar-container">
      <div
        className={`col-7 flex justify-between ${lang == 'en' ? 'flex-row-reverse' : ''}`}
      >
        <ButtonTriad
          allVisible={!yearView && !monthView}
          small={true}
          label={selectedYear.toString()}
          isParentOpen={yearView}
          handleLeftClick={() => {
            changeSelectedYear(selectedYear - 1)
          }}
          handleMiddleClick={() => {
            setYearView(!yearView)
            setMonthView(false)
          }}
          handleRightClick={() => {
            changeSelectedYear(selectedYear + 1)
          }}
        ></ButtonTriad>
        <ButtonTriad
          allVisible={!yearView && !monthView}
          small={true}
          label={formatMonthToString(selectedMonth, lang, true)}
          isParentOpen={monthView}
          handleLeftClick={() => {
            changeSelectedMonth(selectedMonth - 1)
          }}
          handleMiddleClick={() => {
            setYearView(false)
            setMonthView(!monthView)
          }}
          handleRightClick={() => {
            changeSelectedMonth(selectedMonth + 1)
          }}
        ></ButtonTriad>
      </div>
      <div className="view-container">
        {!yearView && !monthView && (
          <div className="calendar-grid">
            <CalendarDayView
              selectedYear={selectedYear}
              selectedMonth={selectedMonth}
              onDateSelect={onDateSelect}
              closeDatePicker={closeDatePicker}
            ></CalendarDayView>
          </div>
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
    </div>
  )
}

export default CustomCalendar
