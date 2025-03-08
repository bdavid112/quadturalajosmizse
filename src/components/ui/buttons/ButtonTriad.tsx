import * as React from 'react'
import InputButton from '../buttons/InputButton'

import '/src/styles/utilities.scss'

interface Props {
  allVisible?: boolean
  small?: boolean
  label: string
  isParentOpen: boolean
  handleLeftClick?: () => void
  handleMiddleClick?: () => void
  handleRightClick?: () => void
  closeParent?: () => void
}

const ButtonTriad: React.FunctionComponent<Props> = ({
  allVisible = true,
  small = false,
  label,
  isParentOpen,
  handleLeftClick,
  handleMiddleClick,
  handleRightClick,
  closeParent,
}) => {
  return (
    <div className="flex align-center justify-center min-width-xs">
      {allVisible && (
        <InputButton
          tabIndex={0}
          icon="keyboard_arrow_left"
          rounded="border-rounded-full-left"
          small={small}
          onClick={handleLeftClick}
        ></InputButton>
      )}
      <InputButton
        icon="keyboard_arrow_down"
        label={label}
        small={small}
        rotate={true}
        isParentOpen={isParentOpen}
        onClick={handleMiddleClick}
      ></InputButton>
      {allVisible && (
        <InputButton
          tabIndex={0}
          icon="keyboard_arrow_right"
          rounded="border-rounded-full-right"
          small={small}
          onClick={handleRightClick}
          closeParent={closeParent}
        ></InputButton>
      )}
    </div>
  )
}

export default ButtonTriad
