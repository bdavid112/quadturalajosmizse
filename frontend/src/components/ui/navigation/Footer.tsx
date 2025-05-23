import './footer.scss'

import * as React from 'react'
import { NavLink } from 'react-router-dom'
import FAB from '../buttons/FAB'
import Icon from '../IconComponent'
import { useLocalization } from '@context/LocalizationContext'
import { t } from '@utils/translator'
import { useState } from 'react'
import Modal from '../Modal'
import LegalText from '../LegalText'

interface Props {}

const Footer: React.FunctionComponent<Props> = ({}) => {
  const { lang } = useLocalization()

  const [selectedDocumentIndex, setSelectedDocumentIndex] = useState<
    number | null
  >(null)

  const isLegal = (title: string) => {
    return title === 'Jogi információk' || title === 'Legal'
  }

  const contacts = [
    {
      icon: 'location_on',
      label: '2347 Bugyi, Mező utca 7.',
    },
    {
      icon: 'mail',
      label: 'quadturalajosmizse@gmail.com',
    },
    {
      icon: 'call',
      label: '+36 70 668 8771',
    },
  ]

  const groups: { title: string; items: string[] }[] = t(
    'ui.footer.groups',
    lang
  )

  const modalContent: {
    title: string
    content: { heading: string; text: string[] }[]
  }[] = [t('ui.footer.terms', lang), t('ui.footer.privacy', lang)]

  React.useEffect(() => {
    console.log(selectedDocumentIndex)
  }, [selectedDocumentIndex])

  return (
    <footer className="width-full z-overlay footer flex justify-center padding-y-3xl relative">
      <nav className="flex flex-gap-4xl" aria-label="Footer Navigation">
        <div className="flex flex-col flex-gap-lg">
          <div className="flex flex-gap-sm">
            <NavLink to={'/'} className="flex align-center">
              <svg
                width="70"
                height="40"
                viewBox="0 0 70 40"
                fill="none"
                className="footer-logo transition-bezier-smooth"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M37.2551 1.61586C38.1803 0.653384 39.4368 0.112671 40.7452 0.112671C46.6318 0.112671 52.1793 0.112674 57.6424 0.112685C68.6302 0.112708 74.1324 13.9329 66.3629 22.0156L49.4389 39.6217C48.662 40.43 47.3335 39.8575 47.3335 38.7144V23.2076L49.2893 21.1729C50.8432 19.5564 49.7427 16.7923 47.5451 16.7923H22.6667L37.2551 1.61586Z"
                  fill="#fff"
                ></path>
                <path
                  d="M32.7449 38.3842C31.8198 39.3467 30.5633 39.8874 29.2549 39.8874C23.3683 39.8874 17.8208 39.8874 12.3577 39.8874C1.36983 39.8873 -4.13236 26.0672 3.63721 17.9844L20.5612 0.378369C21.3381 -0.429908 22.6666 0.142547 22.6666 1.28562L22.6667 16.7923L20.7108 18.8271C19.1569 20.4437 20.2574 23.2077 22.455 23.2077L47.3335 23.2076L32.7449 38.3842Z"
                  fill="#fff"
                ></path>
              </svg>
            </NavLink>
            <span className="footer-title">QuadTúraLajosmizse</span>
            <span className="mobile-footer-title">QTLajosmizse</span>
          </div>
          {contacts.map((contact, index) => (
            <div key={index} className="flex flex-gap-md">
              <Icon name={contact.icon} className="size-24 inverted" />
              <span className="text-inverted">{contact.label}</span>
            </div>
          ))}
        </div>
        {groups.map((group, index) => (
          <ul key={index} className="flex flex-col flex-gap-md">
            <span className="group-title">{group.title}</span>
            {group.items.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  if (isLegal(group.title)) {
                    setSelectedDocumentIndex(index)
                  }
                }}
                className="font-size-secondary text-inverted cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        ))}
      </nav>
      <FAB
        className="absolute footer-fab"
        icon="arrow_upward"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
      ></FAB>
      <Modal
        fullWidth={true}
        isOpen={selectedDocumentIndex != null ? true : false}
        onClose={() => {
          setSelectedDocumentIndex(null)
        }}
      >
        {selectedDocumentIndex != null && (
          <LegalText
            title={modalContent[selectedDocumentIndex!].title}
            content={modalContent[selectedDocumentIndex!].content}
          ></LegalText>
        )}
      </Modal>
    </footer>
  )
}
export default Footer
