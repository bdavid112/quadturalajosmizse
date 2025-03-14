import { useRef } from 'react'
import ReviewForm from '../ui/forms/ReviewForm'
import ReviewCard from '../ui/ReviewCard'
import './testimonials-section.scss'

import * as React from 'react'
import WaveBackground from '../ui/WaveBackground'
import CardCarousel from '../ui/CardCarousel'

interface Props {}

const TestimonialsSection: React.FunctionComponent<Props> = ({}) => {
  /* const { lang, setLang } = useLocalization() */

  const formContainerRef = useRef<HTMLDivElement | null>(null)

  const reviews = [
    {
      title: 'Értékelés',
      text: 'Először quadoztam, de az instrukciók egyértelműek voltak, és a csapat nagyon barátságos volt. Köszönjük a remek kalandot!',
      name: 'Nagy Viktória',
      date: '2025/02/15',
    },
    {
      title: 'Értékelés',
      text: 'Fantasztikus élmény volt! A szervezés profi, a túravezető nagyon segítőkész és türelmes volt. Minden percét élveztük!',
      name: 'Kovács Gábor',
      date: '2025/02/11',
    },
    {
      title: 'Értékelés',
      text: 'Igazi off-road élmény, változatos tereppel és gyönyörű tájakkal. A felszerelés kifogástalan, biztosan visszatérünk!',
      name: 'Tóth Péter',
      date: '2025/02/2',
    },
    {
      title: 'Értékelés',
      text: 'Nem gondoltam volna, hogy ennyire élvezni fogom a quadozást! A túravezetők profik, az útvonal változatos, és minden szükséges felszerelést biztosítottak. Biztosan visszatérünk!',
      name: 'Kiss Bence',
      date: '2025/01/26',
    },
    {
      title: 'Értékelés',
      text: 'Először próbáltam ki a quadozást, és nagyon tetszett, hogy a csapat figyelembe vette a tudásszintünket. Minden instrukció világos volt. Csak ajánlani tudom!',
      name: 'Halász Tímea',
      date: '2025/01/26',
    },
    {
      title: 'Értékelés',
      text: 'A kollégákkal szerveztünk egy csapatépítőt, és ennél jobb programot el sem tudtunk volna képzelni. Köszönjük az élményt!',
      name: 'Simon Gábor',
      date: '2024/12/10',
    },
  ]

  return (
    <section className="testimonials-section padding-y-4xl">
      <div className="container flex-col">
        <div>
          <h1>Vendégeink véleménye</h1>
          <h4>
            Ismerd meg, mit mondanak rólunk azok, akik már átéltek egy
            felejthetetlen quad túrát!
          </h4>
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
        Te is részt vettél egy túránkon?<br></br> Oszd meg velünk véleményedet!
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
