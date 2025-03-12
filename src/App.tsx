import './styles/global.scss'

import HeroLayout from './layouts/HeroLayout'
import {
  LocalizationProvider,
  useLocalization,
} from './context/LocalizationContext'
import BookingForm from './components/ui/forms/BookingForm'
import TopNavbar from './components/ui/navigation/TopNavbar'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Footer from './components/ui/navigation/Footer'

function TestLocalization() {
  /* const { lang, setLang } = useLocalization() */

  return (
    <>
      <TopNavbar></TopNavbar>
      <HeroLayout page="about-us" divider={true}></HeroLayout>
      <section className="grid padding-y-5xl">
        <div className="row">
          <div className="col-6">
            <BookingForm></BookingForm>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </>
  )
}

function App() {
  return (
    <LocalizationProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<TestLocalization></TestLocalization>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  )
}

export default App
