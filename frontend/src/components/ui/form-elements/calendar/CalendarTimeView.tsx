import CustomOption from '../CustomOption'
import OptionsMenu from '../OptionsMenu'
import './custom-calendar.scss'

import * as React from 'react'

interface Props {
  isTakenTime: (time: number) => boolean
  changeSelectedTime: (time: number) => void
}

const CalendarTimeView: React.FunctionComponent<Props> = ({
  isTakenTime,
  changeSelectedTime,
}) => {
  /* const { lang } = useLocalization() */

  const timeOptions = [
    { label: '9:00', value: '9' },
    { label: '12:00', value: '12' },
    { label: '15:00', value: '15' },
    { label: '18:00', value: '18' },
  ]

  return (
    <div>
      <div className="padding-y-md">
        <p className="font-medium margin-bottom-sm">Select time slot</p>
        <div className="divider-gray solid"></div>
      </div>

      <OptionsMenu>
        {timeOptions.map((option, index) => (
          <CustomOption
            key={index}
            option={option}
            isDisabled={isTakenTime(parseInt(option.value))}
            onClick={() => {
              if (isTakenTime(parseInt(option.value))) return
              changeSelectedTime(parseInt(option.value))
            }}
          ></CustomOption>
        ))}
      </OptionsMenu>
    </div>
  )
}

export default CalendarTimeView
