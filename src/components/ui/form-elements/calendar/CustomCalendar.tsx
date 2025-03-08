import '/src/styles/utilities.scss'
import './custom-calendar.scss'

import * as React from 'react'
import { formatMonthToString } from '../../../../utils/calendarUtils'
import CalendarDayView from './CalendarDayView'
import CalendarYearView from './CalendarYearView'
import CalendarMonthView from './CalendarMonthView'
import ButtonTriad from '../../buttons/ButtonTriad'
import { useLocalization } from '../../../../context/LocalizationContext'

interface Props {
  selectedYear: number
  selectedMonth: number
  activeView: string
  calendarDays: (number | null)[]
  dateIndice: number[]
  viewTogglers: (() => void)[]
  handleDateSelect?: (date: Date) => void
  closeDatePicker: () => void
  changeSelectedYear: (year: number) => void
  changeSelectedMonth: (month: number) => void
}

const CustomCalendar: React.FunctionComponent<Props> = ({
  selectedYear,
  selectedMonth,
  activeView,
  calendarDays,
  dateIndice,
  viewTogglers,
  handleDateSelect,
  closeDatePicker,
  changeSelectedYear,
  changeSelectedMonth,
}) => {
  const { lang } = useLocalization()

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
            handleOptionSelect={changeSelectedYear}
          ></CalendarYearView>
        )}
        {activeView == 'month' && (
          <CalendarMonthView
            selectedMonth={selectedMonth}
            handleOptionSelect={changeSelectedMonth}
          ></CalendarMonthView>
        )}
      </div>
    </div>
  )
}

export default CustomCalendar
