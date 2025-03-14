import './tours-section.scss'

import nature from '@assets/tours-nature.svg'
import overviewImg1 from '@assets/tour-overview-1.avif'
import overviewImg2 from '@assets/tour-overview-2.avif'

import * as React from 'react'

import { useLocalization } from '@context/LocalizationContext'

import { formatTextWithBreaks, insertStrongTags } from '@utils/formatText'
import { t } from '@utils/translator'

import TourOverview from '@components/TourOverview'

interface Props {}

const ToursSection: React.FunctionComponent<Props> = ({}) => {
  const { lang } = useLocalization()

  const images = [overviewImg1, overviewImg2]
  const overviews: {
    title: string
    desc: string
    attribs: string[]
    buttons: { primary: string; secondary: string }
  }[] = t('home.tours.tours', lang)

  const info: string[] = t('home.tours.info.info', lang)

  return (
    <section className="tours-section relative">
      <div className="container flex-col padding-y-4xl flex-gap-xl relative">
        <div className="margin-bottom-2xl">
          <h1>{t('home.tours.title', lang)}</h1>
          <p className="text-balance sm-text-center">
            {formatTextWithBreaks(t('home.tours.subtitle', lang))}
          </p>
        </div>
        {overviews.map((overview, index) => (
          <TourOverview
            key={index}
            title={overview.title}
            description={overview.desc}
            attributes={overview.attribs}
            img={images[index]}
            buttonLabels={overview.buttons}
          ></TourOverview>
        ))}
        <div className="info-list width-half padding-y-2xl">
          <h3 className="margin-bottom-xl">
            {t('home.tours.info.title', lang)}
          </h3>
          <ul>
            {info.map((i) => (
              <li>{insertStrongTags(i, 'text-primary')}</li>
            ))}
          </ul>
        </div>
        <div className="width-full flex justify-end">
          <img
            className="absolute tours-illustration"
            src={nature}
            alt="Nature illustration"
          />
        </div>
      </div>
    </section>
  )
}
export default ToursSection
