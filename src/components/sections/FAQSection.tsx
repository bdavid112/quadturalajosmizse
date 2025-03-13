import image from '../../assets/contact-us.svg'
import './faq-section.scss'

import * as React from 'react'
import Accordion from '../ui/Accordion'

interface Props {}

const FAQSection: React.FunctionComponent<Props> = ({}) => {
  /* const { lang, setLang } = useLocalization() */

  const reviews = [
    {
      question: 'Hogyan történik a foglalás és fizetés?',
      answer:
        'A foglalás online vagy telefonon történik. A túra díját előre szükséges rendezni, de ha változtatni kell az időponton, rugalmasan kezeljük a módosításokat.',
    },
    {
      question: 'Szükséges jogosítvány a quad vezetéséhez?',
      answer:
        'Igen, a túrákon való részvételhez B kategóriás jogosítványra van szükség, mivel a quadok motorja és teljesítménye ezt megköveteli.',
    },
    {
      question: 'Hány éves kortól lehet részt venni a túrán?',
      answer:
        'A quad vezetéséhez minimum 18 éves életkor és érvényes jogosítvány szükséges. Utasként 160 cm feletti magasság ajánlott.',
    },
    {
      question: 'Hány főtől indulnak a túrák?',
      answer:
        'A túrák minimum 2 fővel indulnak, de nagyobb csoportokat is szívesen fogadunk. Foglaláskor érdemes előre jelezni a létszámot.',
    },
    {
      question: 'Van lehetőség utast vinni a quadon?',
      answer:
        'Igen, de fontos, hogy az utas maximális testsúlya és magassága ne befolyásolja a vezetési élményt és biztonságot. A kétszemélyes quadozás plusz díjat vonhat maga után.',
    },
  ]

  return (
    <section className="faq-section padding-y-4xl">
      <div className="container flex-col">
        <h1>Gyakran Ismételt Kérdések (GYIK)</h1>
        <div className="padding-y-xl flex flex-col flex-gap-md">
          {reviews.map((review, index) => (
            <Accordion
              key={index}
              label={review.question}
              text={review.answer}
            ></Accordion>
          ))}
        </div>
        <div className="flex justify-between faq-footer">
          <div>
            <h2 className="margin-y-xl">
              Nem találtad meg a választ a kérdésedre?
            </h2>
            <p className="margin-bottom-lg">
              Lépj velünk kapcsolatba az elérhetőségeinken, és szívesen
              segítünk!
            </p>
            <div className="flex align-center flex-gap-sm">
              <span className="material-symbols-rounded size-24 text-brand">
                mail
              </span>
              <span className="font-size-secondary font-bold">
                quadturalajosmizse@gmail.com
              </span>
            </div>
            <div className="flex align-center flex-gap-sm">
              <span className="material-symbols-rounded size-24 text-brand">
                phone
              </span>
              <span className="font-size-secondary font-bold">
                +36 70 668 8771
              </span>
            </div>
          </div>
          <img className="contact-us-image" src={image} alt="Contact-us" />
        </div>
      </div>
    </section>
  )
}
export default FAQSection
