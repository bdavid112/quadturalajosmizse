import GallerySection from '@components/sections/gallery/GallerySection'
import HeroLayout from '@layouts/HeroLayout'
import MainLayout from '@layouts/MainLayout'

import * as React from 'react'

interface Props {}

const GalleryPage: React.FunctionComponent<Props> = ({}) => {
  return (
    <MainLayout>
      <HeroLayout page={'gallery'} divider={true}></HeroLayout>
      <GallerySection></GallerySection>
    </MainLayout>
  )
}
export default GalleryPage
