import { useEffect, useRef } from 'react'

export const useAutoScrollMenu = () => {
  /* Refs */

  const menuRef = useRef<HTMLDivElement>(null)

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

  return {
    menuRef,
  }
}
