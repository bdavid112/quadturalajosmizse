import ImageHeader from '@components/ImageHeader'
import TeamSection from '@components/sections/about-us/TeamSection'
import WhatWeDoSection from '@components/sections/about-us/WhatWeDoSection'
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
        img={'about-us-hero'}
      ></ImageHeader>
      <WhatWeDoSection></WhatWeDoSection>
      <TeamSection></TeamSection>
    </MainLayout>
  )
}
export default AboutUsPage
