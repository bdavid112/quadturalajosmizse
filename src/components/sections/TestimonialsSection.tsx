import { useRef } from 'react'
import ReviewForm from '../ui/forms/ReviewForm'
import ReviewCard from '../ui/ReviewCard'
import './testimonials-section.scss'

import * as React from 'react'
import WaveBackground from '../ui/WaveBackground'
import CardCarousel from '../ui/CardCarousel'
import { useTestimonialsSection } from '../../hooks/useTestimonialsSection'
import { t } from '../../utils/translator'
import { useLocalization } from '../../context/LocalizationContext'
import { formatTextWithBreaks } from '../../utils/formatText'

interface Props {}

const TestimonialsSection: React.FunctionComponent<Props> = ({}) => {
  const { lang } = useLocalization()
  const { reviews } = useTestimonialsSection()
  const formContainerRef = useRef<HTMLDivElement | null>(null)

  return (
    <section className="testimonials-section padding-y-4xl">
      <div className="container flex-col">
        <div>
          <h1>{t('home.testimonials.title', lang)}</h1>
          <h4>{t('home.testimonials.subtitle', lang)}</h4>
        </div>
      </div>
      <div className="flex justify-center carousel-container">
        <CardCarousel itemsLength={reviews.length}>
          {reviews.map((review, index) => (
            <ReviewCard
              key={index}
              title={review.title}
              subtext={review.text}
              name={review.name}
              date={review.date}
            ></ReviewCard>
          ))}
        </CardCarousel>
      </div>
      <h2 className="text-center padding-y-4xl">
        {formatTextWithBreaks(t('home.testimonials.cta-text', lang))}
      </h2>
      <div ref={formContainerRef} className="relative">
        <div className="container justify-center">
          <div className="width-half review-form-wrapper">
            <ReviewForm></ReviewForm>
          </div>
        </div>
        <WaveBackground
          numberOfWaves={12}
          containerRef={formContainerRef}
        ></WaveBackground>
      </div>
    </section>
  )
}
export default TestimonialsSection
