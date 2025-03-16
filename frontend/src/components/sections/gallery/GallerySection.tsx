import * as React from 'react'
import { t } from '@utils/translator'
import { useLocalization } from '@context/LocalizationContext'
import ImageContainer from '@components/ImageContainer'

interface Props {}

const GallerySection: React.FunctionComponent<Props> = () => {
  const { lang } = useLocalization()

  const sections: { title: string; subtext: string }[] = t(
    'gallery.gallery.sections',
    lang
  )

  return (
    <section className="gallery-section relative">
      <div className="container padding-y-4xl flex-col">
        <h1 className="margin-bottom-4xl">
          {t('gallery.gallery.title', lang)}
        </h1>
        {sections &&
          sections.map((section, index) => (
            <ImageContainer
              key={index}
              title={section.title}
              subtext={section.subtext}
              images={['', '', '', '', '', '', '', '']}
            ></ImageContainer>
          ))}
      </div>
    </section>
  )
}
export default GallerySection
