import './booking-form.scss'

import * as React from 'react'
import { useLocalization } from '../../../context/LocalizationContext'
import { t } from '../../../utils/translator'
import TextInputOutline from '../form-elements/TextInputOutline'
import DatePickerOutline from '../form-elements/DatePickerOutline'
import DropdownOutline from '../form-elements/DropdownOutline'
import NumberInputOutline from '../form-elements/NumberInputOutline'
import TextAreaOutline from '../form-elements/TextAreaOutline'
import ButtonPrimary from '../buttons/ButtonPrimary'
import { useBookingForm } from '../../../hooks/useBookingForm'

interface Props {}

const BookingForm: React.FunctionComponent<Props> = ({}) => {
  const { lang } = useLocalization()
  const { formData, errors, updateField, submitForm } = useBookingForm(lang)

  return (
    <div className="width-full booking-form box-shadow-medium border-rounded-md padding-x-4xl padding-y-2xl form-container">
      <h3 className="text-center">{t(`ui.forms.booking-form.title`, lang)}</h3>
      <div className="form-body">
        <fieldset className="form-group flex flex-col flex-gap-sm">
          <legend>
            {t(`ui.forms.booking-form.group-titles.contact`, lang)}
          </legend>
          <TextInputOutline
            id="name"
            name="name"
            label={t(`ui.forms.booking-form.inputs.name.label`, lang)}
            errorMessage={errors.name}
            helperText={t(
              `ui.forms.booking-form.inputs.name.helper-text`,
              lang
            )}
            handleOnChange={updateField}
          ></TextInputOutline>
          <div className="flex flex-gap-sm subgroup">
            <div className="width-half">
              <TextInputOutline
                id="email"
                name="email"
                label={t(`ui.forms.booking-form.inputs.email.label`, lang)}
                errorMessage={errors.email}
                helperText={t(
                  `ui.forms.booking-form.inputs.email.helper-text`,
                  lang
                )}
                handleOnChange={updateField}
              ></TextInputOutline>
            </div>
            <div className="width-half">
              <TextInputOutline
                id="phone"
                name="phone"
                label={t(`ui.forms.booking-form.inputs.phone.label`, lang)}
                errorMessage={errors.phone}
                helperText={t(
                  `ui.forms.booking-form.inputs.phone.helper-text`,
                  lang
                )}
                handleOnChange={updateField}
              ></TextInputOutline>
            </div>
          </div>
        </fieldset>
        <fieldset className="form-group flex flex-gap-sm">
          <legend>{t(`ui.forms.booking-form.group-titles.tour`, lang)}</legend>
          <div className="width-half inline-block">
            <DatePickerOutline
              id="date"
              name="date"
              label={t(`ui.forms.booking-form.inputs.date.label`, lang)}
              errorMessage={errors.date}
              helperText={t(
                `ui.forms.booking-form.inputs.date.helper-text`,
                lang
              )}
              handleOnChange={updateField}
            ></DatePickerOutline>
          </div>
          <div className="width-half inline-block">
            <DropdownOutline
              id="tour"
              name="tour"
              label={t(`ui.forms.booking-form.inputs.tour.label`, lang)}
              errorMessage={errors.tour}
              helperText={t(
                `ui.forms.booking-form.inputs.tour.helper-text`,
                lang
              )}
              options={[
                { label: '40km-es túra', value: 0 },
                { label: '80km-es túra', value: 1 },
              ]}
              handleOnChange={updateField}
            ></DropdownOutline>
          </div>
        </fieldset>
        <fieldset className="form-group flex flex-gap-sm">
          <legend>{t(`ui.forms.booking-form.group-titles.quad`, lang)}</legend>
          <div className="width-half inline-block">
            <NumberInputOutline
              id="quad"
              name="quad"
              label={t(`ui.forms.booking-form.inputs.quad.label`, lang)}
              min={2}
              max={4}
              helperText={t(
                `ui.forms.booking-form.inputs.quad.helper-text`,
                lang
              )}
              onChange={updateField}
            ></NumberInputOutline>
          </div>
          <div className="width-half inline-block">
            <NumberInputOutline
              id="passenger"
              name="passenger"
              label={t(`ui.forms.booking-form.inputs.passenger.label`, lang)}
              min={0}
              max={Number(formData.quad)}
              helperText={t(
                `ui.forms.booking-form.inputs.passenger.helper-text`,
                lang
              )}
            ></NumberInputOutline>
          </div>
        </fieldset>
        <fieldset className="form-group">
          <legend>
            {t(`ui.forms.booking-form.group-titles.comment`, lang)}
          </legend>
          <TextAreaOutline
            id="comment"
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
          fullWidth={false}
          label={t('ui.forms.booking-form.button-label')}
          onClick={() => submitForm()}
        ></ButtonPrimary>
      </div>
    </div>
  )
}
export default BookingForm
