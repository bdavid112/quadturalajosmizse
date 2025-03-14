import { useState } from 'react'
import { t } from '@utils/translator'

export function useBookingForm(lang: string) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    tour: '',
    quad: '2',
    passenger: '0',
    comment: '',
  })
  const [errors, setErrors] = useState<{
    name?: string
    email?: string
    phone?: string
    date?: string
    tour?: string
    quad?: string
    passenger?: string
    comment?: string
  }>({})

  const validateField = (name: string, value: string) => {
    if (!value) {
      return t(`ui.forms.booking-form.inputs.${name}.errors.required`, lang)
    }

    let error = ''

    if (name == 'email' && !/^\S+@\S+\.\S+$/.test(value)) {
      error = t(
        `ui.forms.booking-form.inputs.${name}.errors.wrong-format`,
        lang
      )
    }

    if (
      name == 'phone' &&
      !/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/.test(
        value
      )
    ) {
      error = t(
        `ui.forms.booking-form.inputs.${name}.errors.wrong-format`,
        lang
      )
    }

    return error
  }

  const updateField = (name: string, value: string) => {
    /* Update form state */
    setFormData((prev) => ({ ...prev, [name]: value }))
    /* Validate & set error state */
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
  }

  const submitForm = () => {
    Object.entries(formData).forEach(([key, value]) => {
      setErrors((prev) => ({ ...prev, [key]: validateField(key, value) }))
    })
  }

  return { formData, errors, updateField, submitForm }
}
