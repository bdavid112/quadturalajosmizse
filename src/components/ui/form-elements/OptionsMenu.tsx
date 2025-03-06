import { useEffect, useRef } from 'react'
import '/src/styles/utilities.scss'

interface Props {
  isOpen: boolean
  selectedValue: number
  children: React.ReactNode
}

const OptionsMenu: React.FunctionComponent<Props> = ({ isOpen, children }) => {
  const menuRef = useRef<HTMLDivElement>(null)

  /* Scroll into view when the menu opens */
  useEffect(() => {
    if (isOpen && menuRef.current) {
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
  }, [isOpen])

  return <div ref={menuRef}>{children}</div>
}

export default OptionsMenu
