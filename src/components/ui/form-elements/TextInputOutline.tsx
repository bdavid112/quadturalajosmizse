import * as React from 'react'
import '/src/styles/utilities.scss'
import './text-input-outline.scss'
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
    <>
      <div>
        <div
          className={`flex align-center min-width-md relative input-container border ${error ? 'border-error' : ''}`}
        >
          <label
            htmlFor={id}
            className={`absolute input-label padding-x-lg ${value ? 'populated' : ''} ${error ? 'text-error' : ''}`}
          >
            {label}
          </label>
          <input
            id={id}
            name={name}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="relative z-base min-height-lg width-full font-size-base input-field padding-x-lg background-transparent"
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
    </>
  )
}

export default TextInputOutline
