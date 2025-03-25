import * as React from 'react'

interface Props {
  title: string
  content: { heading: string; text: string[] }[]
}

const LegalText: React.FunctionComponent<Props> = ({ title, content }) => {
  return (
    <div className="padding-y-lg padding-x-xl">
      <h2 className="text-center margin-bottom-2xl">{title}</h2>
      <div className="flex flex-col flex-gap-lg">
        {content.map((c, index) => (
          <div key={index}>
            <h3>{c.heading}</h3>
            {c.text.map((t, i) => (
              <p key={i}>{t}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
export default LegalText
