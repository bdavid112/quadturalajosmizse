import * as React from 'react'
import OptionsMenu from '../OptionsMenu'
import { generateYearOptions } from '../../../../utils/calendarUtils'

import '/src/styles/utilities.scss'
import './custom-calendar.scss'
import CustomOption from '../CustomOption'

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
  handleOptionClick,
}) => {
  const yearOptions = generateYearOptions(minYear, maxYear)

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
              isSelected={option.value == selectedYear}
              /* isFocused={focusedOptionIndex == index}
              isActive={activeOptionIndex == index} */
              onClick={() => {
                handleOptionClick && handleOptionClick(option.value)
              }}
            ></CustomOption>
          ))}
        </OptionsMenu>
      </div>
    </>
  )
}

export default CalendarYearView
