import './tours-section.scss'

import overviewImg1 from '../../assets/tour-overview-1.avif'
import overviewImg2 from '../../assets/tour-overview-2.avif'

import TourOverview from '../TourOverview'
import * as React from 'react'

interface Props {}

const ToursSection: React.FunctionComponent<Props> = ({}) => {
  const overviews = [
    {
      title: '40 km-es túra – Pusztavacs,\nMagyarország földrajzi középpontja',
      description:
        'Ez a rövidebb útvonal ideális választás, ha először próbálnád ki a quad túrázást vagy kevesebb időd van, de mégis egy felejthetetlen élményre vágysz.',
      attributes: [
        {
          strong: 'Útvonal:',
          regular: ' Lajosmizse – Táborfalva – Örkény – Pusztavacs  – vissza',
        },
        {
          strong: '80% földút',
          regular: '',
        },
        {
          strong: 'Időtartam:',
          regular: ' ~ 1,5 óra',
        },
        {
          strong: 'Ár:',
          regular: ' 25 000 Ft / quad + 5 000 Ft / utas',
        },
      ],
      img: overviewImg1,
    },
    {
      title: '80 km-es túra – A lőtéren át a földrajzi középpontig',
      description:
        'Tapasztaltabb túrázóknak ajánljuk, akik egy hosszabb, változatos terepviszonyokkal tarkított útvonalat szeretnének bejárni.',
      attributes: [
        {
          strong: 'Útvonal:',
          regular:
            ' Lajosmizse – Táborfalva – Tatárszentgyörgy – Dabas – Újhartyán – Pusztavacs – vissza',
        },
        {
          strong: '70% földút',
          regular: '',
        },
        {
          strong: 'Időtartam:',
          regular: ' ~ 2,5 óra',
        },
        {
          strong: 'Ár:',
          regular: ' 35 000 Ft / quad + 7 000 Ft / utas',
        },
      ],
      img: overviewImg2,
    },
  ]

  /* const { lang, setLang } = useLocalization() */

  return (
    <section className="tours-section">
      <div className="container flex-col padding-y-4xl flex-gap-xl">
        <div className="margin-bottom-2xl">
          <h1>Válassz két izgalmas quad túra közül!</h1>
          <p>
            Fedezd fel a természet szépségeit és élvezd a szabadságot
            quadjainkkal!<br></br> Két különböző túrát kínálunk, így mindenki
            megtalálhatja a számára megfelelő kihívást.
          </p>
        </div>
        {overviews.map((overview, index) => (
          <TourOverview
            key={index}
            title={overview.title}
            description={overview.description}
            attributes={overview.attributes}
            img={overview.img}
          ></TourOverview>
        ))}
      </div>
    </section>
  )
}
export default ToursSection
