import './team-section.scss'

import waves from '@assets/waves-green.svg'
import image1 from '@assets/profile1.jpg'
import image2 from '@assets/profile2.jpg'
import image3 from '@assets/profile3.webp'

import * as React from 'react'

import { useLocalization } from '@context/LocalizationContext'
import { t } from '@utils/translator'
import BioSlider from '@components/BioSlider'
import FAB from '@components/ui/buttons/FAB'
import { useState } from 'react'

interface Props {}

const TeamSection: React.FunctionComponent<Props> = ({}) => {
  const { lang } = useLocalization()
  const [selectedBioIndex, setSelectedBioIndex] = useState(0)

  const images = [image1, image2, image3]
  const profiles: { name: string; role: string; bio: string }[] = t(
    'about-us.team.profiles',
    lang
  )

  return (
    <section className="what-we-do-section padding-top-4xl">
      <img src={waves} alt="Waves" className="width-full waves-divider" />
      <div className="what-we-do-background relative">
        <div className="container flex-col padding-y-4xl relative">
          <FAB
            icon={'arrow_downward'}
            className="absolute left-arrow-button z-overlay border-rounded-full"
            onClick={() => {
              if (selectedBioIndex - 1 >= 0) {
                setSelectedBioIndex(selectedBioIndex - 1)
              }
            }}
            isDisabled={selectedBioIndex <= 0}
          ></FAB>
          <h1 className="text-inverted">{t('about-us.team.title', lang)}</h1>
          <div className="padding-y-4xl">
            <BioSlider
              selectedBioIndex={selectedBioIndex}
              profiles={profiles}
              images={images}
              onChange={setSelectedBioIndex}
            ></BioSlider>
          </div>
          <FAB
            icon={'arrow_downward'}
            className="absolute right-arrow-button z-overlay border-rounded-full"
            onClick={() => {
              if (selectedBioIndex + 1 < profiles.length) {
                setSelectedBioIndex(selectedBioIndex + 1)
              }
            }}
            isDisabled={selectedBioIndex >= profiles.length - 1}
          ></FAB>
        </div>
      </div>
    </section>
  )
}
export default TeamSection
