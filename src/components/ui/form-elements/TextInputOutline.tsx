import * as React from 'react'
import '/src/styles/utilities.scss'
import './text-input-outline.scss'
import { useState } from 'react'

interface Props {
  id: string
  name: string
  error?: boolean
}

const TextInputOutline: React.FunctionComponent<Props> = (props) => {
  const [value, setValue] = useState('')

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
            Label
          </label>
          <input
            id={props.id}
            name={props.name}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="relative z-base min-height-lg width-full font-size-base input-field padding-x-lg"
          ></input>
        </div>
        <div className="padding-x-lg">
          <span
            className={`font-size-caption text-muted ${props.error && 'text-error'}`}
          >
            Helper text
          </span>
        </div>
      </div>
    </>
  )
}

export default TextInputOutline
