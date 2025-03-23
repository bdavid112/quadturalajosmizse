import { useState, useEffect } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import PaymentForm from './PaymentForm'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!)

interface Props {
  bookingDetails: {
    name: string
    email: string
    phone: string
    date: string
    tourId: string
    atvs: string
    passengers?: string
    comment: string
    paidAt?: Date
    isPaid?: boolean
  }
  onSuccess?: () => void
}

const Checkout: React.FC<Props> = ({ bookingDetails, onSuccess }) => {
  const [clientSecret, setClientSecret] = useState('')
  const [loading, setLoading] = useState(true)
  const [amount, setAmount] = useState(0)

  useEffect(() => {
    if (!bookingDetails.tourId) return

    axios
      .get(`/api/tours/${bookingDetails.tourId}`)
      .then((res) => {
        let totalPrice
        totalPrice = res.data.prices.atvPrice * Number(bookingDetails.atvs)
        totalPrice =
          totalPrice +
          res.data.prices.passengerPrice * Number(bookingDetails.passengers)
        setAmount(totalPrice)
        bookingDetails.paidAt = new Date()
        bookingDetails.isPaid = true
      })
      .catch((err) => {
        console.error('Error fetching tour:', err)
        setLoading(false)
      })
  }, [bookingDetails])

  useEffect(() => {
    if (amount > 0) {
      axios
        .post('/api/payment-intent', { amount: amount * 100, currency: 'huf' })
        .then((res) => {
          setClientSecret(res.data.clientSecret)
          setLoading(false)
        })
        .catch((err) => {
          console.error('Error fetching clientSecret:', err)
          setLoading(false)
        })
    }
  }, [amount])

  return loading ? (
    <p>Loading payment options...</p>
  ) : clientSecret ? (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <PaymentForm
        amount={amount}
        bookingDetails={bookingDetails}
        onSuccess={onSuccess}
      />
    </Elements>
  ) : (
    <p>Failed to load payment options.</p>
  )
}

export default Checkout
