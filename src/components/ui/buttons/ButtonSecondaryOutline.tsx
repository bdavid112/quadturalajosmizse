import * as React from 'react'
import { motion } from 'framer-motion' // Import motion

import './button-secondary-outline.scss'

interface Props {
  text: string
  onClick?: () => void
  isDisabled?: boolean
}

const ButtonSecondaryOutline: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      {!props.isDisabled ? (
        <motion.button
          className={'padding-x-lg button-secondary-outline-enabled'}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 150 }}
          onClick={props.onClick}
        >
          {props.text}
        </motion.button>
      ) : (
        <motion.button
          className={'padding-x-lg button-secondary-outline-disabled'}
        >
          {props.text}
        </motion.button>
      )}
    </>
  )
}

export default ButtonSecondaryOutline
