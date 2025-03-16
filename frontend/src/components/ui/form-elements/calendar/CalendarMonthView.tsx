import './custom-calendar.scss'

import * as React from 'react'
import OptionsMenu from '../OptionsMenu'
import { generateMonthOptions } from '../../../../utils/calendarUtils'
import CustomOption from '../CustomOption'
import { useLocalization } from '../../../../context/LocalizationContext'

interface Props {
  selectedMonth: number
  handleOptionSelect?: (month: number, clicked: boolean) => void
}

const CalendarMonthView: React.FunctionComponent<Props> = ({
  selectedMonth,
  handleOptionSelect,
}) => {
  const { lang } = useLocalization()

  /* Array of options for month selecting localized */

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
              onClick={() => {
                handleOptionSelect && handleOptionSelect(option.value, true)
              }}
            ></CustomOption>
          ))}
        </OptionsMenu>
      </div>
    </>
  )
}

export default CalendarMonthView
