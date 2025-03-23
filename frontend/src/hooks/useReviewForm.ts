import { useEffect, useState } from 'react'
import { t } from '@utils/translator'
import toast from 'react-hot-toast'
import axios from 'axios'

export function useReviewForm(lang: string) {
  const [formData, setFormData] = useState({
    name: '',
    comment: '',
    rating: '',
  })

  const [errors, setErrors] = useState<{
    name?: string
    comment?: string
    rating?: string
  }>({})

  const [formKey, setFormKey] = useState(0)
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (success) {
      setFormKey((prev) => prev + 1)
      setFormData({
        name: '',
        comment: '',
        rating: '',
      })
      toast.success(
        'Sikeres hozzászólás! Véleményedet elmentettük rendszerünkbe.',
        {
          duration: 10000,
        }
      )
      setSuccess(false)
    }
  }, [success])

  /* ✅ Field Validation */
  const validateField = (name: string, value: string) => {
    if (!value) {
      return t(`ui.forms.booking-form.inputs.${name}.errors.required`, lang)
    }

    return ''
  }

  /* ✅ Update Field */
  const updateField = (name: string, value: string) => {
    /* Update form state */
    setFormData((prev) => ({ ...prev, [name]: value }))
    /* Validate & set error state */
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))

    console.log(formData)
    console.log(errors)
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

    try {
      await axios.post('/api/reviews', formData)
      setSuccess(true)
    } catch (error) {
      console.error('Error creating new review:', error)
    } finally {
      setLoading(false)
    }
  }

  return {
    formKey,
    formData,
    errors,
    loading,
    serverError,
    success,
    setSuccess,
    updateField,
    submitForm,
  }
}
