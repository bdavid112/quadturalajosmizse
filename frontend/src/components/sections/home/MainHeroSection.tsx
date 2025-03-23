import './main-hero-section.scss'

import * as React from 'react'

import { useLocalization } from '@context/LocalizationContext'

import { t } from '@utils/translator'
import { insertStrongTags } from '@utils/formatText'

import ButtonPrimary from '@components/ui/buttons/ButtonPrimary'
import ButtonSecondaryOutline from '@components/ui/buttons/ButtonSecondaryOutline'
import FAB from '@components/ui/buttons/FAB'
import ResponsiveImage from '@components/ResponsiveImage'
import { NavLink } from 'react-router-dom'

interface Props {
  onPrimaryButtonClick?: () => void
}

const MainHeroSection: React.FunctionComponent<Props> = ({
  onPrimaryButtonClick,
}) => {
  const { lang } = useLocalization()

  return (
    <section className="main-hero relative">
      <ResponsiveImage
        img={{
          url: 'main-hero',
          alt: 'Main hero image',
        }}
        className="hero-image"
      />
      <div className="container main-hero-content flex-col">
        <h1 className="text-inverted main-hero-title width-half">
          {insertStrongTags(t('home.hero.title', lang))}
        </h1>
        <p className="text-inverted main-hero-subtext width-half">
          {t('home.hero.subtext', lang)}
        </p>
        <div className="flex flex-gap-xs button-group">
          <ButtonPrimary
            label={t('home.hero.buttons.primary', lang)}
            onClick={onPrimaryButtonClick}
          ></ButtonPrimary>
          <NavLink to={'/tours'}>
            <ButtonSecondaryOutline
              label={t('home.hero.buttons.secondary', lang)}
            ></ButtonSecondaryOutline>
          </NavLink>
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
