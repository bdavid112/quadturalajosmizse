import ImageHeader from '@components/ImageHeader'
import TeamSection from '@components/sections/about-us/TeamSection'
import WhatWeDoSection from '@components/sections/about-us/WhatWeDoSection'
import CTASection from '@components/sections/CTASection'
import { useLocalization } from '@context/LocalizationContext'
import HeroLayout from '@layouts/HeroLayout'
import MainLayout from '@layouts/MainLayout'
import { t } from '@utils/translator'

import * as React from 'react'

interface Props {}

const AboutUsPage: React.FunctionComponent<Props> = ({}) => {
  const { lang } = useLocalization()

  return (
    <MainLayout>
      <HeroLayout page={'about-us'}></HeroLayout>
      <ImageHeader
        title={t('about-us.hero.cta-title', lang)}
        img={{ url: 'about-us-hero', alt: 'About Us hero image' }}
      ></ImageHeader>
      <WhatWeDoSection></WhatWeDoSection>
      <TeamSection></TeamSection>
      <CTASection
        title={t('about-us.cta.title', lang)}
        subtext={t('about-us.cta.subtext', lang)}
        buttonLabels={{
          primary: t('about-us.cta.buttons.primary', lang),
          secondary: t('about-us.cta.buttons.secondary', lang),
        }}
      ></CTASection>
    </MainLayout>
  )
}
export default AboutUsPage
