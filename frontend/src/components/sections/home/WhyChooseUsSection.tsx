import './why-choose-us-section.scss'

import * as React from 'react'
import { useRef } from 'react'
import { useLocalization } from '@context/LocalizationContext'
import { t } from '@utils/translator'
import { formatTextWithBreaksAndStrongTags } from '@utils/formatText'

import ImageHeader from '@components/ImageHeader'
import ProfileBioShort from '@components/ProfileBioShort'
import StatCard from '@components/ui/StatCard'
import WaveBackground from '@components/ui/WaveBackground'
import CardCarousel from '@components/ui/CardCarousel'

interface Props {}

const WhyChooseUsSection: React.FunctionComponent<Props> = ({}) => {
  const { lang } = useLocalization()
  const statCardsContainerRef = useRef<HTMLDivElement | null>(null)

  /* Profile bios */
  const images = [
    '/images/profile1.avif',
    '/images/profile2.avif',
    '/images/profile3.avif',
  ]
  const profiles: { name: string; role: string; bio: string }[] = t(
    'home.why-choose-us.bios',
    lang
  )

  /* Stat cards */
  const icons = ['trophy', 'map', 'sentiment_satisfied', 'sports_motorsports']
  const stats: { title: string; subtext: string }[] = t(
    'home.why-choose-us.stats',
    lang
  )

  return (
    <section className="why-choose-us-section">
      <ImageHeader
        img={{ url: 'why-choose-us-hero', alt: 'Why Choose Us hero image' }}
        title={t('home.why-choose-us.title', lang)}
      ></ImageHeader>
      <div className="container flex-col padding-y-4xl">
        <h2 className="why-choose-us-title margin-bottom-3xl sm-text-center">
          {t('home.why-choose-us.subtitle', lang)}
        </h2>
        {profiles.map((profile, index) => (
          <ProfileBioShort
            key={index}
            name={profile.name}
            role={profile.role}
            bio={profile.bio}
            img={images[index]}
          ></ProfileBioShort>
        ))}
      </div>
      <div className="relative">
        <div ref={statCardsContainerRef}>
          <CardCarousel itemsLength={stats.length} className="stat-cards">
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                title={stat.title}
                subtext={stat.subtext}
                icon={icons[index]}
              ></StatCard>
            ))}
          </CardCarousel>
        </div>
        <WaveBackground
          containerRef={statCardsContainerRef}
          numberOfWaves={stats.length * 5 - 2}
        ></WaveBackground>
      </div>
      <h3 className="text-center padding-y-4xl">
        {formatTextWithBreaksAndStrongTags(
          t('home.why-choose-us.cta-text', lang)
        )}
      </h3>
    </section>
  )
}
export default WhyChooseUsSection
