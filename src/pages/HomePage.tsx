import BookingSection from '../components/sections/BookingSection'
import MainHeroSection from '../components/sections/MainHeroSection'
import ToursSection from '../components/sections/ToursSection'
import WhyChooseUsSection from '../components/sections/WhyChooseUsSection'
import MainLayout from '../layouts/MainLayout'

import * as React from 'react'

interface Props {}

const HomePage: React.FunctionComponent<Props> = ({}) => {
  return (
    <MainLayout>
      <MainHeroSection></MainHeroSection>
      <ToursSection></ToursSection>
      <WhyChooseUsSection></WhyChooseUsSection>
      <BookingSection></BookingSection>
    </MainLayout>
  )
}
export default HomePage
