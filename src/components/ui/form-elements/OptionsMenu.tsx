import { useAutoScrollMenu } from '../../../hooks/useAutoScrollMenu'
import '/src/styles/utilities.scss'
import { ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

const OptionsMenu: React.FunctionComponent<Props> = ({ children }) => {
  const { menuRef } = useAutoScrollMenu()

  return <div ref={menuRef}>{children}</div>
}

export default OptionsMenu
