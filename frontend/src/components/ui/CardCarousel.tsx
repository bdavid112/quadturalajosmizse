import { useEffect, useRef } from 'react'
import './card-carousel.scss'

import * as React from 'react'

interface Props {
  itemsLength: number
  className?: string
  children?: React.ReactNode
}

const CardCarousel: React.FunctionComponent<Props> = ({
  itemsLength,
  className,
  children,
}) => {
  /* const { lang, setLang } = useLocalization() */

  const containerRef = useRef<HTMLDivElement | null>(null)

  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)
  const scrollStartLeft = useRef(0)
  const cardWidthRef = useRef(0)

  /* Dragging behaviour for mouse */

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    isDragging.current = true
    startX.current = e.pageX - containerRef.current.offsetLeft
    scrollLeft.current = containerRef.current.scrollLeft
    containerRef.current.style.scrollBehavior = 'auto' // Disable smooth scroll for dragging
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return
    e.preventDefault()
    const x = e.pageX - containerRef.current.offsetLeft
    const walk = (x - startX.current) * 2 // Increase factor for faster scroll
    containerRef.current.scrollLeft = scrollLeft.current - walk
  }

  const handleMouseUp = () => {
    if (!containerRef.current) return
    isDragging.current = false
    containerRef.current.style.scrollBehavior = 'smooth' // Re-enable smooth scrolling
  }

  /* Swipe behaviour for touch screens */

  useEffect(() => {
    if (!containerRef.current) return
    const firstCard = containerRef.current.children[0] as HTMLElement
    if (firstCard) {
      const style = window.getComputedStyle(firstCard)
      const gap = parseFloat(style.marginRight) // Get the right margin (gap)
      cardWidthRef.current = firstCard.offsetWidth + gap // 🔥 True width + gap
    }
  }, [])

  // Handle touch start - store the starting position
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return
    startX.current = e.touches[0].pageX
    scrollStartLeft.current = containerRef.current.scrollLeft
  }

  // Handle touch end - determine where to snap
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!containerRef.current) return

    const scrollContainer = containerRef.current
    const scrollLeft = scrollContainer.scrollLeft
    const cardWidthWithGap = cardWidthRef.current

    // Determine swipe distance & direction
    const swipeDistance = startX.current - e.changedTouches[0].pageX
    const movedEnough = Math.abs(swipeDistance) > cardWidthWithGap * 0.1 // 🔥 Only if moved at least 10% of card width

    let targetCardIndex = Math.round(scrollLeft / cardWidthWithGap) // Default: closest card

    if (movedEnough) {
      if (swipeDistance > 0 && targetCardIndex < itemsLength - 1) {
        // 🔥 Swiped left → Move to next card
        targetCardIndex++
      } else if (swipeDistance < 0 && targetCardIndex > 0) {
        // 🔥 Swiped right → Move to previous card
        targetCardIndex--
      }
    }

    // Snap to calculated card position
    scrollContainer.scrollTo({
      left: targetCardIndex * cardWidthWithGap,
      behavior: 'smooth',
    })
  }
  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`card-carousel padding-y-2xl ${className}`}
    >
      {children}
    </div>
  )
}
export default CardCarousel
