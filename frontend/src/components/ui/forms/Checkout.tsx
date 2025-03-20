import { useState, useEffect } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import PaymentForm from './PaymentForm'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!)

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

const Checkout: React.FC<Props> = ({ amount, bookingDetails }) => {
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
      <PaymentForm amount={amount} bookingDetails={bookingDetails} />
    </Elements>
  ) : (
    <p>Failed to load payment options.</p>
  )
}

export default Checkout
