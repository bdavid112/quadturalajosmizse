import { useState, useEffect } from 'react'
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import ButtonPrimary from '../buttons/ButtonPrimary'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!)

interface Props {
  amount: number
}

const Checkout: React.FC<Props> = ({ amount }) => {
  const [clientSecret, setClientSecret] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .post('/api/payment-intent', { amount: amount * 100, currency: 'usd' }) // Convert amount to cents
      .then((res) => {
        setClientSecret(res.data.clientSecret)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching clientSecret:', err)
        setLoading(false)
      })
  }, [amount])

  return loading ? (
    <p>Loading payment options...</p>
  ) : clientSecret ? (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <PaymentForm amount={amount} />
    </Elements>
  ) : (
    <p>Failed to load payment options.</p>
  )
}

const PaymentForm: React.FC<{ amount: number }> = ({ amount }) => {
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
      setMessage('Payment successful! 🎉')
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2 className="margin-bottom-lg">Checkout</h2>
      <p>
        Amount to Pay:{' '}
        <strong className="text-primary">${amount.toFixed(2)}</strong>
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
          style={{
            marginTop: '10px',
            color: message.includes('failed') ? 'red' : 'green',
          }}
        >
          {message}
        </p>
      )}
    </form>
  )
}

export default Checkout
