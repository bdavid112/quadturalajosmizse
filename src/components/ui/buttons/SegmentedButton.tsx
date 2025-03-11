import './segmented-button.scss'

import * as React from 'react'
import { useState } from 'react'

interface Props {
  labels: [string, string] | [string, string, string]
  isDisabled?: boolean
  onChange?: () => void
}

const SegmentedButton: React.FunctionComponent<Props> = ({ labels }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <div className="segmented-button-container min-width-lg width-full flex box-shadow-light">
      {labels.map((label, index) => (
        <button
          key={index}
          className={`segmented-button transition-bezier-fast width-half flex-gap-xs flex align-center justify-center border cursor-pointer padding-x-md ${selectedIndex == index ? 'selected-button box-shadow-inset' : ''}`}
          onClick={() => {
            setSelectedIndex(index)
          }}
          onKeyDown={(e) => {
            if (e.key == 'Enter') {
              e.preventDefault()
            }
          }}
        >
          {/* {selectedIndex == index && (
            <span className="material-symbols-rounded size-16">check</span>
          )} */}
          <span className="font-size-secondary">{label}</span>
        </button>
      ))}
    </div>
  )
}
export default SegmentedButton
