import { useRef, useState } from 'react'

interface Option {
  value: string
  label: string
}

export const useDropdown = (defaultValue?: Option) => {
  /* State variables */

  const [isOpen, setIsOpen] = useState(false)
  const [touched, setTouched] = useState(false)
  const [selectedOption, setSelectedOption] = useState(
    defaultValue ? defaultValue : null
  )

  /* Refs */

  const componentContainerRef = useRef<HTMLDivElement>(null)
  const inputContainerRef = useRef<HTMLDivElement>(null)

  /* Function to close the dropdown */

  const closeDropdown = () => setIsOpen(false)

  const toggleIsOpen = () => {
    setIsOpen(!isOpen)
  }

  return {
    isOpen,
    setIsOpen,
    touched,
    setTouched,
    selectedOption,
    componentContainerRef,
    inputContainerRef,
    toggleIsOpen,
    setSelectedOption,
    closeDropdown,
  }
}
