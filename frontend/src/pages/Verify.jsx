import React, { useContext, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Verify = () => {


    const [searchParams, setSearchParams] = useSearchParams()

    const {token, navigate, setCartItems, backendUrl} = useContext(ShopContext)


    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")


    const verifyPayment = async () => {

        try {
            if(!token){
                return null
            }

            const response = await axios.post(backendUrl + "/api/order/verify", {success, orderId}, {headers: {token}})
            if(response.data.success){
                setCartItems({})
                navigate("/orders")
            }else{
                navigate("/cart")
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message)
            
        }

    }

    useEffect(() => {
       verifyPayment()
    }, [token])

  return (
    <div>
      verified
    </div>
  )
}

export default Verify
