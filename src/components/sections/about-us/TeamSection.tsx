import './team-section.scss'

import waves from '@assets/waves-green.svg'
import image1 from '@assets/profile1.jpg'
import image2 from '@assets/profile2.jpg'
import image3 from '@assets/profile3.webp'

import * as React from 'react'

import { useLocalization } from '@context/LocalizationContext'
import { t } from '@utils/translator'
import BioSlider from '@components/BioSlider'

interface Props {}

const TeamSection: React.FunctionComponent<Props> = ({}) => {
  const { lang } = useLocalization()

  const images = [image1, image2, image3]
  const profiles: { name: string; role: string; bio: string }[] = t(
    'about-us.team.profiles',
    lang
  )

  return (
    <section className="what-we-do-section padding-top-4xl">
      <img src={waves} alt="Waves" className="width-full waves-divider" />
      <div className="what-we-do-background relative">
        <div className="container flex-col padding-y-4xl">
          <h1 className="text-inverted">{t('about-us.team.title', lang)}</h1>
          <div className="padding-y-4xl">
            <BioSlider profiles={profiles} images={images}></BioSlider>
          </div>
        </div>
      </div>
    </section>
  )
}
export default TeamSection
