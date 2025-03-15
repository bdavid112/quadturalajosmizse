import BookingSection from '@components/sections/home/BookingSection'
import FAQSection from '@components/sections/home/FAQSection'
import MainHeroSection from '@components/sections/home/MainHeroSection'
import TestimonialsSection from '@components/sections/home/TestimonialsSection'
import ToursSection from '@components/sections/home/ToursSection'
import WhyChooseUsSection from '@components/sections/home/WhyChooseUsSection'
import { useLocalization } from '@context/LocalizationContext'
import MainLayout from '@layouts/MainLayout'
import { t } from '@utils/translator'

import * as React from 'react'

interface Props {}

const HomePage: React.FunctionComponent<Props> = ({}) => {
  const { lang } = useLocalization()

  const accordions: { question: string; answer: string }[] = t(
    'home.faq.accordions',
    lang
  )

  return (
    <MainLayout>
      <MainHeroSection></MainHeroSection>
      <ToursSection></ToursSection>
      <WhyChooseUsSection></WhyChooseUsSection>
      <BookingSection></BookingSection>
      <TestimonialsSection></TestimonialsSection>
      <FAQSection accordions={accordions}></FAQSection>
    </MainLayout>
  )
}
export default HomePage
