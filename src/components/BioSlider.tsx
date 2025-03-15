import * as React from 'react'

import './bio-slider.scss'

import { formatTextWithParagraphs } from '@utils/formatText'
import { useEffect, useRef } from 'react'

interface Props {
  profiles: { name: string; role: string; bio: string }[]
  images: string[]
  selectedBioIndex: number
  onChange: (index: number) => void
}

const BioSlider: React.FunctionComponent<Props> = ({
  profiles,
  images,
  selectedBioIndex = 0,
  onChange,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null)
  const bioRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sliderRef.current || !bioRef.current) return
    sliderRef.current.scrollTo({
      left: selectedBioIndex * bioRef.current.clientWidth,
      behavior: 'smooth',
    })
  }, [selectedBioIndex])

  return (
    <div className="flex flex-col bio-slide-container">
      <div className="divider-gray thick"></div>
      <div
        ref={sliderRef}
        className="padding-y-4xl flex width-full bio-slider relative"
      >
        {profiles.map((profile, index) => (
          <div
            key={index}
            ref={bioRef}
            className={`flex width-full transition-bezier-smooth bio ${index == selectedBioIndex ? 'active' : ''}`}
          >
            <div className="width-quarter flex flex-col align-center flex-gap-sm">
              <img
                className="profile-image"
                src={images[index]}
                alt="Peter Hau"
              />
              <div className="flex flex-col text-center">
                <span>
                  <strong className="text-inverted">{profile.name},</strong>
                </span>
                <span className="font-size-secondary text-muted">
                  {profile.role.toLocaleLowerCase()}
                </span>
              </div>
            </div>
            <div className="width-three-quarter bio-text text-inverted flex flex-col flex-gap-2xl text-balance padding-x-2xl">
              {formatTextWithParagraphs(profile.bio)}
            </div>
          </div>
        ))}
      </div>
      <div className="divider-gray margin-bottom-md"></div>
      <div className="flex justify-center flex-gap-2xl bio-button-container">
        {profiles.map((profile, index) => (
          <div
            key={index}
            className="flex flex-col text-center cursor-pointer bio-button"
            onClick={() => {
              onChange && onChange(index)
            }}
          >
            <span
              className={`text-inverted ${index == selectedBioIndex ? 'font-bold' : 'font-size-secondary'}`}
            >
              {profile.name}
            </span>
            <span
              className={`${index == selectedBioIndex ? 'font-size-secondary' : 'font-size-caption'} text-muted`}
            >
              {profile.role.toLowerCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
export default BioSlider
