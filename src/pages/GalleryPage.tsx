import CTASection from '@components/sections/CTASection'
import GallerySection from '@components/sections/gallery/GallerySection'
import { useLocalization } from '@context/LocalizationContext'
import HeroLayout from '@layouts/HeroLayout'
import MainLayout from '@layouts/MainLayout'
import { t } from '@utils/translator'

import * as React from 'react'

interface Props {}

const GalleryPage: React.FunctionComponent<Props> = ({}) => {
  const { lang } = useLocalization()

  return (
    <MainLayout>
      <HeroLayout page={'gallery'} divider={true}></HeroLayout>
      <GallerySection></GallerySection>
      <CTASection
        title={t('gallery.cta.title', lang)}
        subtext={t('gallery.cta.subtext', lang)}
        buttonLabels={{
          primary: t('gallery.cta.buttons.primary', lang),
          secondary: t('gallery.cta.buttons.secondary', lang),
        }}
        plain={true}
      ></CTASection>
    </MainLayout>
  )
}
export default GalleryPage
