import '/src/styles/utilities.scss'
import './custom-calendar.scss'

import * as React from 'react'
import { formatMonthToString } from '../../../../utils/calendarUtils'
import { useCustomCalendar } from '../../../../hooks/useCustomCalendar'
import CalendarDayView from './CalendarDayView'
import CalendarYearView from './CalendarYearView'
import CalendarMonthView from './CalendarMonthView'
import ButtonTriad from '../../buttons/ButtonTriad'

interface Props {
  lang?: string
  currentDate?: Date
  minYear?: number
  maxYear?: number
  activeView: string
  calendarDays: (number | null)[]
  dateIndice: number[]
  yearIndice: number[]
  viewTogglers: (() => void)[]
  handleDateSelect?: (date: Date) => void
  closeDatePicker: () => void
}

const CustomCalendar: React.FunctionComponent<Props> = ({
  lang = 'hu',
  currentDate = new Date(),
  minYear = 2000,
  maxYear = 2100,
  activeView,
  calendarDays,
  dateIndice,
  yearIndice,
  viewTogglers,
  handleDateSelect,
  closeDatePicker,
}) => {
  /* Calendar state manager */

  const {
    selectedYear,
    changeSelectedYear,
    selectedMonth,
    changeSelectedMonth,
  } = useCustomCalendar(lang, currentDate, minYear, maxYear)

  return (
    <div className="padding-x-md padding-y-md calendar-container">
      <div
        className={`col-7 flex justify-between ${lang == 'en' ? 'flex-row-reverse' : ''}`}
      >
        <ButtonTriad
          allVisible={activeView == 'date'}
          small={true}
          label={selectedYear.toString()}
          isParentOpen={activeView == 'year'}
          handleLeftClick={() => {
            changeSelectedYear(selectedYear - 1)
          }}
          handleMiddleClick={viewTogglers[0]}
          handleRightClick={() => {
            changeSelectedYear(selectedYear + 1)
          }}
        ></ButtonTriad>
        <ButtonTriad
          allVisible={activeView == 'date'}
          small={true}
          label={formatMonthToString(selectedMonth, lang, true)}
          isParentOpen={activeView == 'month'}
          handleLeftClick={() => {
            changeSelectedMonth(selectedMonth - 1)
          }}
          handleMiddleClick={viewTogglers[1]}
          handleRightClick={() => {
            changeSelectedMonth(selectedMonth + 1)
          }}
        ></ButtonTriad>
      </div>
      <div className="view-container">
        {activeView == 'date' && (
          <div className="calendar-grid">
            <CalendarDayView
              calendarDays={calendarDays}
              selectedYear={selectedYear}
              selectedMonth={selectedMonth}
              dateIndice={dateIndice}
              handleDateSelect={handleDateSelect}
              closeDatePicker={closeDatePicker}
            ></CalendarDayView>
          </div>
        )}
        {activeView == 'year' && (
          <CalendarYearView
            selectedYear={selectedYear}
            yearIndice={yearIndice}
            handleOptionSelect={changeSelectedYear}
          ></CalendarYearView>
        )}
        {activeView == 'month' && (
          <CalendarMonthView
            lang={lang}
            selectedMonth={selectedMonth}
            handleOptionSelect={changeSelectedMonth}
          ></CalendarMonthView>
        )}
      </div>
    </div>
  )
}

export default CustomCalendar
