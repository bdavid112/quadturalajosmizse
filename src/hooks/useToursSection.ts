import overviewImg1 from '../assets/tour-overview-1.avif'
import overviewImg2 from '../assets/tour-overview-2.avif'

export const useToursSection = (lang: string) => {
  const overviews = [
    {
      title: '40 km-es túra – Pusztavacs,\nMagyarország földrajzi középpontja',
      description:
        'Ez a rövidebb útvonal ideális választás, ha először próbálnád ki a quad túrázást vagy kevesebb időd van, de mégis egy felejthetetlen élményre vágysz.',
      attributes: [
        '<strong>Útvonal:</strong> Lajosmizse – Táborfalva – Örkény – Pusztavacs  – vissza',
        '<strong>80% földút</strong>',
        '<strong>Időtartam:</strong> ~ 1,5 óra',
        '<strong>Ár:</strong> 25 000 Ft / quad + 5 000 Ft / utas',
      ],
      img: overviewImg1,
    },
    {
      title: '80 km-es túra – A lőtéren át a földrajzi középpontig',
      description:
        'Tapasztaltabb túrázóknak ajánljuk, akik egy hosszabb, változatos terepviszonyokkal tarkított útvonalat szeretnének bejárni.',
      attributes: [
        '<strong>Útvonal:</strong> Lajosmizse – Táborfalva – Tatárszentgyörgy – Dabas – Újhartyán – Pusztavacs – vissza',
        '<strong>70% földút</strong>',
        '<strong>Időtartam:</strong> ~ 2,5 óra',
        '<strong>Ár:</strong> 35 000 Ft / quad + 7 000 Ft / utas',
      ],
      img: overviewImg2,
    },
  ]

  const info = [
    '<strong>B kategóriás jogosítvány szükséges</strong> a quadozáshoz',
    '<strong>Bukósisak kötelező,</strong> saját sisak használható vagy bérelhető (1 000 Ft)',
    '<strong>Utas szállítása lehetséges</strong> (min. 160 cm testmagasság szükséges)',
    '<strong>Min. 2, max. 4 quad</strong> bérelhető túránként (+utasok)',
    '<strong>Időjárásfüggő program:</strong> extrém körülmények esetén időpontmódosítás lehetséges',
  ]

  return { overviews, info }
}
