import '/src/styles/utilities.scss'
import CustomOption from './CustomOption'
import { useOptionsMenu } from '../../../hooks/useOptionsMenu'

interface Option {
  value: number
  label: string
}

interface Props {
  options: Option[]
  selectedOptionValue: number
  handleOptionClick?: (optionValue: number) => void
}

const OptionsMenu: React.FunctionComponent<Props> = ({
  options,
  selectedOptionValue,
  handleOptionClick,
}) => {
  const { menuRef, optionRefs, handleKeyDown } = useOptionsMenu(options.length)

  return (
    <div ref={menuRef}>
      {options.map((option) => (
        <CustomOption
          ref={(el) => {
            if (option) {
              optionRefs.current[option.value] = el
            }
          }}
          key={option.value}
          icon="check"
          option={option}
          isSelected={option.value == selectedOptionValue}
          onClick={() => {
            handleOptionClick && handleOptionClick(option.value)
          }}
          onKeyDown={handleKeyDown}
        ></CustomOption>
      ))}
    </div>
  )
}

export default OptionsMenu
