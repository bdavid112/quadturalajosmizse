import { t } from '../utils/translator'

import overviewImg1 from '../assets/tour-overview-1.avif'
import overviewImg2 from '../assets/tour-overview-2.avif'

export const useToursSection = (lang: string) => {
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

  const info = [
    { strong: 'B kategóriás jogosítvány szükséges', regular: ' a quadozáshoz' },
    {
      strong: 'Bukósisak kötelező,',
      regular: ' saját sisak használható vagy bérelhető (1 000 Ft)',
    },
    {
      strong: 'Utas szállítása lehetséges',
      regular: ' (min. 160 cm testmagasság szükséges)',
    },
    {
      strong: 'Min. 2, max. 4 quad',
      regular: ' bérelhető túránként (+utasok)',
    },
    {
      strong: 'Időjárásfüggő program:',
      regular: ' extrém körülmények esetén időpontmódosítás lehetséges',
    },
  ]

  return { overviews, info }
}
