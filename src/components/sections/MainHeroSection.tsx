import './main-hero-section.scss'
import heroImageAvif from '../../assets/main-hero-background.avif'
import heroImageWebp from '../../assets/main-hero-background.webp'

import ButtonPrimary from '../ui/buttons/ButtonPrimary'
import ButtonSecondaryOutline from '../ui/buttons/ButtonSecondaryOutline'
import FAB from '../ui/buttons/FAB'
import * as React from 'react'
import { useLocalization } from '../../context/LocalizationContext'
import { t } from '../../utils/translator'
import { insertStrongTags } from '../../utils/formatText'

interface Props {}

const MainHeroSection: React.FunctionComponent<Props> = ({}) => {
  const { lang } = useLocalization()

  return (
    <section className="main-hero relative">
      <picture>
        <source srcSet={heroImageAvif} type="image/avif"></source>
        <source srcSet={heroImageWebp} type="image/webp"></source>
        <img
          src="../../assets/main-hero-background.jpg"
          alt="Hero Background"
          className="hero-image"
          loading="eager"
          fetchPriority="high"
        ></img>
      </picture>
      <div className="container main-hero-content flex-col">
        <h1 className="text-inverted main-hero-title width-half">
          {insertStrongTags(t('home.hero.title', lang))}
        </h1>
        <p className="text-inverted main-hero-subtext width-half">
          {t('home.hero.subtext', lang)}
        </p>
        <div className="flex flex-gap-lg button-group">
          <ButtonPrimary
            label={t('home.hero.buttons.primary', lang)}
          ></ButtonPrimary>
          <ButtonSecondaryOutline
            text={t('home.hero.buttons.secondary', lang)}
          ></ButtonSecondaryOutline>
        </div>
      </div>
      <FAB
        className="absolute main-hero-fab border-rounded-full"
        icon="arrow_downward"
      ></FAB>
    </section>
  )
}
export default MainHeroSection
