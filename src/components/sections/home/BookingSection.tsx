import './booking-section.scss'

import divider from '@assets/grunge-divider.svg'

import * as React from 'react'
import BookingForm from '@components/ui/forms/BookingForm'
import { insertStrongTags } from '@utils/formatText'
import { t } from '@utils/translator'
import { useLocalization } from '@context/LocalizationContext'

interface Props {
  plain?: boolean
}

const BookingSection: React.FunctionComponent<Props> = ({ plain = false }) => {
  const { lang } = useLocalization()

  const instructions: string[] = t('home.booking.instructions.items', lang)
  const info: string[] = t('home.booking.info.items', lang)

  return (
    <section className="booking-section relative">
      {!plain && (
        <img
          className="rotate-180 grunge-divider"
          src={divider}
          alt="Divider top"
        />
      )}
      <div className={`flex ${!plain ? 'booking-background' : ''}`}>
        <div className="container flex-col padding-y-4xl">
          <h1 className={`${!plain ? 'text-inverted' : ''} margin-bottom-4xl`}>
            {t('home.booking.title', lang)}
          </h1>
          <div className="flex booking-section-content flex-gap-4xl width-full">
            <div className="flex justify-center width-half">
              <BookingForm></BookingForm>
            </div>
            <div className="width-half">
              <div className="text-content-wrapper">
                <div className="text-content">
                  <h2
                    className={`${!plain ? 'text-inverted' : ''} margin-bottom-2xl`}
                  >
                    {t('home.booking.instructions.title', lang)}
                  </h2>
                  <ul className="flex flex-col flex-gap-sm list margin-bottom-4xl">
                    {instructions.map((inst, index) => (
                      <li
                        key={index}
                        className={`${!plain ? 'text-inverted' : ''}`}
                      >
                        {insertStrongTags(
                          inst,
                          `${!plain ? 'text-inverted' : 'text-primary'}`
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-content">
                  <h3
                    className={`${!plain ? 'text-inverted' : ''} margin-bottom-2xl`}
                  >
                    {t('home.booking.info.title', lang)}
                  </h3>
                  <ul className="flex flex-col flex-gap-sm list">
                    {info.map((i, index) => (
                      <li
                        key={index}
                        className={`${!plain ? 'text-inverted' : ''}`}
                      >
                        {insertStrongTags(
                          i,
                          `${!plain ? 'text-inverted' : 'text-primary'}`
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!plain && (
        <img className="grunge-divider" src={divider} alt="Divider bottom" />
      )}
    </section>
  )
}
export default BookingSection
