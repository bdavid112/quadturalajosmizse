import './booking-form.scss'

import * as React from 'react'
import { useLocalization } from '@context/LocalizationContext'
import { t } from '@utils/translator'
import TextInputOutline from '../form-elements/TextInputOutline'
import DatePickerOutline from '../form-elements/DatePickerOutline'
import DropdownOutline from '../form-elements/DropdownOutline'
import NumberInputOutline from '../form-elements/NumberInputOutline'
import TextAreaOutline from '../form-elements/TextAreaOutline'
import ButtonPrimary from '../buttons/ButtonPrimary'
import { useBookingForm } from '@hooks/useBookingForm'
import Modal from '../Modal'
import Checkout from './Checkout'
import { useEffect, useState } from 'react'
import axios from 'axios'

interface Props {}

const BookingForm: React.FunctionComponent<Props> = ({}) => {
  const [tourOptions, setTourOptions] = useState<
    {
      label: string
      value: string
    }[]
  >([])

  const { lang } = useLocalization()

  useEffect(() => {
    axios
      .get('/api/tours')
      .then((res) => {
        const options = res.data.map((tour: any) => ({
          label: tour.name[lang],
          value: tour._id,
        }))
        setTourOptions(options)
      })
      .catch((err) => {
        console.error('Error fetching tours:', err)
      })
  }, [lang])

  const {
    formKey,
    formData,
    errors,
    isModelOpen,
    setIsModalOpen,
    setSuccess,
    updateField,
    submitForm,
  } = useBookingForm(lang)

  return (
    <>
      <form
        key={formKey}
        onSubmit={(e) => {
          e.preventDefault()
        }}
        className="width-full booking-form box-shadow-medium border-rounded-md padding-x-2xl padding-y-2xl form-container"
      >
        <h3 className="text-center">
          {t(`ui.forms.booking-form.title`, lang)}
        </h3>
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
            <legend>
              {t(`ui.forms.booking-form.group-titles.tour`, lang)}
            </legend>
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
                minYear={new Date().getFullYear()}
                maxYear={new Date().getFullYear() + 1}
              ></DatePickerOutline>
            </div>
            <div className="width-half inline-block">
              <DropdownOutline
                id="tourId"
                name="tourId"
                label={t(`ui.forms.booking-form.inputs.tourId.label`, lang)}
                errorMessage={errors.tourId}
                helperText={t(
                  `ui.forms.booking-form.inputs.tourId.helper-text`,
                  lang
                )}
                options={tourOptions}
                handleOnChange={updateField}
              ></DropdownOutline>
            </div>
          </fieldset>
          <fieldset className="form-group flex flex-gap-sm">
            <legend>
              {t(`ui.forms.booking-form.group-titles.quad`, lang)}
            </legend>
            <div className="width-half inline-block">
              <NumberInputOutline
                id="atvs"
                name="atvs"
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
                id="passengers"
                name="passengers"
                label={t(`ui.forms.booking-form.inputs.passenger.label`, lang)}
                min={0}
                max={Number(formData.atvs)}
                helperText={t(
                  `ui.forms.booking-form.inputs.passenger.helper-text`,
                  lang
                )}
                onChange={updateField}
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
              maxLength={200}
            ></TextAreaOutline>
          </fieldset>
        </div>
        <div className="flex justify-center width-full">
          <ButtonPrimary
            fullWidth={false}
            label={t('ui.forms.booking-form.button-label', lang)}
            onClick={() => submitForm()}
          ></ButtonPrimary>
        </div>
      </form>
      <Modal
        isOpen={isModelOpen}
        onClose={() => {
          setIsModalOpen(false)
        }}
      >
        {isModelOpen && (
          <Checkout
            bookingDetails={formData}
            onSuccess={() => {
              setIsModalOpen(false)
              setSuccess(true)
            }}
          ></Checkout>
        )}
      </Modal>
    </>
  )
}
export default BookingForm
