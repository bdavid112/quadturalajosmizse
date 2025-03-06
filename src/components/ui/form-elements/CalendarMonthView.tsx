import * as React from 'react'
import CustomOption from './CustomOption'
import OptionsMenu from './OptionsMenu'
import { generateMonthOptions } from '../../../utils/calendarUtils'

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
      <div className="calendar-row">
        <div className="divider-gray solid col-7 margin-y-sm"></div>
      </div>
      <div className="max-height-lg col-7 overflow-y-scroll">
        <OptionsMenu isOpen={true} selectedValue={selectedMonth}>
          {monthOptions.map((month, index) => {
            return (
              <div key={index}>
                <CustomOption
                  option={{ label: month.label, value: month.value }}
                  isActive={false}
                  isFocused={false}
                  icon="check"
                  isSelected={month.value == selectedMonth}
                  onClick={() => {
                    handleOptionClick && handleOptionClick(month.value)
                  }}
                ></CustomOption>
              </div>
            )
          })}
        </OptionsMenu>
      </div>
    </>
  )
}

export default CalendarMonthView
