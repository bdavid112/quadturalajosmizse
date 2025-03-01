import { useState } from 'react'
import './styles/global.scss'
import './styles/grid.scss'

function App() {
  return (
    <>
      <div className="container">
        <div className="row">
          <h1 className="col-12 hero-text">Rólunk</h1>
        </div>
        <div className="row">
          <p className="col-12">
            Tapasztalat és szenvedély a vezetett túrákban – ismerj meg minket!
          </p>
        </div>
      </div>
    </>
  )
}

export default App
