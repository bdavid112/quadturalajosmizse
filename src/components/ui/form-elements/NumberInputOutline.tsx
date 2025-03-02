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

const NumberInputOutline: React.FunctionComponent<Props> = ({
  id,
  name,
  label,
  min,
  max,
  error = false,
  helperText,
}) => {
  const [value, setValue] = useState(min)

  const setValueIfInRange = (newValue: number) => {
    if (newValue >= min && newValue <= max) {
      setValue(newValue)
    }
  }

  return (
    <>
      <div>
        <div
          className={`flex align-center min-width-md relative input-container border ${error && 'border-error'}`}
        >
          <label
            htmlFor={id}
            className={`absolute z-overlay input-label padding-x-lg ${value && 'populated'} ${error && 'text-error'}`}
          >
            {label}
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
            id={id}
            name={name}
            type="number"
            value={value}
            onChange={(e) => setValueIfInRange(Number(e.target.value))}
            className="relative z-base min-height-lg width-full font-size-base input-field padding-x-lg"
          ></input>
        </div>
        <div className="padding-x-lg">
          <span
            className={`font-size-caption text-muted ${error && 'text-error'}`}
          >
            {helperText}
          </span>
        </div>
      </div>
    </>
  )
}

export default NumberInputOutline
