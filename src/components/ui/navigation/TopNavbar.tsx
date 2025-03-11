import './top-navbar.scss'
import logo from '../../../assets/logo_placeholder.png'

import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { useLocalization } from '../../../context/LocalizationContext'
import { t } from '../../../utils/translator'
import ButtonPrimary from '../buttons/ButtonPrimary'
import { useNavbar } from '../../../hooks/useNavbar'

interface Props {}

const TopNavbar: React.FunctionComponent<Props> = ({}) => {
  const { lang } = useLocalization()
  const { links } = useNavbar()

  return (
    <nav className="top-navbar width-full sticky z-top box-shadow-medium padding-x-lg flex align-center justify-between">
      <NavLink className="logo" to="/">
        <img src={logo} alt="Company logo" />
      </NavLink>
      <ul className="nav-links flex flex-gap-2xl">
        {links.map((link) => (
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
              to={link.path}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
      <ButtonPrimary label={'Call to Action'}></ButtonPrimary>
    </nav>
  )
}
export default TopNavbar
