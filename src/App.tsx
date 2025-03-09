import './styles/global.scss'
import './styles/layout.scss'

import HeroLayout from './layouts/HeroLayout'
import {
  LocalizationProvider,
  useLocalization,
} from './context/LocalizationContext'
import BookingForm from './components/ui/forms/BookingForm'

function TestLocalization() {
  /* const { lang, setLang } = useLocalization() */

  return (
    <>
      <HeroLayout page="about-us" section="hero" divider={true}></HeroLayout>
      <section className="grid padding-y-5xl">
        <div className="row">
          <div className="col-6">
            <BookingForm></BookingForm>
          </div>
        </div>
      </section>
    </>
  )
}

function App() {
  return (
    <LocalizationProvider>
      <div /* style={{ height: '200vh' }} */>
        <TestLocalization></TestLocalization>
      </div>
    </LocalizationProvider>
  )
}

export default App
