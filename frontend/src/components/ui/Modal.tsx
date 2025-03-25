import React from 'react'

import './modal.scss'
import Icon from './IconComponent'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  fullWidth?: boolean
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  fullWidth,
}) => {
  if (!isOpen) return null

  return (
    <div className="modal-overlay z-top">
      <div className={`modal ${fullWidth ? 'full' : ''}`}>
        <button className="close-button" onClick={onClose}>
          <Icon name={'close'} />
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal
