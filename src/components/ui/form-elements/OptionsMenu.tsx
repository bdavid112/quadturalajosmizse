import '/src/styles/utilities.scss'
import CustomOption from './CustomOption'
import { useOptionsMenu } from '../../../hooks/useOptionsMenu'
import { ReactNode } from 'react'

interface Props {
  selectedOptionValue?: number
  handleOptionClick?: (optionValue: number) => void
  closeParent?: () => void
  children?: ReactNode
}

const OptionsMenu: React.FunctionComponent<Props> = ({
  selectedOptionValue,
  handleOptionClick,
  closeParent,
  children,
}) => {
  /* const { menuRef, optionRefs, handleKeyDown } = useOptionsMenu(
 
    selectedOptionValue,
    closeParent
  ) */

  return <div /* ref={menuRef} */>{children}</div>
}

export default OptionsMenu
