import ButtonPrimary from '../ui/buttons/ButtonPrimary'
import ButtonSecondaryOutline from '../ui/buttons/ButtonSecondaryOutline'
import FAB from '../ui/buttons/FAB'
import './main-hero-section.scss'

import * as React from 'react'

interface Props {}

const MainHeroSection: React.FunctionComponent<Props> = ({}) => {
  /* const { lang, setLang } = useLocalization() */

  return (
    <section className="main-hero relative">
      <div className="grid">
        <div className="row">
          <h1 className="col-6 text-inverted main-hero-title">
            <strong>Quad túrák</strong> az ország földrajzi középpontjához
          </h1>
          <div className="col-6"></div>
        </div>
        <div className="row">
          <p className="col-6 text-inverted main-hero-subtext">
            Fedezd fel a lenyűgöző tájakat, tapasztald meg<br></br> az
            adrenalin-löketet és éld át a természet szabadságát<br></br> egy
            felejthetetlen quad túrán a barátokkal!
          </p>
          <div className="col-6"></div>
        </div>
        <div className="row">
          <div className="col-6 flex flex-gap-lg button-group">
            <ButtonPrimary label="Foglalj túraidőpontot online"></ButtonPrimary>
            <ButtonSecondaryOutline text="Részletek a túráinkról"></ButtonSecondaryOutline>
          </div>
          <div className="col-6"></div>
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
