import image1 from '@assets/profile1.jpg'

import * as React from 'react'

import { useLocalization } from '@context/LocalizationContext'
import { formatTextWithParagraphs } from '@utils/formatText'

interface Props {}

const BioSlider: React.FunctionComponent<Props> = ({}) => {
  const { lang } = useLocalization()

  const longText =
    '"Hau Péternek hívnak. Gyerekkorom óta szenvedélyem a motorsport, különösen a motocross és a quadok világa. Fiatalként rengeteg időt töltöttem Lajosmizse környékén, felfedezve a természetet és a legizgalmasabb terepeket két- és négykeréken egyaránt. Az elmúlt években Ausztriában dolgoztam hivatásos quad túravezetőként, ahol lehetőségem volt több száz túrát levezényelni és több ezer embernek megmutatni a terepjárás élményét.\n\nEzek az évek rengeteget tanítottak: hogyan biztosítsak biztonságos, mégis izgalmas túrákat, hogyan alkalmazkodjak különböző ügyfelek igényeihez, és miként tegyem minden egyes túrát egyedülálló élménnyé. Most pedig hazahoztam ezt a tudást, hogy Magyarország szívében, a gyönyörű Pusztavacs környékén hozzak létre egy olyan quad túra szolgáltatást, amely kezdőknek és tapasztalt vezetőknek egyaránt felejthetetlen kalandokat kínál.\n\nHa valaha is szeretted volna kipróbálni a quadozást, vagy csak egy különleges élményre vágysz, akkor a legjobb helyen jársz. A célom, hogy minden vendégem számára magabiztosságot és élvezetet nyújtsak a terepen – akár először ül quadon, akár már rutinos vezető. Várlak egy adrenalinban gazdag, felejthetetlen túrára!"'

  return (
    <>
      <div className="divider-gray thick"></div>
      <div className="padding-y-4xl flex">
        <div className="width-quarter flex flex-col align-center">
          <img className="profile-image" src={image1} alt="Peter Hau" />
          <div className="flex flex-col text-center">
            <span>
              <strong className="text-inverted">Hau Peter,</strong>
            </span>
            <span className="font-size-secondary text-muted">tulajdonos</span>
          </div>
        </div>
        <div className="width-three-quarter text-inverted flex flex-col flex-gap-2xl text-balance padding-x-2xl">
          {formatTextWithParagraphs(longText)}
        </div>
      </div>
      <div className="divider-gray margin-bottom-md"></div>
      <div className="flex justify-center">
        <div className="flex flex-col text-center">
          <span>
            <strong className="text-inverted">Hau Peter,</strong>
          </span>
          <span className="font-size-secondary text-muted">tulajdonos</span>
        </div>
      </div>
    </>
  )
}
export default BioSlider
