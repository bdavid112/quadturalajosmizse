import * as React from 'react'
import '/src/styles/utilities.scss'
import './custom-calendar.scss'
import InputButton from '../buttons/InputButton'

interface Props {
  onClick?: () => void
  calendarDays: (number | null)[]
}

const CustomOption: React.FunctionComponent<Props> = ({
  onClick,
  calendarDays,
}) => {
  return (
    <div className="calendar-grid padding-x-md padding-y-md">
      <div className="calendar-row">
        <div className="col-7 flex justify-between">
          <div className="flex align-center ">
            <InputButton
              icon="keyboard_arrow_left"
              rounded="border-rounded-full-left"
              small={true}
            ></InputButton>
            <InputButton
              icon="keyboard_arrow_down"
              label="2025"
              small={true}
            ></InputButton>
            <InputButton
              icon="keyboard_arrow_right"
              rounded="border-rounded-full-right"
              small={true}
            ></InputButton>
          </div>
          <div className="flex align-center">
            <InputButton
              icon="keyboard_arrow_left"
              rounded="border-rounded-full-left"
              small={true}
            ></InputButton>
            <InputButton
              icon="keyboard_arrow_down"
              label="Mar"
              small={true}
            ></InputButton>
            <InputButton
              icon="keyboard_arrow_right"
              rounded="border-rounded-full-right"
              small={true}
            ></InputButton>
          </div>
        </div>
      </div>
      <div className="calendar-row calendar-headrow">
        <div className="flex justify-center align-center">
          <span className="font-medium">H</span>
        </div>
        <div className="flex justify-center align-center">
          <span className="font-medium">K</span>
        </div>
        <div className="flex justify-center align-center">
          <span className="font-medium">SZ</span>
        </div>
        <div className="flex justify-center align-center">
          <span className="font-medium">CS</span>
        </div>
        <div className="flex justify-center align-center">
          <span className="font-medium">P</span>
        </div>
        <div className="flex justify-center align-center">
          <span className="font-medium text-error">SZ</span>
        </div>
        <div className="flex justify-center align-center">
          <span className="font-medium text-error">V</span>
        </div>
      </div>
      <div className="calendar-row">
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`relative calendar-cell flex align-center justify-center transition-ease-out ${!day ? 'cursor-default' : ''} ${day && day == 4 ? 'calendar-today' : ''}`}
          >
            <p className="z-overlay">{day ? day : ''}</p>
            {day && (
              <div className="absolute calendar-cell-background width-full height-full z-base"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CustomOption
