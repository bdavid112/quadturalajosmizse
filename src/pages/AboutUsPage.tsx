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
        img={'about-us-hero'}
      ></ImageHeader>
      <WhatWeDoSection></WhatWeDoSection>
      <TeamSection></TeamSection>
      <CTASection
        title={'Készen állsz egy felejthetetlen kalandra?'}
        subtext={
          'Ne maradj le erről az élményről!\nCsatlakozz hozzánk egy izgalmas túrára, és tapasztald meg a terep motorozás szabadságát!'
        }
        buttonLabels={{
          primary: 'Időpontfoglalás',
          secondary: 'Lépj velünk kapcsolatba',
        }}
      ></CTASection>
    </MainLayout>
  )
}
export default AboutUsPage
