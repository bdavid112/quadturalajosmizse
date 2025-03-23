import './testimonials-section.scss'

import * as React from 'react'
import { useEffect, useRef, useState } from 'react'

import { useLocalization } from '@context/LocalizationContext'

import { t } from '@utils/translator'
import { formatTextWithBreaks } from '@utils/formatText'

import ReviewForm from '@components/ui/forms/ReviewForm'
import ReviewCard from '@components/ui/ReviewCard'
import WaveBackground from '@components/ui/WaveBackground'
import CardCarousel from '@components/ui/CardCarousel'
import axios from 'axios'

interface Props {}

const TestimonialsSection: React.FunctionComponent<Props> = ({}) => {
  const { lang } = useLocalization()
  const formContainerRef = useRef<HTMLDivElement | null>(null)

  const [reviews, setReviews] = useState<
    {
      name: string
      comment: string
      rating: string
      createdAt: string
    }[]
  >([])

  useEffect(() => {
    axios
      .get('/api/reviews/latest')
      .then((res) => {
        setReviews(res.data)
      })
      .catch((err) => {
        console.error('Error fetching reviews:', err)
      })
  }, [])

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
              title={'Értékelés'}
              subtext={review.comment}
              name={review.name}
              date={review.createdAt.split('T')[0]}
              rating={parseInt(review.rating)}
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
