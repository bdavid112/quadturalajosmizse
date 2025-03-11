import * as React from 'react'
import { motion } from 'framer-motion' // Import motion

import './button-primary.scss'

interface Props {
  label: string
  fullWidth?: boolean
  onClick?: () => void
  isDisabled?: boolean
}

const ButtonPrimary: React.FunctionComponent<Props> = ({
  label,
  fullWidth = false,
  onClick,
  isDisabled,
}) => {
  return (
    <>
      {!isDisabled ? (
        <motion.button
          className={`padding-x-lg box-shadow-light button-primary-enabled ${fullWidth ? 'width-full' : ''}`}
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 75 }}
          onClick={onClick}
        >
          {label}
        </motion.button>
      ) : (
        <motion.button
          className={`padding-x-lg button-primary-disabled ${fullWidth ? 'width-full' : ''}`}
        >
          {label}
        </motion.button>
      )}
    </>
  )
}

export default ButtonPrimary
