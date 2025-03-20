import './tours-section.scss'

import nature from '@assets/tours-nature.svg'

import * as React from 'react'
import axios from 'axios'

import { useLocalization } from '@context/LocalizationContext'

import { formatTextWithBreaks, insertStrongTags } from '@utils/formatText'
import { t } from '@utils/translator'

import TourOverview from '@components/TourOverview'
import { useEffect, useState } from 'react'

interface Props {}

const ToursSection: React.FunctionComponent<Props> = ({}) => {
  const [overviews, setOverviews] = useState<
    {
      title: string
      description: string
      attribs: string[]
      buttons: { primary: string; secondary: string }
    }[]
  >([])

  const { lang } = useLocalization()

  useEffect(() => {
    axios
      .get('/api/tours')
      .then((res) => {
        const tours = res.data.map((tour: any) => ({
          title: tour.name[lang],
          description: tour.description[lang].short,
          attribs: tour.attributes[lang],
          buttons: {
            primary: tour.buttons[lang].primary,
            secondary: tour.buttons[lang].secondary,
          },
        }))
        setOverviews(tours)
      })
      .catch((err) => console.error('Error fetching tours:', err))
  }, [lang])

  const images = [
    { url: 'tour-overview-1', alt: 'Pusztavacs, földrajzi középpont' },
    { url: 'tour-overview-2', alt: 'Pusztavacs, templomrom' },
  ]
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
        {overviews &&
          overviews.map((overview, index) => (
            <TourOverview
              key={index}
              title={overview.title}
              description={overview.description}
              attributes={overview.attribs}
              img={images[index]}
              buttonLabels={overview.buttons}
              objectPos={`${index == 0 ? 'obj-right' : 'obj-left'}`}
            ></TourOverview>
          ))}
        <div className="info-list width-three-quarter padding-y-2xl">
          <h3 className="margin-bottom-xl">
            {t('home.tours.info.title', lang)}
          </h3>
          <ul>
            {info.map((i, index) => (
              <li key={index}>{insertStrongTags(i, 'text-primary')}</li>
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
