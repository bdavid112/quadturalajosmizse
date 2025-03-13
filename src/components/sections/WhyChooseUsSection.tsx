import './why-choose-us-section.scss'

import heroBackground from '../../assets/why-choose-us-header-background.avif'
import profile1 from '../../assets/profile1.jpg'
import profile2 from '../../assets/profile2.jpg'
import profile3 from '../../assets/profile3.webp'

import * as React from 'react'
import ImageHeader from '../ImageHeader'
import ProfileBioShort from '../ProfileBioShort'

interface Props {}

const WhyChooseUsSection: React.FunctionComponent<Props> = ({}) => {
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
    </section>
  )
}
export default WhyChooseUsSection
