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
import { useRef } from 'react'

interface Props {}

const HomePage: React.FunctionComponent<Props> = ({}) => {
  const bookingSectionRef = useRef<HTMLDivElement>(null)
  const toursSectionRef = useRef<HTMLDivElement>(null)

  const scrollToBookingSection = () => {
    if (bookingSectionRef.current) {
      bookingSectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  const { lang } = useLocalization()

  const accordions: { question: string; answer: string }[] = t(
    'home.faq.accordions',
    lang
  )

  return (
    <MainLayout>
      <MainHeroSection
        onPrimaryButtonClick={() => scrollToBookingSection()}
        onFABClick={() => {
          if (toursSectionRef.current) {
            toursSectionRef.current.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            })
          }
        }}
      ></MainHeroSection>
      <ToursSection
        ref={toursSectionRef}
        onPrimaryButtonClick={() => scrollToBookingSection()}
      ></ToursSection>
      <WhyChooseUsSection></WhyChooseUsSection>
      <BookingSection ref={bookingSectionRef}></BookingSection>
      <TestimonialsSection></TestimonialsSection>
      <FAQSection accordions={accordions}></FAQSection>
    </MainLayout>
  )
}
export default HomePage
