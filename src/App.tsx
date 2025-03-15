import '@styles/global.scss'

import { LocalizationProvider } from '@context/LocalizationContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from '@pages/HomePage'
import AboutUsPage from '@pages/AboutUsPage'
import ToursPage from '@pages/ToursPage'
import ATVsPage from '@pages/ATVsPage'
import GalleryPage from '@pages/GalleryPage'

function App() {
  return (
    <LocalizationProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/about-us" element={<AboutUsPage></AboutUsPage>}></Route>
          <Route path="/tours" element={<ToursPage></ToursPage>}></Route>
          <Route path="/atvs" element={<ATVsPage></ATVsPage>}></Route>
          <Route path="/gallery" element={<GalleryPage></GalleryPage>}></Route>
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  )
}

export default App
