import './tour-overview.scss'

import * as React from 'react'
import ButtonPrimary from './ui/buttons/ButtonPrimary'
import ButtonSecondaryOutline from './ui/buttons/ButtonSecondaryOutline'
import { formatTextWithBreaks } from '../utils/formatText'

interface Props {
  title: string
  description: string
  attributes: { strong: string; regular: string }[]
  img: string
}

const TourOverview: React.FunctionComponent<Props> = ({
  title,
  description,
  attributes,
  img,
}) => {
  /* const { lang, setLang } = useLocalization() */

  return (
    <>
      <div className="tour-overview flex justify-between align-center padding-y-xl">
        <div className="flex flex-col overview-content width-half flex-gap-2xl">
          <h2 className="overview-title">{formatTextWithBreaks(title)}</h2>
          <p>{description}</p>
          <ul>
            {attributes.map((attribute, index) => (
              <li key={index} className="overview-attrib">
                <strong className="text-primary">{attribute.strong}</strong>
                {attribute.regular}
              </li>
            ))}
          </ul>
          <div className="flex flex-gap-xs overview-button-group">
            <ButtonPrimary label="Érdekel"></ButtonPrimary>
            <ButtonSecondaryOutline text="További részletek"></ButtonSecondaryOutline>
          </div>
        </div>
        <picture>
          <source srcSet={img} type="image/avif"></source>
          <img
            src={`../../assets/${img}.jpg`}
            alt="Tour overview"
            className="overview-image"
            loading="eager"
            fetchPriority="high"
          ></img>
        </picture>
      </div>
      <div className="divider-gray thick"></div>
    </>
  )
}
export default TourOverview
