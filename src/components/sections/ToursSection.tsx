import './tours-section.scss'

import nature from '../../assets/tours-nature.svg'

import TourOverview from '../TourOverview'
import * as React from 'react'
import { useToursSection } from '../../hooks/useToursSection'
import { useLocalization } from '../../context/LocalizationContext'

interface Props {}

const ToursSection: React.FunctionComponent<Props> = ({}) => {
  const { lang } = useLocalization()
  const { overviews, info } = useToursSection(lang)

  return (
    <section className="tours-section relative">
      <div className="container flex-col padding-y-4xl flex-gap-xl relative">
        <div className="margin-bottom-2xl">
          <h1>Válassz két izgalmas quad túra közül!</h1>
          <p>
            Fedezd fel a természet szépségeit és élvezd a szabadságot
            quadjainkkal!<br></br> Két különböző túrát kínálunk, így mindenki
            megtalálhatja a számára megfelelő kihívást.
          </p>
        </div>
        {overviews.map((overview, index) => (
          <TourOverview
            key={index}
            title={overview.title}
            description={overview.description}
            attributes={overview.attributes}
            img={overview.img}
          ></TourOverview>
        ))}
        <div className="info-list width-half padding-y-2xl">
          <h3 className="margin-bottom-xl">Fontos tudnivalók</h3>
          <ul>
            {info.map((i) => (
              <li>
                <strong className="text-primary">{i.strong}</strong>
                {i.regular}
              </li>
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
