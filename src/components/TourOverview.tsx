import './tour-overview.scss'

import * as React from 'react'
import ButtonPrimary from './ui/buttons/ButtonPrimary'
import ButtonSecondaryOutline from './ui/buttons/ButtonSecondaryOutline'
import { formatTextWithBreaks, insertStrongTags } from '@utils/formatText'
import ResponsiveImage from './ResponsiveImage'

interface Props {
  title: string
  description: string
  attributes: string[]
  img: { url: string; alt: string }
  buttonLabels: { primary: string; secondary: string }
  objectPos?: string
}

const TourOverview: React.FunctionComponent<Props> = ({
  title,
  description,
  attributes,
  img,
  buttonLabels,
  objectPos,
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
            <ButtonPrimary label={buttonLabels.primary}></ButtonPrimary>
            <ButtonSecondaryOutline
              label={buttonLabels.secondary}
            ></ButtonSecondaryOutline>
          </div>
        </div>
        <ResponsiveImage img={img} className={`overview-image ${objectPos}`} />
      </div>
      <div className="divider-gray thick"></div>
    </>
  )
}
export default TourOverview
