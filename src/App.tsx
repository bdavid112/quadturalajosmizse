import '@styles/global.scss'

import { LocalizationProvider } from '@context/LocalizationContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from '@pages/HomePage'
import AboutUsPage from '@pages/AboutUsPage'

function App() {
  return (
    <LocalizationProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/about-us" element={<AboutUsPage></AboutUsPage>}></Route>
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  )
}

export default App
