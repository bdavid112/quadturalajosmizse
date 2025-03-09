import '/src/styles/utilities.scss'
import './booking-form.scss'

import * as React from 'react'
import { useId, useState } from 'react'
import { useLocalization } from '../../../context/LocalizationContext'
import { t } from '../../../utils/translator'
import TextInputOutline from '../form-elements/TextInputOutline'
import DatePickerOutline from '../form-elements/DatePickerOutline'
import DropdownOutline from '../form-elements/DropdownOutline'
import NumberInputOutline from '../form-elements/NumberInputOutline'
import TextAreaOutline from '../form-elements/TextAreaOutline'
import ButtonPrimary from '../buttons/ButtonPrimary'

interface Props {}

const BookingForm: React.FunctionComponent<Props> = ({}) => {
  const { lang } = useLocalization()

  /* Generate IDs for inputs */

  const idName = useId()
  const idEmail = useId()
  const idPhone = useId()
  const idDate = useId()
  const idTour = useId()
  const idQuad = useId()
  const idPassenger = useId()
  const idComment = useId()

  return (
    <div className="width-full box-shadow-medium border-rounded-md padding-x-4xl padding-y-2xl form-container">
      <h3 className="text-center">{t(`ui.forms.booking-form.title`, lang)}</h3>
      <div className="form-body">
        <fieldset className="form-group flex flex-col flex-gap-sm">
          <legend>Kapcsolattartási adatok</legend>
          <TextInputOutline
            id={idName}
            name="name"
            label={t(`ui.forms.booking-form.inputs.name.label`, lang)}
            helperText={t(
              `ui.forms.booking-form.inputs.name.helper-text`,
              lang
            )}
          ></TextInputOutline>
          <div className="flex flex-gap-sm subgroup">
            <div className="width-half">
              <TextInputOutline
                id={idEmail}
                name="email"
                label={t(`ui.forms.booking-form.inputs.email.label`, lang)}
                helperText={t(
                  `ui.forms.booking-form.inputs.email.helper-text`,
                  lang
                )}
              ></TextInputOutline>
            </div>
            <div className="width-half">
              <TextInputOutline
                id={idPhone}
                name="phone"
                label={t(`ui.forms.booking-form.inputs.phone.label`, lang)}
                helperText={t(
                  `ui.forms.booking-form.inputs.phone.helper-text`,
                  lang
                )}
              ></TextInputOutline>
            </div>
          </div>
        </fieldset>
        <fieldset className="form-group flex flex-gap-sm">
          <legend>Túra részletek</legend>
          <div className="width-half inline-block">
            <DatePickerOutline
              id={idDate}
              name="date"
              label={t(`ui.forms.booking-form.inputs.date.label`, lang)}
              helperText={t(
                `ui.forms.booking-form.inputs.date.helper-text`,
                lang
              )}
            ></DatePickerOutline>
          </div>
          <div className="width-half inline-block">
            <DropdownOutline
              id={idTour}
              name="tour"
              label={t(`ui.forms.booking-form.inputs.tour.label`, lang)}
              helperText={t(
                `ui.forms.booking-form.inputs.tour.helper-text`,
                lang
              )}
              options={[
                { label: '40km-es túra', value: 0 },
                { label: '80km-es túra', value: 1 },
              ]}
            ></DropdownOutline>
          </div>
        </fieldset>
        <fieldset className="form-group flex flex-gap-sm">
          <legend>Quadok és utasok száma</legend>
          <div className="width-half inline-block">
            <NumberInputOutline
              id={idQuad}
              name="quad"
              label={t(`ui.forms.booking-form.inputs.quad.label`, lang)}
              min={2}
              max={4}
              helperText={t(
                `ui.forms.booking-form.inputs.quad.helper-text`,
                lang
              )}
            ></NumberInputOutline>
          </div>
          <div className="width-half inline-block">
            <NumberInputOutline
              id={idPassenger}
              name="passenger"
              label={t(`ui.forms.booking-form.inputs.passenger.label`, lang)}
              min={2}
              max={4}
              helperText={t(
                `ui.forms.booking-form.inputs.passenger.helper-text`,
                lang
              )}
            ></NumberInputOutline>
          </div>
        </fieldset>
        <fieldset className="form-group">
          <legend>Egyéb megjegyzés</legend>
          <TextAreaOutline
            id={idComment}
            name="comment"
            label={t(`ui.forms.booking-form.inputs.comment.label`, lang)}
            helperText={t(
              `ui.forms.booking-form.inputs.comment.helper-text`,
              lang
            )}
          ></TextAreaOutline>
        </fieldset>
      </div>
      <div className="flex justify-center width-full">
        <ButtonPrimary
          fullWidth={true}
          label={t('ui.forms.booking-form.button-label')}
        ></ButtonPrimary>
      </div>
    </div>
  )
}
export default BookingForm
