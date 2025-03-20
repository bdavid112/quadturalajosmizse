import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useState } from 'react'
import ButtonPrimary from '../buttons/ButtonPrimary'
import axios from 'axios'

interface Props {
  amount: number
  bookingDetails: {
    name: string
    email: string
    phone: string
    date: string
    tour: string
    atvs: string
    passengers?: string
    comment: string
  }
}

const PaymentForm: React.FC<Props> = ({ amount, bookingDetails }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!stripe || !elements) return

    setLoading(true)

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: 'https://your-site.com/payment-success' },
      redirect: 'if_required',
    })

    if (error) {
      setMessage(error.message || 'Payment failed.')
    } else if (paymentIntent?.status === 'succeeded') {
      // ✅ Payment successful → Send booking data to API
      try {
        await axios.post('/api/bookings', bookingDetails)
        setMessage('Payment & booking successful! 🎉')
      } catch (err) {
        setMessage('Payment successful, but booking failed! ❌')
        console.error('Booking error:', err)
      }
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2 className="margin-bottom-lg">Checkout</h2>
      <p>
        Amount to Pay: <strong className="text-primary">{amount} HUF</strong>
      </p>
      <PaymentElement />
      <ButtonPrimary
        label={loading ? 'Processing...' : 'Pay Now'}
        type="submit"
        isDisabled={!stripe || loading}
        fullWidth={true}
        className="margin-top-lg"
      ></ButtonPrimary>
      {message && (
        <p
          className={`margin-top-sm ${message.includes('failed') ? 'text-error' : 'text-success'}`}
        >
          {message}
        </p>
      )}
    </form>
  )
}
export default PaymentForm
