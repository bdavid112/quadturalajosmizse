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

/**
 * Converts `<strong></strong>` literals in a string into JSX <strong></strong> elements.
 * @param text The text containing `<strong></strong>` literals.
 * @returns JSX with <strong></strong> tags.
 */
export const insertStrongTags = (text: string, textColor = '') => {
  // Regex to find text between <strong>...</strong>
  const regex = /<strong>(.*?)<\/strong>/g

  // Split text into parts, keeping the strong parts
  const parts = text.split(regex)

  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <strong className={textColor} key={index}>
        {part}
      </strong>
    ) : (
      part
    )
  )
}

/**
 * Converts newline characters (`\n`) into JSX <br /> elements and
 * replaces `<strong></strong>` literals with JSX <strong> elements.
 * @param text The text containing `\n` and `<strong></strong>` literals.
 * @param textColor Optional class name to style <strong> elements.
 * @returns JSX with <strong></strong> and <br /> tags.
 */
export const formatTextWithBreaksAndStrongTags = (
  text: string,
  textColor = ''
) => {
  // Regex to find text between <strong>...</strong>
  const regex = /<strong>(.*?)<\/strong>/g

  return text.split('\n').map((line, lineIndex) => {
    // Process <strong> tags inside each line
    const parts = line.split(regex)

    return (
      <React.Fragment key={lineIndex}>
        {parts.map((part, index) =>
          index % 2 === 1 ? (
            <strong className={textColor} key={index}>
              {part}
            </strong>
          ) : (
            part
          )
        )}
        <br />
      </React.Fragment>
    )
  })
}

/**
 * Splits text at a given separator and wraps each part in a <p> element.
 * @param text The text containing separators.
 * @param separator The string where the text should split (default: '\n\n').
 * @returns JSX containing multiple <p> elements.
 */
export const formatTextWithParagraphs = (text: string, separator = '\n\n') => {
  return text.split(separator).map((part, index) => <p key={index}>{part}</p>)
}
