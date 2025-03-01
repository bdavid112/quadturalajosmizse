import * as React from 'react'
import '../styles/layout.scss'
import '../styles/utilities.scss'
import './hero-layout.scss'

interface Props {
  title: string
  subtitle: string
  body: string
}

const HeroLayout: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <div className="container padding-y-5xl">
      <div className="text-center">
        <h1 className="hero-text">{props.title}</h1>
        <div className="subtext-wrapper">
          <h3>{props.subtitle}</h3>
          <p>{props.body}</p>
        </div>
      </div>
    </div>
  )
}

export default HeroLayout
