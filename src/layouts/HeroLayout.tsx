import './hero-layout.scss'

import * as React from 'react'
import { t } from '../utils/translator'
import { formatTextWithBreaks as f } from '../utils/formatText'
import { useLocalization } from '../context/LocalizationContext'

interface Props {
  page: string
  section: string
  divider?: boolean
}

const HeroLayout: React.FunctionComponent<Props> = ({
  page,
  section,
  divider,
}) => {
  const { lang } = useLocalization()

  return (
    <section>
      <div className="container">
        <div className="text-center padding-y-5xl">
          <h1 className="hero-text text-shadow-light">
            {t(`${page}.${section}.title`, lang)}
          </h1>
          <div className="subtext-wrapper">
            <h2>{t(`${page}.${section}.subtitle`, lang)}</h2>
            <p>{f(t(`${page}.${section}.body`, lang))}</p>
          </div>
        </div>
      </div>
      {divider && <div className="divider-green"></div>}
    </section>
  )
}

export default HeroLayout
