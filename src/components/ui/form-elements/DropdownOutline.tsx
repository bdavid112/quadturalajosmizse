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
    <>
      <div ref={componentContainerRef}>
        <div
          tabIndex={0}
          className={`flex align-center min-width-md relative input-container border background-transparent ${isOpen ? 'input-focused' : ''} ${error ? 'border-error' : ''}`}
          onKeyDown={(e) => handleKeyDown(e)}
          onKeyUp={(e) => handleKeyUp(e)}
          ref={inputContainerRef}
        >
          <label
            htmlFor={id}
            className={`absolute z-overlay input-label padding-x-lg populated ${error ? 'text-error' : ''}`}
          >
            {label}
          </label>
          <span className="padding-x-lg width-full absolute user-select-none">
            {selectedOption
              ? selectedOption.label
              : t(`ui.dropdown.placeholder-text`, lang)}
          </span>
          <div className="button-container absolute z-overlay flex">
            <InputButton
              icon={'keyboard_arrow_down'}
              onClick={() => {
                toggleIsOpen()
              }}
              isParentOpen={isOpen}
              rotate={true}
            ></InputButton>
          </div>
          <select
            id={id}
            name={name}
            value={selectedOption ? selectedOption.value : 0}
            className="relative z-base min-height-lg width-full font-size-base input-field padding-x-lg background-transparent"
            onClick={() => {
              toggleIsOpen()
            }}
            onChange={() => {}}
            tabIndex={-1}
          ></select>
        </div>
        <div className="padding-x-lg">
          <span
            className={`font-size-caption text-secondary ${isOpen ? 'hidden' : ''} ${error ? 'text-error' : ''}`}
          >
            {helperText}
          </span>
        </div>
        {isOpen && (
          <div className="option-container border-rounded-sm box-shadow-medium">
            <OptionsMenu>
              {options.map((option, index) => (
                <CustomOption
                  ref={(el) => {
                    if (option) {
                      optionRefs.current[index] = el
                    }
                  }}
                  key={index}
                  icon="check"
                  option={option}
                  isSelected={option.value == selectedOption?.value}
                  isFocused={focusedOptionIndex == index}
                  isActive={activeOptionIndex == index}
                  onClick={() => {
                    handleOptionClick && handleOptionClick(option.value)
                    inputContainerRef.current &&
                      inputContainerRef.current.focus()
                  }}
                ></CustomOption>
              ))}
            </OptionsMenu>
          </div>
        )}
      </div>
    </>
  )
}

export default DropdownOutline
