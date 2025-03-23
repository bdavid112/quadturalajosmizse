import './review-form.scss'

import * as React from 'react'
import { useLocalization } from '@context/LocalizationContext'
import TextInputOutline from '../form-elements/TextInputOutline'
import TextAreaOutline from '../form-elements/TextAreaOutline'
import ButtonPrimary from '../buttons/ButtonPrimary'
import { t } from '@utils/translator'
import Icon from '../IconComponent'
import { useReviewForm } from '@hooks/useReviewForm'
import { ReactElement, useEffect, useState } from 'react'

interface Props {}

const ReviewForm: React.FunctionComponent<Props> = ({}) => {
  const [stars, setStars] = useState<ReactElement[]>([])

  const { lang } = useLocalization()

  const { formKey, formData, errors, updateField, submitForm } =
    useReviewForm(lang)

  useEffect(() => {
    const newStars = []
    for (let i = 0; i < 5; i++) {
      newStars.push(
        <button
          className="border-none background-transparent height-content cursor-pointer"
          onClick={(e) => {
            e.preventDefault()
            updateField('rating', (i + 1).toString())
          }}
        >
          {i <= parseInt(formData.rating) - 1 ? (
            <Icon name="star_fill" className="warning size-40" />
          ) : (
            <Icon name="star" className="warning size-40" />
          )}
        </button>
      )
    }
    setStars(newStars)
  }, [formData.rating])

  return (
    <form
      key={formKey}
      onSubmit={(e) => {
        e.preventDefault()
        submitForm()
      }}
      className="width-full review-form box-shadow-medium border-rounded-md padding-x-4xl padding-y-2xl form-container"
    >
      <h3 className="text-center">{t('ui.forms.review-form.title', lang)}</h3>
      <div className="form-body flex flex-col flex-gap-sm">
        <TextInputOutline
          id={'reviewName'}
          name="name"
          label={t('ui.forms.review-form.inputs.name.label', lang)}
          helperText={t('ui.forms.review-form.inputs.name.helper-text', lang)}
          handleOnChange={updateField}
          errorMessage={errors.name}
        ></TextInputOutline>
        <TextAreaOutline
          id={'comment'}
          name={'comment'}
          label={t('ui.forms.review-form.inputs.comment.label', lang)}
          helperText={t(
            'ui.forms.review-form.inputs.comment.helper-text',
            lang
          )}
          onChange={updateField}
          errorMessage={errors.comment}
        ></TextAreaOutline>
        <div className="flex width-full justify-center">
          {stars.map((star) => star)}
        </div>
      </div>
      <div className="flex justify-center">
        <ButtonPrimary
          type="submit"
          label={t('ui.forms.review-form.button-label', lang)}
        ></ButtonPrimary>
      </div>
    </form>
  )
}
export default ReviewForm
