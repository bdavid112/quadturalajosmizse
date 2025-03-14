import './cta-section.scss'

import * as React from 'react'

import ButtonPrimary from '@components/ui/buttons/ButtonPrimary'
import ButtonSecondaryOutline from '@components/ui/buttons/ButtonSecondaryOutline'
import { formatTextWithBreaks } from '@utils/formatText'

interface Props {
  title: string
  subtext: string
  buttonLabels: { primary: string; secondary: string }
}

const CTASection: React.FunctionComponent<Props> = ({
  title,
  subtext,
  buttonLabels,
}) => {
  return (
    <section className="cta-section">
      <div className="cta-background relative">
        <div className="container cta-content">
          <div className="width-full">
            <h2 className="text-center margin-bottom-2xl text-inverted">
              {title}
            </h2>
            <h4 className="text-center margin-bottom-4xl text-inverted">
              {formatTextWithBreaks(subtext)}
            </h4>
            <div className="cta-button-group">
              <ButtonPrimary label={buttonLabels.primary}></ButtonPrimary>
              <ButtonSecondaryOutline
                text={buttonLabels.secondary}
              ></ButtonSecondaryOutline>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default CTASection
