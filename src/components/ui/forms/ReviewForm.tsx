import './review-form.scss'

import * as React from 'react'
import { useLocalization } from '../../../context/LocalizationContext'
import TextInputOutline from '../form-elements/TextInputOutline'
import TextAreaOutline from '../form-elements/TextAreaOutline'
import { useId } from 'react'
import ButtonPrimary from '../buttons/ButtonPrimary'

interface Props {}

const ReviewForm: React.FunctionComponent<Props> = ({}) => {
  const { lang } = useLocalization()

  const stars = []
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span className="material-symbols-rounded size-40 text-warning star margin-bottom-2xl">
        star
      </span>
    )
  }

  return (
    <div className="width-full review-form box-shadow-medium border-rounded-md padding-x-4xl padding-y-2xl form-container">
      <h3 className="text-center">Oszd meg velünk élményeid</h3>
      <div className="form-body flex flex-col flex-gap-sm">
        <TextInputOutline
          id={useId()}
          name={'name'}
          label={'Név'}
          helperText={'Add meg a teljes neved'}
        ></TextInputOutline>
        <TextAreaOutline
          id={useId()}
          name={'review'}
          label={'Vélemény'}
          helperText={'Írd le a véleményed'}
        ></TextAreaOutline>
        <div className="flex width-full justify-center">
          {stars.map((star) => star)}
        </div>
      </div>
      <div className="flex justify-center">
        <ButtonPrimary label={'Vélemény elküldése'}></ButtonPrimary>
      </div>
    </div>
  )
}
export default ReviewForm
