import './booking-section.scss'

import divider from '../../assets/grunge-divider.svg'

import * as React from 'react'
import BookingForm from '../ui/forms/BookingForm'
import { insertStrongTags } from '../../utils/formatText'

interface Props {}

const BookingSection: React.FunctionComponent<Props> = ({}) => {
  /* const { lang, setLang } = useLocalization() */

  const instructions = [
    '<strong>Válaszd ki a dátumot –</strong> A naptár automatikusan mutatja a szabad és foglalt időpontokat. A szürke napok már nem elérhetők.',
    '<strong>Válaszd ki a túratípust –</strong> Döntsd el, hogy melyik túrán szeretnél részt venni. Ha bizonytalan vagy, nézd meg a "Túrák" menüpontot.',
    '<strong>Add meg a quadok és utasok számát –</strong> Legalább 2 quadot kell bérelni, de maximum 4 foglalható egyszerre. Az utasok száma külön szabályozható.',
    '<strong>Adj meg egyéb információkat –</strong> Ha bármilyen speciális kérésed vagy megjegyzésed van, írd be az utolsó mezőbe.',
  ]

  const info = [
    'Foglalásod véglegesítéséhez a fizetés szükséges.',
    'Fizetés után a véglegesítésről pár percen belül egy visszaigazoló emailt küldünk a megadott címre.',
    'Amennyiben a lefoglalt időpontban nem tudsz/tudtok megjelenni, és ezt legalább egy héttel előtte nem jelzitek, a befizetett összeget nem áll módunkban visszatéríteni.',
    'Kérjük, érkezz időben a megadott helyszínre, hogy minden gördülékenyen menjen!',
  ]

  return (
    <section className="booking-section relative">
      <img
        className="rotate-180 grunge-divider"
        src={divider}
        alt="Divider top"
      />
      <div className="flex content-wrapper">
        <div className="container flex-col padding-y-xl">
          <h1 className="text-inverted margin-bottom-4xl">
            Foglalj időpontot most!
          </h1>
          <div className="flex booking-section-content flex-gap-4xl width-full">
            <div className="width-half">
              <BookingForm></BookingForm>
            </div>
            <div className="width-half">
              <div className="text-content-wrapper">
                <div className="text-content">
                  <h2 className="text-inverted margin-bottom-2xl">
                    Hogyan működik?
                  </h2>
                  <ul className="flex flex-col flex-gap-sm list margin-bottom-4xl">
                    {instructions.map((inst, index) => (
                      <li key={index} className="text-inverted">
                        {insertStrongTags(inst, 'text-inverted')}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-content">
                  <h3 className="text-inverted margin-bottom-2xl">
                    Egyéb foglalási tudnivalók:
                  </h3>
                  <ul className="flex flex-col flex-gap-sm list">
                    {info.map((i, index) => (
                      <li key={index} className="text-inverted">
                        {insertStrongTags(i, 'text-inverted')}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img className="grunge-divider" src={divider} alt="Divider bottom" />
    </section>
  )
}
export default BookingSection
