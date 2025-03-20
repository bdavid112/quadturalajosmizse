import { useState } from 'react'
import { t } from '@utils/translator'
/* import axios from 'axios' */

export function useBookingForm(lang: string) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    tour: '',
    atvs: '2',
    passengers: '0',
    comment: '',
  })

  const [errors, setErrors] = useState<{
    name?: string
    email?: string
    phone?: string
    date?: string
    tour?: string
    atvs?: string
    passengers?: string
    comment?: string
  }>({})

  const [loading, setLoading] = useState(false)
  const [isModelOpen, setIsModalOpen] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  /* ✅ Field Validation */
  const validateField = (name: string, value: string) => {
    if (name == 'comment') return ''

    if (!value) {
      return t(`ui.forms.booking-form.inputs.${name}.errors.required`, lang)
    }

    let error = ''

    if (name === 'email' && !/^\S+@\S+\.\S+$/.test(value)) {
      error = t(
        `ui.forms.booking-form.inputs.${name}.errors.wrong-format`,
        lang
      )
    }

    if (
      name === 'phone' &&
      !/^\+?\d{1,3}?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
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

  /* ✅ Update Field */
  const updateField = (name: string, value: string) => {
    /* Update form state */
    setFormData((prev) => ({ ...prev, [name]: value }))
    /* Validate & set error state */
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
  }

  /* ✅ Form Submission */
  const submitForm = async () => {
    setLoading(true)
    setServerError(null)

    /* Validate all fields */
    let hasErrors = false
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value)
      if (error !== '') hasErrors = true
      setErrors((prev) => ({ ...prev, [key]: error }))
    })

    /* Stop submission if there are errors */
    if (hasErrors) {
      setLoading(false)
      return
    }

    setIsModalOpen(true)
  }

  return {
    formData,
    errors,
    loading,
    serverError,
    isModelOpen,
    setIsModalOpen,
    updateField,
    submitForm,
  }
}
