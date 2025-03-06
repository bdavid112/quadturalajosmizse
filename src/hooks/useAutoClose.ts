import { useEffect } from 'react'

export function useAutoClose(
  containerRef: React.RefObject<HTMLDivElement | null>,
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    const handleCloseOnKeyDown = (event: KeyboardEvent) => {
      if (isOpen && event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleCloseOnKeyDown)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleCloseOnKeyDown)
    }
  }, [isOpen, containerRef, setIsOpen])
}
