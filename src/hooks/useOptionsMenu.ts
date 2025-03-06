import { useEffect, useRef, useState } from 'react'

export const useOptionsMenu = (optionsLength: number) => {
  /* State variables */

  const [focusedOptionValue, setFocusedOptionValue] = useState(0)
  const [activeOptionValue, setActiveOptionValue] = useState(0)

  /* Refs */

  const menuRef = useRef<HTMLDivElement>(null)
  const optionRefs = useRef<(HTMLDivElement | null)[]>([])

  /* Scroll into view when the menu opens */

  useEffect(() => {
    if (menuRef.current) {
      const selectedOption = menuRef.current.querySelector(
        `[aria-selected="true"]`
      ) as HTMLDivElement

      if (selectedOption) {
        selectedOption.scrollIntoView({
          behavior: 'instant',
          block: 'center',
        })
      }
    }
  }, [])

  /* Only change focusedOptionValue within bounds */

  const changeFocusedOptionValue = (newValue: number) => {
    if (newValue <= 0) newValue = optionsLength
    if (newValue > optionsLength) newValue = 1
    setFocusedOptionValue(newValue)
  }

  /* Auto-focus on the newly selected date */

  useEffect(() => {
    if (focusedOptionValue) {
      optionRefs.current[focusedOptionValue]?.focus()
    }
  }, [focusedOptionValue])

  /* Handle keyboard navigation */

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const directionMap: Record<string, number> = {
      ArrowUp: 1,
      ArrowDown: -1,
    }

    if (directionMap[e.key] !== undefined) {
      e.preventDefault()
      changeFocusedOptionValue(focusedOptionValue + directionMap[e.key])
    }

    if (
      e.key === 'Enter' &&
      focusedOptionValue > 0 &&
      focusedOptionValue <= optionsLength
    ) {
      e.preventDefault()
      setActiveOptionValue(focusedOptionValue)
    }

    if (e.key === 'Tab' && focusedOptionValue == optionsLength) {
      /* closeDatePicker() */
    }
  }

  return { menuRef, optionRefs, activeOptionValue, handleKeyDown }
}
