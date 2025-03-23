import waves from '@assets/waves-brown.svg'

import ATVDetails from '@components/ATVDetails'
import { useLocalization } from '@context/LocalizationContext'
import { formatTextWithBreaks } from '@utils/formatText'
import { t } from '@utils/translator'

import * as React from 'react'

interface Props {}

const ATVCatalogSection: React.FunctionComponent<Props> = ({}) => {
  const { lang } = useLocalization()

  const images = [
    { url: '/images/goes-terrox-400l.avif', alt: 'Can-Am Outlander 800R XM R' },
    { url: '/images/goes-terrox-400s.avif', alt: 'Honda TRX 500 Foreman 4x4' },
    { url: '/images/cfmoto-450s.avif', alt: 'Yamaha Grizzly 700 EPS' },
  ]
  const atvs: {
    manufacturer: string
    model: string
    desc: string
    specs: string[]
  }[] = t('atvs.catalog.atvs', lang)

  return (
    <section>
      <div className="container flex-col padding-y-4xl">
        <div>
          <h1>{t('atvs.catalog.title', lang)}</h1>
          <p>{formatTextWithBreaks(t('atvs.catalog.subtext', lang))}</p>
        </div>
        <div className="padding-y-4xl flex flex-col flex-gap-4xl">
          {atvs.map((atv, index) => (
            <ATVDetails
              key={index}
              manufacturer={atv.manufacturer}
              model={atv.model}
              description={atv.desc}
              specs={atv.specs}
              img={images[index]}
            ></ATVDetails>
          ))}
        </div>
      </div>
      <img src={waves} alt="Waves" className="width-full waves-divider block" />
    </section>
  )
}
export default ATVCatalogSection
