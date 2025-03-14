import './team-section.scss'
import waves from '@assets/waves-green.svg'

import * as React from 'react'

import { useLocalization } from '@context/LocalizationContext'
import { t } from '@utils/translator'
import { formatTextWithBreaks } from '@utils/formatText'
import BioSlider from '@components/BioSlider'

interface Props {}

const TeamSection: React.FunctionComponent<Props> = ({}) => {
  const { lang } = useLocalization()

  return (
    <section className="what-we-do-section padding-y-4xl">
      <img src={waves} alt="Waves" className="width-full waves-divider" />
      <div className="what-we-do-background relative">
        <div className="container flex-col padding-y-4xl">
          <h1 className="text-inverted">{t('about-us.team.title', lang)}</h1>
          <div className="padding-y-4xl">
            <BioSlider></BioSlider>
          </div>
        </div>
      </div>
    </section>
  )
}
export default TeamSection
