import tour40 from '@assets/tour-40km.avif'
import tour80 from '@assets/tour-80km.avif'

import TourDetails from '@components/TourDetails'
import { useLocalization } from '@context/LocalizationContext'
import { t } from '@utils/translator'

import * as React from 'react'

interface Props {
  onButtonClick?: () => void
}

const TourDetailsSection: React.FunctionComponent<Props> = ({
  onButtonClick,
}) => {
  const { lang } = useLocalization()

  const images = [
    { url: tour40, alt: '40 km tour roadmap' },
    { url: tour80, alt: '80 km tour roadmap' },
  ]
  const tours: { desc: string; attribs: string[]; prices: string[] }[] = t(
    'tours.tour-details.tours',
    lang
  )

  return (
    <section className="tour-details-section">
      <div className="container flex-col">
        {tours.map((tour, index) => (
          <TourDetails
            key={index}
            description={tour.desc}
            attributes={tour.attribs}
            img={images[index]}
            prices={tour.prices}
            onButtonClick={onButtonClick}
          ></TourDetails>
        ))}
      </div>
    </section>
  )
}
export default TourDetailsSection
