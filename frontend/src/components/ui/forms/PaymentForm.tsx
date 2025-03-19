import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { FormEvent, useState } from 'react'

export default function PaymentForm() {
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!stripe || !elements) return

    setIsLoading(true)
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: 'https://your-site.com/payment-success' },
    })

    if (error) console.error(error)
    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={!stripe || isLoading}>Pay</button>
    </form>
  )
}
