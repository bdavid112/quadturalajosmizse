import * as React from 'react'
import OptionsMenu from '../OptionsMenu'
import { generateMonthOptions } from '../../../../utils/calendarUtils'

import '/src/styles/utilities.scss'
import './custom-calendar.scss'
import CustomOption from '../CustomOption'

interface Props {
  lang?: string
  selectedMonth: number
  handleOptionSelect?: (month: number) => void
}

const CalendarMonthView: React.FunctionComponent<Props> = ({
  lang = 'hu',
  selectedMonth,
  handleOptionSelect,
}) => {
  const monthOptions = generateMonthOptions(lang)

  return (
    <>
      <div className="padding-y-md">
        <div className="divider-gray solid"></div>
      </div>
      <div className="calendar-options-menu overflow-y-scroll">
        <OptionsMenu>
          {monthOptions.map((option, index) => (
            <CustomOption
              key={index}
              icon="check"
              option={option}
              isSelected={option.value == selectedMonth}
              /* isFocused={focusedOptionIndex == index}
              isActive={activeOptionIndex == index} */
              onClick={() => {
                handleOptionSelect && handleOptionSelect(option.value)
              }}
            ></CustomOption>
          ))}
        </OptionsMenu>
      </div>
    </>
  )
}

export default CalendarMonthView
