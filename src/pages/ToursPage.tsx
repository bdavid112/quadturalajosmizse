import BookingSection from '@components/sections/home/BookingSection'
import TourDetailsSection from '@components/sections/tours/TourDetailsSection'
import HeroLayout from '@layouts/HeroLayout'
import MainLayout from '@layouts/MainLayout'

import * as React from 'react'

interface Props {}

const ToursPage: React.FunctionComponent<Props> = ({}) => {
  return (
    <MainLayout>
      <HeroLayout page={'tours'} divider={true}></HeroLayout>
      <TourDetailsSection></TourDetailsSection>
      <BookingSection plain={true}></BookingSection>
    </MainLayout>
  )
}
export default ToursPage
