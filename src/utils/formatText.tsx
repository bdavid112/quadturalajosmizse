import React from 'react'

/**
 * Converts newline characters (`\n`) in a string into JSX <br /> elements.
 * @param text The text containing `\n` characters.
 * @returns JSX with line breaks.
 */
export const formatTextWithBreaks = (text: string) => {
  return text.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ))
}
