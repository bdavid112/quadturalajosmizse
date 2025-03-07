import * as React from 'react'
import OptionsMenu from '../OptionsMenu'
import { generateYearOptions } from '../../../../utils/calendarUtils'

import '/src/styles/utilities.scss'
import './custom-calendar.scss'

interface Props {
  selectedYear: number
  minYear?: number
  maxYear?: number
  handleOptionClick?: (year: number) => void
}

const CalendarYearView: React.FunctionComponent<Props> = ({
  selectedYear,
  minYear = 2000,
  maxYear = 2100,
  handleOptionClick: handleOptionClick,
}) => {
  const yearOptions = generateYearOptions(minYear, maxYear)

  return (
    <>
      <div className="padding-y-md">
        <div className="divider-gray solid"></div>
      </div>
      <div className="calendar-options-menu overflow-y-scroll">
        <OptionsMenu
          options={yearOptions}
          selectedOptionValue={selectedYear}
          handleOptionClick={handleOptionClick}
        ></OptionsMenu>
      </div>
    </>
  )
}

export default CalendarYearView
