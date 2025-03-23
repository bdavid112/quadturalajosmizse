import './tour-details.scss'

import * as React from 'react'
import ButtonPrimary from './ui/buttons/ButtonPrimary'
import { insertStrongTags } from '@utils/formatText'
import { t } from '@utils/translator'
import { useLocalization } from '@context/LocalizationContext'

interface Props {
  description: string
  attributes: string[]
  img: { url: string; alt: string }
  prices: string[]
  onButtonClick?: () => void
}

const TourDetails: React.FunctionComponent<Props> = ({
  description,
  attributes,
  img,
  prices,
  onButtonClick,
}) => {
  const { lang } = useLocalization()

  return (
    <div className="flex-col">
      <div className="flex flex-gap-4xl tour-detail">
        <img className="" src={img.url} alt={img.alt} />
        <div className="width-half padding-y-4xl tour-detail-text">
          <div className="margin-bottom-2xl">
            <h3 className="margin-bottom-md">
              {t('tours.tour-details.desc', lang)}
            </h3>
            <p className="text-balance">{description}</p>
          </div>
          <div className="margin-bottom-2xl">
            <h3 className="margin-bottom-md">
              {t('tours.tour-details.attribs', lang)}
            </h3>
            <ul className="list-disc">
              {attributes.map((attrib, index) => (
                <li key={index}>{insertStrongTags(attrib, 'text-primary')}</li>
              ))}
            </ul>
          </div>
          <div className="margin-bottom-2xl">
            <h3 className="margin-bottom-md">
              {t('tours.tour-details.prices', lang)}
            </h3>
            <ul className="list-disc">
              {prices.map((price, index) => (
                <li key={index}>{insertStrongTags(price, 'text-primary')}</li>
              ))}
            </ul>
          </div>
          <div className="tour-detail-button-container">
            <ButtonPrimary
              fullWidth={true}
              label={t('tours.tour-details.button-label', lang)}
              onClick={onButtonClick}
            ></ButtonPrimary>
          </div>
        </div>
      </div>
      <div className="divider-gray"></div>
    </div>
  )
}
export default TourDetails
