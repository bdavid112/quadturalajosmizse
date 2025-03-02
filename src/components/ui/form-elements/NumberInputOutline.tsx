import * as React from 'react'
import '/src/styles/utilities.scss'
import './number-input-outline.scss'
import { useState } from 'react'

interface Props {
  id: string
  name: string
  label: string
  min: number
  max: number
  error?: boolean
  helperText: string
}

const NumberInputOutline: React.FunctionComponent<Props> = (props) => {
  const [value, setValue] = useState(2)

  const setValueIfInRange = (newValue: number) => {
    if (newValue >= props.min && newValue <= props.max) {
      setValue(newValue)
    }
  }

  return (
    <>
      <div>
        <div
          className={`flex align-center min-width-md relative input-container border ${props.error && 'border-error'}`}
        >
          <label
            htmlFor={props.id}
            className={`absolute z-overlay input-label padding-x-lg ${value && 'populated'} ${props.error && 'text-error'}`}
          >
            {props.label}
          </label>
          <div className="button-container absolute z-overlay flex">
            <button onClick={() => setValueIfInRange(value - 1)}>
              <span className="material-symbols-rounded size-20">remove</span>
            </button>
            <div className="button-divider"></div>
            <button onClick={() => setValueIfInRange(value + 1)}>
              <span className="material-symbols-rounded size-20">add</span>
            </button>
          </div>
          <input
            id={props.id}
            name={props.name}
            type="number"
            value={value}
            onChange={(e) => setValueIfInRange(Number(e.target.value))}
            className="relative z-base min-height-lg width-full font-size-base input-field padding-x-lg"
          ></input>
        </div>
        <div className="padding-x-lg">
          <span
            className={`font-size-caption text-muted ${props.error && 'text-error'}`}
          >
            {props.helperText}
          </span>
        </div>
      </div>
    </>
  )
}

export default NumberInputOutline
