import './number-input-outline.scss'

import * as React from 'react'
import { useEffect, useState } from 'react'
import InputButton from '../buttons/InputButton'

interface Props {
  id: string
  name: string
  label: string
  min: number
  max: number
  error?: boolean
  helperText: string
  onChange?: (name: string, value: string) => void
}

const NumberInputOutline: React.FunctionComponent<Props> = ({
  id,
  name,
  label,
  min,
  max,
  error = false,
  helperText,
  onChange,
}) => {
  const [value, setValue] = useState(min)

  const setValueIfInRange = (newValue: number) => {
    if (newValue >= min && newValue <= max) {
      setValue(newValue)
    }
  }

  useEffect(() => {
    onChange && onChange(name, value.toString())
  }, [value])

  useEffect(() => {
    if (value < min) setValue(min)
    if (value > max) setValue(max)
  }, [min, max])

  return (
    <div className="width-full">
      <div
        className={`flex align-center relative input-container min-height-lg border ${error ? 'border-error' : ''}`}
      >
        <div className={`z-overlay label-container absolute populated`}>
          <label
            htmlFor={id}
            className={`input-label ${error ? 'text-error' : ''}`}
          >
            {label}
          </label>
        </div>
        <input
          id={id}
          name={name}
          type="number"
          value={value}
          onChange={(e) => setValueIfInRange(Number(e.target.value))}
          className="relative z-base width-full font-size-base input-field padding-x-lg"
        ></input>
        <div className="button-container absolute z-overlay flex">
          <InputButton
            icon="remove"
            onClick={() => {
              setValueIfInRange(value - 1)
            }}
          ></InputButton>
          <div className="button-divider"></div>
          <InputButton
            icon="add"
            onClick={() => {
              setValueIfInRange(value + 1)
            }}
          ></InputButton>
        </div>
      </div>
      <div className="padding-x-lg">
        <span
          className={`helper-text font-size-caption text-secondary ${error ? 'text-error' : ''}`}
        >
          {helperText}
        </span>
      </div>
    </div>
  )
}

export default NumberInputOutline
