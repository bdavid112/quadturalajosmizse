import './atv-details.scss'

import * as React from 'react'

import { useLocalization } from '@context/LocalizationContext'
import SegmentedButton from './ui/buttons/SegmentedButton'
import { insertStrongTags } from '@utils/formatText'
import { useState } from 'react'
import { t } from '@utils/translator'

interface Props {
  manufacturer: string
  model: string
  description: string
  specs: string[]
  img: { url: string; alt: string }
}

const ATVDetails: React.FunctionComponent<Props> = ({
  manufacturer,
  model,
  description,
  specs,
  img,
}) => {
  const [selectedTab, setSelectedTab] = useState(0)

  const { lang } = useLocalization()

  return (
    <div>
      <div className="flex flex-gap-4xl margin-bottom-xl atv-details">
        <div className="flex flex-col width-content atv-image-container">
          <img
            className="atv-image margin-bottom-xl"
            src={img.url}
            alt={img.alt}
          />
          <span className="text-center font-bold">{manufacturer}</span>
          <span className="text-center font-size-secondary">{model}</span>
        </div>
        <div className="atv-detail-text">
          <div className="flex margin-bottom-xl flex-gap-md">
            <button
              onClick={() => setSelectedTab(0)}
              className={`font-size-md atv-detail-button ${selectedTab == 0 ? 'active' : ''}`}
            >
              {t('atvs.catalog.desc', lang)}
            </button>
            <button
              onClick={() => setSelectedTab(1)}
              className={`font-size-md atv-detail-button ${selectedTab == 1 ? 'active' : ''}`}
            >
              {t('atvs.catalog.specs', lang)}
            </button>
            <SegmentedButton
              className="mobile-atv-detail-button"
              labels={[
                t('atvs.catalog.desc', lang),
                t('atvs.catalog.specs', lang),
              ]}
              onChange={setSelectedTab}
            ></SegmentedButton>
          </div>
          <p
            className={`text-balance tab animated-content ${selectedTab == 0 ? 'open' : ''}`}
          >
            {description}
          </p>
          <ul
            className={`list-disc specs tab animated-content ${selectedTab == 1 ? 'open' : ''}`}
          >
            {specs.map((spec, index) => (
              <li key={index}>{insertStrongTags(spec, 'text-primary')}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="divider-gray"></div>
    </div>
  )
}
export default ATVDetails
