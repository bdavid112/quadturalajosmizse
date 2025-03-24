import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useState } from 'react'
import ButtonPrimary from '../buttons/ButtonPrimary'
import axios from 'axios'

interface Props {
  amount: number
  bookingDetails: {
    name: string
    email: string
    date: string
    tourId: string
    atvs: string
    comment: string
    paidAt?: Date
    isPaid?: boolean
  }
  onSuccess?: () => void
}

const PaymentForm: React.FC<Props> = ({
  amount,
  bookingDetails,
  onSuccess,
}) => {
  const stripe = useStripe()
  const elements = useElements()

  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [countdown, setCountdown] = useState<number | null>(null)

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
        setSuccess(true)
        setCountdown(5)

        // Count down from 5 after payment success
        const interval = setInterval(() => {
          setCountdown((prev) => {
            if (prev === 1) {
              clearInterval(interval)
              onSuccess && onSuccess()
              return null
            }
            return prev! - 1
          })
        }, 1000)
      } catch (err) {
        setMessage('Payment successful, but booking failed! ❌')
        console.error('Booking error:', err)
      }
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
      {/* <h2 className="margin-bottom-lg">Checkout</h2> */}
      <p>
        Amount to Pay:{' '}
        <strong className="text-primary margin-bottom-md">{amount} HUF</strong>
      </p>
      <PaymentElement
        options={{
          defaultValues: {
            billingDetails: {
              email: bookingDetails.email || 'guest@example.com',
            },
          },
        }}
      />
      <ButtonPrimary
        label={
          loading ? 'Processing...' : success ? 'Payment success' : 'Pay Now'
        }
        type="submit"
        isDisabled={!stripe || loading || success}
        fullWidth={true}
        className="margin-top-lg"
      ></ButtonPrimary>
      {message && (
        <div className="flex width-full justify-between margin-top-lg">
          <p
            className={`${message.includes('failed') ? 'text-error' : 'text-success'}`}
          >
            {message}
          </p>
          <span>{countdown}...</span>
        </div>
      )}
    </form>
  )
}
export default PaymentForm
