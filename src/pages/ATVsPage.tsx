import ImageHeader from '@components/ImageHeader'
import ATVCatalogSection from '@components/sections/atvs/ATVCatalogSection'
import CTASection from '@components/sections/CTASection'
import { useLocalization } from '@context/LocalizationContext'
import HeroLayout from '@layouts/HeroLayout'
import MainLayout from '@layouts/MainLayout'
import { t } from '@utils/translator'

import * as React from 'react'

interface Props {}

const ATVsPage: React.FunctionComponent<Props> = ({}) => {
  const { lang } = useLocalization()

  return (
    <MainLayout>
      <HeroLayout page={'atvs'}></HeroLayout>
      <ImageHeader
        title={t('atvs.hero.cta-title', lang)}
        img={'atvs-hero'}
      ></ImageHeader>
      <ATVCatalogSection></ATVCatalogSection>
      <CTASection
        title={t('atvs.cta.title', lang)}
        subtext={t('atvs.cta.subtext', lang)}
        buttonLabels={{
          primary: t('atvs.cta.buttons.primary', lang),
          secondary: t('atvs.cta.buttons.secondary', lang),
        }}
      ></CTASection>
    </MainLayout>
  )
}
export default ATVsPage
