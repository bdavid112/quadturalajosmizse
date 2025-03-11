import './top-navbar.scss'
import logo from '../../../assets/logo_placeholder.png'

import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { useLocalization } from '../../../context/LocalizationContext'
import ButtonPrimary from '../buttons/ButtonPrimary'
import { useNavbar } from '../../../hooks/useNavbar'

interface Props {}

const TopNavbar: React.FunctionComponent<Props> = ({}) => {
  const { lang, setLang } = useLocalization()
  const { isOpen, toggleIsOpen, links } = useNavbar(lang)

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
      <ButtonPrimary
        label={lang == 'hu' ? 'Váltás angolra' : 'Change to Hungarian'}
        onClick={() => setLang(lang == 'hu' ? 'en' : 'hu')}
        className="navbar-cta-button"
      ></ButtonPrimary>
      <ul
        className={`mobile-nav-links transition-bezier-smooth slide-content ${isOpen ? 'open' : ''} flex-col`}
      >
        {links.map((link) => (
          <li className="width-full flex flex-col justify-center align-center relative">
            <NavLink
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
              to={link.path}
            >
              {link.label}
            </NavLink>
            <div className="divider-gray absolute"></div>
          </li>
        ))}
      </ul>
      <span className="mobile-menu-title">QTL</span>
      <button
        onClick={() => toggleIsOpen()}
        className="menu-button cursor-pointer"
      >
        <span
          className={`material-symbols-rounded size-40 text-primary transition-bezier-smooth ${isOpen ? 'rotate-90' : ''}`}
        >
          menu
        </span>
      </button>
    </nav>
  )
}
export default TopNavbar
