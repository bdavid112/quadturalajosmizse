import * as React from 'react'
import OptionsMenu from '../OptionsMenu'
import { generateMonthOptions } from '../../../../utils/calendarUtils'

import '/src/styles/utilities.scss'
import './custom-calendar.scss'

interface Props {
  lang?: string
  selectedMonth: number
  handleOptionClick?: (month: number) => void
}

const CalendarMonthView: React.FunctionComponent<Props> = ({
  lang = 'hu',
  selectedMonth,
  handleOptionClick: handleOptionClick,
}) => {
  const monthOptions = generateMonthOptions(lang)

  return (
    <>
      <div className="padding-y-md">
        <div className="divider-gray solid"></div>
      </div>
      <div className="calendar-options-menu overflow-y-scroll">
        <OptionsMenu
          options={monthOptions}
          selectedOptionValue={selectedMonth}
          handleOptionClick={handleOptionClick}
        ></OptionsMenu>
      </div>
    </>
  )
}

export default CalendarMonthView
