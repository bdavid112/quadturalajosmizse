import * as React from 'react'
import { motion } from 'framer-motion' // Import motion
import '../../styles/utilities.scss'
import './button-primary.scss'

interface Props {
  text: string
  onClick?: () => void
  isDisabled?: boolean
}

const ButtonPrimary: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      {!props.isDisabled ? (
        <motion.button
          className={'padding-x-lg box-shadow-light button-primary-enabled'}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 150 }}
          onClick={props.onClick}
        >
          {props.text}
        </motion.button>
      ) : (
        <motion.button
          className={'padding-x-lg box-shadow-light button-primary-disabled'}
        >
          {props.text}
        </motion.button>
      )}
    </>
  )
}

export default ButtonPrimary
