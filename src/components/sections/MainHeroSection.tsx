import './main-hero-section.scss'
import heroImageAvif from '../../assets/main-hero-background.avif'
import heroImageWebp from '../../assets/main-hero-background.webp'

import ButtonPrimary from '../ui/buttons/ButtonPrimary'
import ButtonSecondaryOutline from '../ui/buttons/ButtonSecondaryOutline'
import FAB from '../ui/buttons/FAB'
import * as React from 'react'

interface Props {}

const MainHeroSection: React.FunctionComponent<Props> = ({}) => {
  /* const { lang, setLang } = useLocalization() */

  return (
    <section className="main-hero relative">
      <picture>
        <source srcSet={heroImageAvif} type="image/avif"></source>
        <source srcSet={heroImageWebp} type="image/webp"></source>
        <img
          src="../../assets/main-hero-background.jpg"
          alt="Hero Background"
          className="hero-image"
          loading="eager"
          fetchPriority="high"
        ></img>
      </picture>
      <div className="container main-hero-content flex-col">
        <h1 className="text-inverted main-hero-title width-half">
          <strong>Quad túrák</strong> az ország földrajzi középpontjához
        </h1>
        <p className="text-inverted main-hero-subtext width-half">
          Fedezd fel a lenyűgöző tájakat, tapasztald meg az adrenalin-löketet és
          éld át a természet szabadságát egy felejthetetlen quad túrán a
          barátokkal!
        </p>
        <div className="flex flex-gap-lg button-group">
          <ButtonPrimary label="Foglalj túraidőpontot online"></ButtonPrimary>
          <ButtonSecondaryOutline text="Részletek a túráinkról"></ButtonSecondaryOutline>
        </div>
      </div>
      <FAB
        className="absolute main-hero-fab border-rounded-full"
        icon="arrow_downward"
      ></FAB>
    </section>
  )
}
export default MainHeroSection
