import './faq-section.scss'

import image from '@assets/contact-us.svg'

import * as React from 'react'
import Accordion from '@components/ui/Accordion'
import { t } from '@utils/translator'
import { useLocalization } from '@context/LocalizationContext'

interface Props {}

const FAQSection: React.FunctionComponent<Props> = ({}) => {
  const { lang } = useLocalization()
  const accordions: { question: string; answer: string }[] = t(
    'home.faq.accordions',
    lang
  )

  return (
    <section className="faq-section padding-y-4xl">
      <div className="container flex-col">
        <h1>{t('home.faq.title', lang)}</h1>
        <div className="padding-y-xl flex flex-col flex-gap-md">
          {accordions.map((accordion, index) => (
            <Accordion
              key={index}
              label={accordion.question}
              text={accordion.answer}
            ></Accordion>
          ))}
        </div>
        <div className="flex justify-between faq-footer">
          <div>
            <h2 className="margin-y-xl">{t('home.faq.subtitle', lang)}</h2>
            <p className="margin-bottom-lg sm-text-center text-balance">
              {t('home.faq.cta-text', lang)}
            </p>
            <div className="flex align-center flex-gap-sm sm-justify-center">
              <span className="material-symbols-rounded size-24 text-brand">
                mail
              </span>
              <span className="font-size-secondary font-bold">
                quadturalajosmizse@gmail.com
              </span>
            </div>
            <div className="flex align-center flex-gap-sm sm-justify-center">
              <span className="material-symbols-rounded size-24 text-brand">
                phone
              </span>
              <span className="font-size-secondary font-bold">
                +36 70 668 8771
              </span>
            </div>
          </div>
          <img className="contact-us-image" src={image} alt="Contact-us" />
        </div>
      </div>
    </section>
  )
}
export default FAQSection
