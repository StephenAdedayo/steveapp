import React, { useContext, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const VerifyStack = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { token, navigate, setCartItems, backendUrl } = useContext(ShopContext)

  const reference = searchParams.get("reference")
  const orderId = searchParams.get("orderId") // you added this to callback_url

  const verifyPayment = async () => {
    try {
      if (!token) 
        return null;

      const response = await axios.post(backendUrl + '/api/order/verifystack', {reference, orderId},
        { headers: { token } }
      )

      if (response.data.success) {
        setCartItems({})
        toast.success("Payment verified successfully")
        navigate("/orders")
      } else {
        toast.error("Payment verification failed")
        navigate("/cart")
      }
    } catch (error) {
      console.log(error)
      toast.error("An error occurred during verification")
      navigate("/cart")
    }
  }

  useEffect(() => {
    verifyPayment()
  }, [token])

  return (
    <div>
      Verifying payment...
    </div>
  )
}

export default VerifyStack
