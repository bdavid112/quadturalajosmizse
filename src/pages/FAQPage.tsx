import FAQSection from '@components/sections/home/FAQSection'
import { useLocalization } from '@context/LocalizationContext'
import HeroLayout from '@layouts/HeroLayout'
import MainLayout from '@layouts/MainLayout'
import { t } from '@utils/translator'

import * as React from 'react'

interface Props {}

const FAQPage: React.FunctionComponent<Props> = ({}) => {
  const { lang } = useLocalization()

  const accordions: { question: string; answer: string }[] = t(
    'faq.accordions',
    lang
  )

  return (
    <MainLayout>
      <HeroLayout page={'faq'} divider={true}></HeroLayout>
      <FAQSection accordions={accordions}></FAQSection>
    </MainLayout>
  )
}
export default FAQPage
