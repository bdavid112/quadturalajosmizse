import './text-input-outline.scss'

import * as React from 'react'
import { useState } from 'react'

interface Props {
  id: string
  name: string
  label: string
  errorMessage?: string | null
  helperText: string
  handleOnChange?: (name: string, value: string) => void
}

const TextInputOutline: React.FunctionComponent<Props> = ({
  id,
  name,
  label,
  errorMessage,
  helperText,
  handleOnChange,
}) => {
  const [value, setValue] = useState('')
  const [touched, setTouched] = useState(false)

  return (
    <div className="width-full">
      <div
        className={`flex align-center relative input-container min-height-lg border ${touched && !errorMessage ? 'border-success' : ''} ${errorMessage ? 'border-error outline-error' : ''}`}
      >
        <div className={`label-container absolute ${value ? 'populated' : ''}`}>
          <label
            htmlFor={id}
            className={`input-label ${touched && !errorMessage ? 'text-success' : ''} ${errorMessage ? 'text-error' : ''}`}
          >
            {label}
          </label>
        </div>
        <input
          id={id}
          name={name}
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
          }}
          onBlur={() => {
            handleOnChange && handleOnChange(name, value)
            setTouched(true)
          }}
          autoComplete={name}
          className="height-full z-base width-full font-size-base input-field padding-x-lg background-transparent"
        ></input>
        <span
          className={`material-symbols-rounded size-20 absolute status-icon 
        ${errorMessage ? 'text-error' : 'text-success'}`}
        >
          {touched && !errorMessage
            ? 'check_circle'
            : errorMessage
              ? 'error'
              : ''}
        </span>
      </div>
      <div className="padding-x-lg">
        <span
          className={`helper-text font-size-caption text-secondary ${errorMessage ? 'text-error' : ''}`}
        >
          {errorMessage ? errorMessage : helperText}
        </span>
      </div>
    </div>
  )
}

export default TextInputOutline
