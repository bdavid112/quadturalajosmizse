import * as React from 'react'
import { t } from '../utils/translator'
import { formatTextWithBreaks as f } from '../utils/formatText'

import '../styles/layout.scss'
import '../styles/utilities.scss'
import './hero-layout.scss'

interface Props {
  page: string
  section: string
  lang?: string
  divider?: boolean
}

const HeroLayout: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <section>
      <div className="container">
        <div className="text-center padding-y-5xl">
          <h1 className="hero-text text-shadow-light">
            {t(`${props.page}.${props.section}.title`, props.lang)}
          </h1>
          <div className="subtext-wrapper">
            <h3>{t(`${props.page}.${props.section}.subtitle`, props.lang)}</h3>
            <p>{f(t(`${props.page}.${props.section}.body`, props.lang))}</p>
          </div>
        </div>
      </div>
      {props.divider && <div className="divider-green"></div>}
    </section>
  )
}

export default HeroLayout
