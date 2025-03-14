import './hero-layout.scss'

import * as React from 'react'
import { t } from '../utils/translator'
import { formatTextWithBreaks as f } from '../utils/formatText'
import { useLocalization } from '../context/LocalizationContext'

interface Props {
  page: string
  divider?: boolean
}

const HeroLayout: React.FunctionComponent<Props> = ({ page, divider }) => {
  const { lang } = useLocalization()

  return (
    <section>
      <div className="container justify-center">
        <div className="text-center padding-y-5xl">
          <h1 className="hero-text text-shadow-light">
            {t(`${page}.hero.title`, lang)}
          </h1>
          <div className="subtext-wrapper">
            <h2>{t(`${page}.hero.subtitle`, lang)}</h2>
            <p>{f(t(`${page}.hero.body`, lang))}</p>
          </div>
        </div>
      </div>
      {divider && <div className="divider-green"></div>}
    </section>
  )
}

export default HeroLayout
