import '/src/styles/utilities.scss'
import './dropdown-outline.scss'

import * as React from 'react'
import InputButton from '../buttons/InputButton'
import OptionsMenu from './OptionsMenu'
import CustomOption from './CustomOption'
import { useDropdown } from '../../../hooks/useDropdown'
import { useDropdownKeyboardNav } from '../../../hooks/useDropdownKeyboardNav'
import { useAutoClose } from '../../../hooks/useAutoClose'
import { useLocalization } from '../../../context/LocalizationContext'
import { t } from '../../../utils/translator'

interface Option {
  value: number
  label: string
}

interface Props {
  id: string
  name: string
  label: string
  error?: boolean
  helperText: string
  options: Option[]
  defaultValue?: Option
  onChange?: (option: Option) => void
}

const DropdownOutline: React.FunctionComponent<Props> = ({
  id,
  name,
  label,
  error = false,
  helperText,
  options,
  defaultValue,
  onChange,
}) => {
  const { lang } = useLocalization()

  /* Dropdown state manager */
  const {
    isOpen,
    setIsOpen,
    selectedOption,
    componentContainerRef,
    inputContainerRef,
    toggleIsOpen,
    setSelectedOption,
    closeDropdown,
  } = useDropdown(defaultValue)

  /* Keyboard navigation for dropdown menu */
  const {
    focusedOptionIndex,
    activeOptionIndex,
    optionRefs,
    handleKeyDown,
    handleKeyUp,
    handleOptionClick,
  } = useDropdownKeyboardNav(
    isOpen,
    options,
    setSelectedOption,
    setIsOpen,
    onChange
  )

  /* Close dropdown on clicking outside the container or pressing ESC */
  useAutoClose(componentContainerRef, isOpen, closeDropdown)

  return (
    <div ref={componentContainerRef} className="width-full relative">
      <div
        tabIndex={0}
        ref={inputContainerRef}
        className={`flex align-center relative min-height-lg input-container cursor-pointer border background-transparent ${
          isOpen ? 'input-focused' : ''
        } ${error ? 'border-error' : ''}`}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onClick={() => {
          toggleIsOpen()
        }}
      >
        <div className="label-container absolute populated">
          <label
            htmlFor={id}
            className={`input-label ${error ? 'text-error' : ''}`}
          >
            {label}
          </label>
        </div>
        <span className="padding-x-lg width-full absolute user-select-none">
          {selectedOption
            ? selectedOption.label
            : t(`ui.dropdown.placeholder-text`, lang)}
        </span>
        <div className="button-container absolute z-overlay flex">
          <InputButton
            icon="keyboard_arrow_down"
            onClick={toggleIsOpen}
            isParentOpen={isOpen}
            rotate
          />
        </div>
        {/* Hidden input for form submission */}
        <select
          id={id}
          name={name}
          value={selectedOption?.value ?? ''}
          disabled={true}
          className="hidden"
        />
      </div>

      {/* Helper text */}
      <div className="padding-x-lg">
        <span
          className={`helper-text font-size-caption text-secondary ${error ? 'text-error' : ''}`}
        >
          {helperText}
        </span>
      </div>

      {/* Dropdown menu */}
      <div
        className={`option-container border-rounded-sm box-shadow-medium absolute width-full z-top transition-bezier-fast animated-content ${isOpen ? 'open' : ''}`}
      >
        <OptionsMenu>
          {options.map((option, index) => (
            <CustomOption
              ref={(el) => {
                if (option) {
                  optionRefs.current[index] = el
                }
              }}
              key={option.value} // Use value instead of index for better stability
              icon="check"
              option={option}
              isSelected={option.value === selectedOption?.value}
              isFocused={focusedOptionIndex === index}
              isActive={activeOptionIndex === index}
              onClick={() => {
                handleOptionClick(option.value)
                inputContainerRef.current?.focus()
              }}
            />
          ))}
        </OptionsMenu>
      </div>
    </div>
  )
}

export default DropdownOutline
