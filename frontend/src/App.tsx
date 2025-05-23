import '@styles/global.scss'

import { LocalizationProvider } from '@context/LocalizationContext'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { lazy, useEffect } from 'react'
import HomePage from '@pages/HomePage'
import { Toaster } from 'react-hot-toast'

/* Lazy-load pages */
const AboutUsPage = lazy(() => import('@pages/AboutUsPage'))
const ToursPage = lazy(() => import('@pages/ToursPage'))
const ATVsPage = lazy(() => import('@pages/ATVsPage'))
const GalleryPage = lazy(() => import('@pages/GalleryPage'))
const FAQPage = lazy(() => import('@pages/FAQPage'))

/* Always scroll to top on navigation */
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
    <>
      <Toaster position="top-center" />
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
    </>
  )
}

export default App
