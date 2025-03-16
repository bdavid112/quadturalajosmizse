import './segmented-button.scss'

import * as React from 'react'
import { useState } from 'react'

interface Props {
  labels: [string, string] | [string, string, string]
  isDisabled?: boolean
  className?: string
  onChange?: (index: number) => void
}

const SegmentedButton: React.FunctionComponent<Props> = ({
  labels,
  className,
  onChange,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <div
      className={`${className} segmented-button-container min-width-lg width-full flex box-shadow-light`}
    >
      {labels.map((label, index) => (
        <button
          key={index}
          className={`segmented-button transition-bezier-fast width-half flex-gap-xs flex align-center justify-center border cursor-pointer padding-x-md ${selectedIndex == index ? 'selected-button box-shadow-inset' : ''}`}
          onClick={() => {
            setSelectedIndex(index)
            onChange && onChange(index)
          }}
          onKeyDown={(e) => {
            if (e.key == 'Enter') {
              e.preventDefault()
            }
          }}
        >
          <span className="font-size-secondary text-primary">{label}</span>
        </button>
      ))}
    </div>
  )
}
export default SegmentedButton
