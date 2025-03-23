import BookingSection from '@components/sections/home/BookingSection'
import TourDetailsSection from '@components/sections/tours/TourDetailsSection'
import HeroLayout from '@layouts/HeroLayout'
import MainLayout from '@layouts/MainLayout'

import * as React from 'react'
import { useRef } from 'react'

interface Props {}

const ToursPage: React.FunctionComponent<Props> = ({}) => {
  const bookingSectionRef = useRef<HTMLDivElement>(null)

  const scrollToBookingSection = () => {
    if (bookingSectionRef.current) {
      bookingSectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <MainLayout>
      <HeroLayout page={'tours'} divider={true}></HeroLayout>
      <TourDetailsSection
        onButtonClick={() => {
          scrollToBookingSection()
        }}
      ></TourDetailsSection>
      <BookingSection ref={bookingSectionRef} plain={true}></BookingSection>
    </MainLayout>
  )
}
export default ToursPage
