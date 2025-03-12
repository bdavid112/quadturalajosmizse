import * as React from 'react'
import { ReactNode } from 'react'
import TopNavbar from '../components/ui/navigation/TopNavbar'
import Footer from '../components/ui/navigation/Footer'

interface Props {
  children: ReactNode
}

const MainLayout: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <div className="main-layout">
      <TopNavbar></TopNavbar>
      <main>{children}</main>
      <Footer></Footer>
    </div>
  )
}

export default MainLayout
