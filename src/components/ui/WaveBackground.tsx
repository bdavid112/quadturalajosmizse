import { useEffect, useState } from 'react'
import './wave-background.scss'

import * as React from 'react'

interface Props {
  numberOfWaves: number
  containerRef: React.RefObject<HTMLDivElement | null>
}

const WaveBackground: React.FunctionComponent<Props> = ({
  numberOfWaves,
  containerRef,
}) => {
  const [viewBoxHeight, setViewBoxHeight] = useState(240)

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setViewBoxHeight(containerRef.current.clientHeight)
      }
    }

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
      height={viewBoxHeight}
      viewBox={`0 -10 1440 ${viewBoxHeight}`}
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
