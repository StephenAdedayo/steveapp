import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'

const VerifyWave = () => {

    const [searchParams] = useSearchParams()

    const {navigate, backendUrl, token, setCartItems} = useContext(ShopContext)

    const transaction_id = searchParams.get("transaction_id")
    const orderId = searchParams.get("orderId")

    const verifyWave = async () => {

        try {

            if(!token){
                return null
            }

            const response = await axios.post(backendUrl + "/api/order/verifyflutterwave", {transaction_id, orderId}, {headers : {token}})

        if(response.data.success){
            setCartItems({})
            toast.success("payment verified successfully")
            navigate("/orders")
        }else{
            toast.error("payment could not be verified")
            navigate("/cart")
        }

        } catch (error) {
            console.log(error.message);
            toast.error("payment could not be verified")
            navigate("/cart")
        }
    }

    useEffect(() => {
      verifyWave()
    }, [token])
 
  return (
    <div>
      flutterwave verified
    </div>
  )
}

export default VerifyWave
