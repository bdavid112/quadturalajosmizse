import '/src/styles/utilities.scss'
import './text-input-outline.scss'

import * as React from 'react'
import { useState } from 'react'

interface Props {
  id: string
  name: string
  label: string
  error?: boolean
  helperText: string
}

const TextInputOutline: React.FunctionComponent<Props> = ({
  id,
  name,
  label,
  error = false,
  helperText,
}) => {
  const [value, setValue] = useState('')

  return (
    <div className="width-full">
      <div
        className={`flex align-center relative input-container min-height-lg border ${error ? 'border-error' : ''}`}
      >
        <div className={`label-container absolute ${value ? 'populated' : ''}`}>
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
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="relative z-base width-full font-size-base input-field padding-x-lg background-transparent"
        ></input>
      </div>
      <div className="padding-x-lg">
        <span
          className={`font-size-caption text-secondary ${error ? 'text-error' : ''}`}
        >
          {helperText}
        </span>
      </div>
    </div>
  )
}

export default TextInputOutline
