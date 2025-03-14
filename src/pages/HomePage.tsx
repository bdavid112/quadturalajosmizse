import BookingSection from '@components/sections/home/BookingSection'
import FAQSection from '@components/sections/home/FAQSection'
import MainHeroSection from '@components/sections/home/MainHeroSection'
import TestimonialsSection from '@components/sections/home/TestimonialsSection'
import ToursSection from '@components/sections/home/ToursSection'
import WhyChooseUsSection from '@components/sections/home/WhyChooseUsSection'
import MainLayout from '@layouts/MainLayout'

import * as React from 'react'

interface Props {}

const HomePage: React.FunctionComponent<Props> = ({}) => {
  return (
    <MainLayout>
      <MainHeroSection></MainHeroSection>
      <ToursSection></ToursSection>
      <WhyChooseUsSection></WhyChooseUsSection>
      <BookingSection></BookingSection>
      <TestimonialsSection></TestimonialsSection>
      <FAQSection></FAQSection>
    </MainLayout>
  )
}
export default HomePage
