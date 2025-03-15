import ImageHeader from '@components/ImageHeader'
import ATVCatalogSection from '@components/sections/atvs/ATVCatalogSection'
import HeroLayout from '@layouts/HeroLayout'
import MainLayout from '@layouts/MainLayout'

import * as React from 'react'

interface Props {}

const ATVsPage: React.FunctionComponent<Props> = ({}) => {
  return (
    <MainLayout>
      <HeroLayout page={'atvs'}></HeroLayout>
      <ImageHeader
        title={'Ismerd meg <strong>útitársaid</strong>!'}
        img={'atvs-hero'}
      ></ImageHeader>
      <ATVCatalogSection></ATVCatalogSection>
    </MainLayout>
  )
}
export default ATVsPage
