import './tour-overview.scss'

import * as React from 'react'
import ButtonPrimary from './ui/buttons/ButtonPrimary'
import ButtonSecondaryOutline from './ui/buttons/ButtonSecondaryOutline'
import { formatTextWithBreaks, insertStrongTags } from '@utils/formatText'
import { NavLink } from 'react-router-dom'

interface Props {
  title: string
  description: string
  attributes: string[]
  img: { url: string; alt: string }
  buttonLabels: { primary: string; secondary: string }
  objectPos?: string
  onButtonClick?: () => void
}

const TourOverview: React.FunctionComponent<Props> = ({
  title,
  description,
  attributes,
  img,
  buttonLabels,
  objectPos,
  onButtonClick,
}) => {
  /* const { lang, setLang } = useLocalization() */

  return (
    <>
      <div className="tour-overview flex justify-between padding-y-xl">
        <div className="flex flex-col overview-content width-half flex-gap-2xl">
          <h2 className="overview-title">{formatTextWithBreaks(title)}</h2>
          <p>{description}</p>
          <ul>
            {attributes.map((attribute, index) => (
              <li key={index} className="overview-attrib">
                {insertStrongTags(attribute, 'text-primary')}
              </li>
            ))}
          </ul>
          <div className="flex flex-gap-xs overview-button-group">
            <ButtonPrimary
              label={buttonLabels.primary}
              onClick={onButtonClick}
            ></ButtonPrimary>
            <NavLink to={'/tours'}>
              <ButtonSecondaryOutline
                label={buttonLabels.secondary}
              ></ButtonSecondaryOutline>
            </NavLink>
          </div>
        </div>
        <picture>
          <source
            srcSet={`images/${img.url}-1920.avif`}
            media="(min-width: 1920px)"
            type="image/avif"
          ></source>
          <source
            srcSet={`images/${img.url}-1920.webp`}
            media="(min-width: 1920px)"
            type="image/webp"
          ></source>
          <source
            srcSet={`images/${img.url}-1280.avif`}
            /* media="(min-width: 768px)" */
            type="image/avif"
          ></source>
          <source
            srcSet={`images/${img.url}-1280.webp`}
            /* media="(min-width: 768px)" */
            type="image/webp"
          ></source>
          {/*           <source
            srcSet={`images/${img.url}-800.avif`}
            type="image/avif"
          ></source>
          <source
            srcSet={`images/${img.url}-800.webp`}
            type="image/webp"
          ></source> */}
          <img
            srcSet={`
        images/${img.url}-1920.jpg 1920w,
        images/${img.url}-1280.jpg 1280w,
        images/${img.url}-800.jpg 800w
      `}
            sizes="(min-width: 1920px) 1920px, (min-width: 1280px) 1280px, (min-width: 768px) 768px, 100vw"
            src={`images/${img.url}-800.jpg`}
            alt={img.alt}
            className={`overview-image ${objectPos}`}
            loading="lazy"
            fetchPriority="low"
          ></img>
        </picture>
      </div>
      <div className="divider-gray thick"></div>
    </>
  )
}
export default TourOverview
