import { useRef, useState } from 'react'
import { useAutoClose } from './useAutoClose'

export const useDatePicker = (
  defaultValue?: Date,
  onChange?: (date: Date) => void
) => {
  /* State variables */

  const [isOpen, setIsOpen] = useState(true)
  const [selectedDate, setSelectedDate] = useState(
    defaultValue ? defaultValue : null
  )

  /* Callback function to close the date picker */

  const closeDatePicker = () => setIsOpen(false)

  /* Refs */

  const containerRef = useRef<HTMLDivElement>(null)

  /* Custom hook to close the date picker if the users tabs out */

  useAutoClose(containerRef, isOpen, closeDatePicker)

  /* Handle selecting an option */

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    onChange && onChange(date)
    setIsOpen(false)
  }

  /* Helper function to toggle isOpen state */

  const toggleIsOpen = () => {
    setIsOpen(!isOpen)
  }

  return {
    isOpen,
    setIsOpen,
    selectedDate,
    containerRef,
    handleDateSelect,
    toggleIsOpen,
    closeDatePicker,
  }
}
