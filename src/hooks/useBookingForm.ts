import { useState } from 'react'

export function useBookingForm() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' })
  const [errors, setErrors] = useState<{
    name?: string
    email?: string
    phone?: string
  }>({})

  const validateField = (name: string, value: string) => {
    let error = ''

    if (name == 'name') {
      if (!value) error = 'Name is required'
    }

    if (name == 'email') {
      if (!value) error = 'Email is required'
      else if (!/^\S+@\S+\.\S+$/.test(value)) error = 'Invalid email format'
    }

    if (name == 'phone') {
      if (!value) error = 'Phone number is required'
      else if (
        !/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/.test(
          value
        )
      )
        error = 'Invalid phone number format'
    }

    return error
  }

  const updateField = (name: string, value: string) => {
    /* Update form state */
    setFormData((prev) => ({ ...prev, [name]: value }))

    /* Validate & set error state */
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
  }

  return { formData, errors, updateField }
}
