import { useRef, useState, useCallback } from 'react'

interface Option {
  value: string
  label: string
}

export const useDropdownKeyboardNav = (
  isParentOpen: boolean,
  options: Option[],
  name: string,
  setTouched: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedOption: React.Dispatch<React.SetStateAction<Option | null>>,
  setIsParentOpen?: React.Dispatch<React.SetStateAction<boolean>>,
  onChange?: (name: string, value: string) => void
) => {
  /* State variables */

  const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1)
  const [activeOptionIndex, setActiveOptionIndex] = useState(-1)
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1)

  /* Refs */

  const optionRefs = useRef<(HTMLDivElement | null)[]>([])

  /* Only change focusedOptionValue within bounds */

  const changeFocusedOptionValue = useCallback(
    (newValue: number) => {
      if (newValue < 0) newValue = options.length - 1
      if (newValue >= options.length) newValue = 0
      setFocusedOptionIndex(newValue)
    },
    [options.length]
  )

  /* Handle selecting an option */

  const handleOptionClick = (optionValue: string) => {
    const option = options.find((o) => o.value === optionValue)
    if (option) {
      setSelectedOption(option)
      onChange && onChange(name, option.value.toString())
      setSelectedOptionIndex(options.indexOf(option))
      setFocusedOptionIndex(-1)
      setActiveOptionIndex(-1)
      setIsParentOpen && setIsParentOpen(false)
      setTouched(true)
    }
  }

  /* Handle keyboard navigation */

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (setIsParentOpen && !isParentOpen && e.key === 'Enter') {
      e.preventDefault()
      setIsParentOpen(true)
      selectedOptionIndex >= 0
        ? setFocusedOptionIndex(selectedOptionIndex)
        : setFocusedOptionIndex(0)
      return
    }

    const directionMap: Record<string, number> = {
      ArrowUp: -1,
      ArrowDown: 1,
    }

    if (directionMap[e.key] !== undefined) {
      e.preventDefault()
      changeFocusedOptionValue(focusedOptionIndex + directionMap[e.key])
    }

    if (e.key === 'Enter' && focusedOptionIndex >= 0) {
      e.preventDefault()
      setActiveOptionIndex(focusedOptionIndex)
    }

    if (setIsParentOpen && isParentOpen && e.key === 'Tab') {
      setIsParentOpen(false)
    }
  }

  const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isParentOpen) return

    if (e.key === 'Enter' && activeOptionIndex >= 0) {
      e.preventDefault()
      handleOptionClick(options[focusedOptionIndex].value)
    }
  }

  return {
    focusedOptionIndex,
    activeOptionIndex,
    optionRefs,
    setFocusedOptionIndex,
    setActiveOptionIndex,
    handleKeyDown,
    handleKeyUp,
    handleOptionClick,
  }
}
