import './profile-bio-short.scss'

import * as React from 'react'

interface Props {
  name: string
  role: string
  bio: string
  img: string
}

const ProfileBioShort: React.FunctionComponent<Props> = ({
  name,
  role,
  bio,
  img,
}) => {
  return (
    <>
      <div className="profile-bio-short width-full flex flex-gap-2xl padding-y-2xl">
        <div className="flex flex-col align-center">
          <picture>
            <source srcSet={img} type="image/jpg"></source>
            <img
              src={`../assets/${img}.jpg`}
              alt="Tour overview"
              className="bio-short-image border-rounded-full"
              loading="eager"
              fetchPriority="high"
            ></img>
          </picture>
          <div className="flex flex-col text-center">
            <span>
              <strong className="text-primary">{name},</strong>
            </span>
            <span className="font-size-secondary text-secondary">{role}</span>
          </div>
        </div>
        <p className="bio-short-text">{bio}</p>
      </div>
      <div className="divider-gray"></div>
    </>
  )
}
export default ProfileBioShort
