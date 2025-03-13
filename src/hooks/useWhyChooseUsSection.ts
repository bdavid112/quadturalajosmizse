import profile1 from '../assets/profile1.jpg'
import profile2 from '../assets/profile2.jpg'
import profile3 from '../assets/profile3.webp'

export const useWhyChooseUsSection = (/* lang: string */) => {
  const profiles = [
    {
      name: 'Hau Péter',
      role: 'tulajdonos',
      bio: '"Több száz levezetett túra és több ezer elégedett vendég tapasztalatával a hátam mögött célom, hogy minden quadozni vágyónak felejthetetlen élményt nyújtsak – akár kezdőként, akár tapasztalt motorosként érkezel. Ismerd meg Magyarország földrajzi középpontjának lenyűgöző tájait egy professzionálisan vezetett túrán!"',
      img: profile1,
    },
    {
      name: 'Sós Krisztina',
      role: 'értékesítő',
      bio: '"Segítek abban, hogy megtaláld a számodra tökéletes quad túrát. Legyen szó első kalandról vagy visszatérő élményről, örömmel válaszolok minden kérdésedre, segítek a foglalásban, és gondoskodom róla, hogy a túrád gördülékeny és felejthetetlen legyen. Ha bármi kérdésed van, fordulj hozzám bizalommal!"',
      img: profile2,
    },
    {
      name: 'Orosz Mátyás',
      role: 'túravezető',
      bio: '"Mindig is szerettem a természetet, a terepjárást és a szabadság érzését, amit egy quad nyergében lehet igazán megélni. Több éve foglalkozom off-road túravezetéssel, és az a célom, hogy biztonságos, de kihívásokkal teli kalandokat nyújtsak minden résztvevőnek."',
      img: profile3,
    },
  ]

  const stats = [
    {
      icon: 'trophy',
      title: '3+ év tapasztalat',
      subtext: 'Több éves túravezetői tapasztalat',
    },
    {
      icon: 'map',
      title: '300+ túra',
      subtext: 'Több száz levezetett túra',
    },
    {
      icon: 'sentiment_satisfied',
      title: '1000+ vendég',
      subtext: 'Több ezer elégedett vendég',
    },
    {
      icon: 'sports_motorsports',
      title: 'Biztonság',
      subtext: 'Minden adott a biztonságos túrához',
    },
  ]

  return { profiles, stats }
}
