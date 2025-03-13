import './styles/global.scss'

import { LocalizationProvider } from './context/LocalizationContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'

function App() {
  return (
    <LocalizationProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  )
}

export default App
