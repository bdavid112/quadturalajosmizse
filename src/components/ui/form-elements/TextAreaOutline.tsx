import './textarea-outline.scss'

import * as React from 'react'
import { useState } from 'react'

interface Props {
  id: string
  name: string
  label: string
  error?: boolean
  helperText: string
  maxLength?: number
  onChange?: (name: string, value: string) => void
}

const TextAreaOutline: React.FunctionComponent<Props> = ({
  id,
  name,
  label,
  error = false,
  helperText,
  maxLength = 100,
  onChange,
}) => {
  const [text, setText] = useState('')

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Allow deletion keys and navigation keys
    if (
      e.key === 'Backspace' ||
      e.key === 'Delete' ||
      e.key.startsWith('Arrow') ||
      e.key === 'Tab' ||
      e.ctrlKey ||
      e.metaKey // Allow copy/paste, shortcuts, etc.
    ) {
      return
    }

    // If we've reached the limit, prevent any other input
    if (text.length >= maxLength) {
      e.preventDefault()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Update the state only if the new value is within the limit
    if (e.target.value.length <= maxLength) {
      setText(e.target.value)
    } else {
      // Alternatively, you can trim the value to the limit:
      setText(e.target.value.slice(0, maxLength))
    }
  }

  return (
    <div className="width-full">
      <div
        className={`flex min-width-md relative input-container textarea-container border ${error ? 'border-error' : ''}`}
      >
        <div
          className={`label-container absolute padding-x-lg margin-y-lg ${text ? 'populated' : ''}`}
        >
          <label
            htmlFor={id}
            className={`input-label ${error ? 'text-error' : ''}`}
          >
            {label}
          </label>
        </div>
        <textarea
          id={id}
          name={name}
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="relative z-base min-height-lg width-full font-size-base input-field padding-x-lg padding-y-lg background-transparent"
          onBlur={() => onChange && onChange(name, text)}
        ></textarea>
      </div>
      <div className="padding-x-lg flex min-height-xs align-center justify-between">
        <span
          className={`helper-text font-size-caption text-secondary ${error ? 'text-error' : ''}`}
        >
          {helperText}
        </span>
        <span
          className={`font-size-caption text-secondary ${error ? 'text-error' : ''}`}
        >
          {text.length}/{maxLength}
        </span>
      </div>
    </div>
  )
}

export default TextAreaOutline
