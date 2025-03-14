import * as React from 'react'

import { useLocalization } from '@context/LocalizationContext'
import { t } from '@utils/translator'
import { formatTextWithParagraphs } from '@utils/formatText'

interface Props {}

const WhatWeDoSection: React.FunctionComponent<Props> = ({}) => {
  const { lang } = useLocalization()

  const items: { title: string; text: string }[] = t(
    'about-us.what-we-do.items',
    lang
  )

  return (
    <section className="what-we-do-section padding-y-4xl">
      <div className="container flex-col">
        <h1 className="margin-bottom-4xl">
          {t('about-us.what-we-do.title', lang)}
        </h1>
        {items.map((i, index) => (
          <div
            key={index}
            className="margin-bottom-2xl flex flex-col flex-gap-md"
          >
            <h2 className="margin-bottom-md">{i.title}</h2>
            {formatTextWithParagraphs(i.text)}
          </div>
        ))}
      </div>
    </section>
  )
}
export default WhatWeDoSection
