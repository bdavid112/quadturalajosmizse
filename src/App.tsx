import './styles/global.scss'

import { LocalizationProvider } from './context/LocalizationContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import MainHeroSection from './components/sections/MainHeroSection'

function App() {
  return (
    <LocalizationProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout
                children={<MainHeroSection></MainHeroSection>}
              ></MainLayout>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  )
}

export default App
