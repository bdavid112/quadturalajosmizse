import './custom-calendar.scss'

import * as React from 'react'
import OptionsMenu from '../OptionsMenu'
import CustomOption from '../CustomOption'
import { generateYearOptions } from '../../../../utils/calendarUtils'

interface Props {
  selectedYear: number
  handleOptionSelect?: (year: number, clicked: boolean) => void
}

const CalendarYearView: React.FunctionComponent<Props> = ({
  selectedYear,
  handleOptionSelect,
}) => {
  /* Array of options for year selecting */

  const currentDate = new Date()
  const yearOptions = generateYearOptions(
    currentDate.getFullYear(),
    currentDate.getFullYear() + 1
  )

  return (
    <>
      <div className="padding-y-md">
        <div className="divider-gray solid"></div>
      </div>
      <div className="calendar-options-menu overflow-y-scroll" tabIndex={-1}>
        <OptionsMenu>
          {yearOptions.map((option, index) => (
            <CustomOption
              key={index}
              icon="check"
              option={option}
              isSelected={Number(option.value) == selectedYear}
              onClick={() => {
                handleOptionSelect &&
                  handleOptionSelect(Number(option.value), true)
              }}
            ></CustomOption>
          ))}
        </OptionsMenu>
      </div>
    </>
  )
}

export default CalendarYearView
