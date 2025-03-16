import './review-form.scss'

import * as React from 'react'
import { useLocalization } from '@context/LocalizationContext'
import TextInputOutline from '../form-elements/TextInputOutline'
import TextAreaOutline from '../form-elements/TextAreaOutline'
import { useId } from 'react'
import ButtonPrimary from '../buttons/ButtonPrimary'
import { t } from '@utils/translator'
import Icon from '../IconComponent'

interface Props {}

const ReviewForm: React.FunctionComponent<Props> = ({}) => {
  const { lang } = useLocalization()

  const stars = []
  for (let i = 0; i < 5; i++) {
    stars.push(
      <Icon name="star" className="warning size-40 margin-bottom-2xl" />
    )
  }

  return (
    <form className="width-full review-form box-shadow-medium border-rounded-md padding-x-4xl padding-y-2xl form-container">
      <h3 className="text-center">{t('ui.forms.review-form.title', lang)}</h3>
      <div className="form-body flex flex-col flex-gap-sm">
        <TextInputOutline
          id={useId()}
          name="name"
          label={t('ui.forms.review-form.inputs.name.label', lang)}
          helperText={t('ui.forms.review-form.inputs.name.helper-text', lang)}
        ></TextInputOutline>
        <TextAreaOutline
          id={useId()}
          name={'review'}
          label={t('ui.forms.review-form.inputs.comment.label', lang)}
          helperText={t(
            'ui.forms.review-form.inputs.comment.helper-text',
            lang
          )}
        ></TextAreaOutline>
        <div className="flex width-full justify-center">
          {stars.map((star) => star)}
        </div>
      </div>
      <div className="flex justify-center">
        <ButtonPrimary
          label={t('ui.forms.review-form.button-label', lang)}
        ></ButtonPrimary>
      </div>
    </form>
  )
}
export default ReviewForm
