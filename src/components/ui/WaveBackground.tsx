import { useEffect, useState } from 'react'
import './wave-background.scss'

import * as React from 'react'

interface Props {
  numberOfWaves: number
}

const WaveBackground: React.FunctionComponent<Props> = ({ numberOfWaves }) => {
  const [rows, setRows] = useState(getRows(window.innerWidth))

  // Function to determine rows based on screen width
  function getRows(width: number) {
    if (width > 1440) return 1 // Desktop
    if (width > 768) return 2 // Tablet
    return 4 // Mobile
  }

  useEffect(() => {
    const handleResize = () => setRows(getRows(window.innerWidth))

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  /* Generate waves */
  const waves = new Array(numberOfWaves).fill('').map((_, i) => {
    const y = i * 50 // Adjust wave height dynamically
    return `M0 ${y} C 360 ${y + 20}, 1080 ${y - 20}, 1440 ${y} C 1800 ${y + 20}, 2160 ${y - 20}, 2880 ${y}`
  })

  return (
    <svg
      width="100%"
      height={270 * rows}
      viewBox={`0 -10 1440 ${270 * rows}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className="wave-background"
    >
      {waves.map((d, index) => (
        <path
          key={index}
          d={d}
          stroke="url(#paint0_linear_23_285)"
          strokeLinecap="round"
        />
      ))}
      <defs>
        <linearGradient
          id="paint0_linear_23_285"
          x1="0"
          y1="-10"
          x2="1440"
          y2="270"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#81726A" />
          <stop offset="1" stopColor="#22A781" />
        </linearGradient>
      </defs>
    </svg>
  )
}
export default WaveBackground
