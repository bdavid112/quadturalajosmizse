import HeroLayout from '../layouts/HeroLayout'
import MainLayout from '../layouts/MainLayout'

import * as React from 'react'

interface Props {}

const AboutUsPage: React.FunctionComponent<Props> = ({}) => {
  return (
    <MainLayout>
      <HeroLayout page={'about-us'}></HeroLayout>
    </MainLayout>
  )
}
export default AboutUsPage
