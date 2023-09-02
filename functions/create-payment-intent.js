//domain/.netlify/functions/create-payment-intent

const { calculateNewValue } = require('@testing-library/user-event/dist/utils')

require('dotenv').config()

const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY)

exports.handler = async function (event, context) {
  if (event.body) {
    const { cart, shipping_fee, total, total_amount } = JSON.parse(event.body)

    const calculateOrderAmount = () => {
      return shipping_fee + total_amount
    }

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: 'usd'
      })
      //return from  create paymentIntent, sending  this  back  to  stripe Checkout
      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret })
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ msg: error.message })
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ cart })
    }
  }
  //else return this(payment Intent), Not For Production
  return {
    statusCode: 200,
    body: 'Create Payment Intent'
  }
}
