import * as React from 'react'
import { motion } from 'framer-motion' // Import motion
import '/src/styles/utilities.scss'
import './button-primary-outline.scss'

interface Props {
  text: string
  onClick?: () => void
  isDisabled?: boolean
}

const ButtonPrimaryOutline: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      {!props.isDisabled ? (
        <motion.button
          className={'padding-x-lg button-primary-outline-enabled'}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 150 }}
          onClick={props.onClick}
        >
          {props.text}
        </motion.button>
      ) : (
        <motion.button
          className={'padding-x-lg button-primary-outline-disabled'}
        >
          {props.text}
        </motion.button>
      )}
    </>
  )
}

export default ButtonPrimaryOutline
