import '@styles/global.scss'

import { LocalizationProvider } from '@context/LocalizationContext'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import HomePage from '@pages/HomePage'
import AboutUsPage from '@pages/AboutUsPage'
import ToursPage from '@pages/ToursPage'
import ATVsPage from '@pages/ATVsPage'
import GalleryPage from '@pages/GalleryPage'
import FAQPage from '@pages/FAQPage'
import { useEffect } from 'react'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    })
  }, [pathname])

  return null
}

function App() {
  return (
    <LocalizationProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/about-us" element={<AboutUsPage />}></Route>
          <Route path="/tours" element={<ToursPage />}></Route>
          <Route path="/atvs" element={<ATVsPage />}></Route>
          <Route path="/gallery" element={<GalleryPage />}></Route>
          <Route path="/faq" element={<FAQPage />}></Route>
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  )
}

export default App
