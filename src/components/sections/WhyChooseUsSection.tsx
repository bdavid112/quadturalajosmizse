import './why-choose-us-section.scss'

import heroBackground from '../../assets/why-choose-us-header-background.avif'

import * as React from 'react'
import ImageHeader from '../ImageHeader'
import ProfileBioShort from '../ProfileBioShort'
import StatCard from '../ui/StatCard'
import { useWhyChooseUsSection } from '../../hooks/useWhyChooseUsSection'
import WaveBackground from '../ui/WaveBackground'
import { useRef } from 'react'

interface Props {}

const WhyChooseUsSection: React.FunctionComponent<Props> = ({}) => {
  const { profiles, stats } = useWhyChooseUsSection()
  const statCardsContainerRef = useRef(null)

  return (
    <section className="why-choose-us-section">
      <ImageHeader
        img={heroBackground}
        title="Miért válassz <strong>minket?</strong>"
      ></ImageHeader>
      <div className="container flex-col padding-y-4xl">
        <h2 className="width-half why-choose-us-title margin-bottom-3xl">
          Több éves tapasztalattal biztosítjuk a legjobb élményt, legyen szó
          kezdőkről vagy tapasztalt motorosokról!
        </h2>
        {profiles.map((profile) => (
          <ProfileBioShort
            name={profile.name}
            role={profile.role}
            bio={profile.bio}
            img={profile.img}
          ></ProfileBioShort>
        ))}
      </div>
      <div ref={statCardsContainerRef} className="relative">
        <div className="grid margin-bottom-4xl relative stat-cards">
          {stats.map((stat, index) => (
            <div key={index} className="flex justify-center">
              <StatCard
                title={stat.title}
                subtext={stat.subtext}
                icon={stat.icon}
              ></StatCard>
            </div>
          ))}
        </div>
        <WaveBackground
          containerRef={statCardsContainerRef}
          numberOfWaves={stats.length * 6}
        ></WaveBackground>
      </div>
      <h3 className="text-center padding-y-xl">
        Készen állsz egy <strong>kalandra?</strong>
        <br></br> Életre szóló <strong>élménnyel távozol!</strong>
      </h3>
    </section>
  )
}
export default WhyChooseUsSection
