import React, { useContext, useState } from 'react'
import Text from '../components/Text'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const PlaceOrder = () => {

    const {navigate, cartItems, setCartItems, token, backendUrl, delivery_fee, products, getCartAmount} = useContext(ShopContext)
    const [method, setMethod] = useState("cod")

    const [formData, setFormData] = useState({
        firstName: "",
        lastName:"",
        email : "",
        street : "",
        city : "",
        state : "",
        zipCode: "",
        country : "",
        phone: "" 

    })

    const handleChange = (e) => {
        const {name, value} = e.target

        setFormData(prev => ({...prev, [name]: value}))
    }

    const onSubmitHandler = async (e) => {

        e.preventDefault()

        try {
            let orderItems = []

            for (const items in cartItems){
                for (const item in cartItems[items]){
                    if(cartItems[items][item] > 0){
                        const itemInfo = structuredClone(products.find(product => product._id === items))
                         if(itemInfo){
                            itemInfo.size = item
                            itemInfo.quantity = cartItems[items][item]
                            orderItems.push(itemInfo)
                         }

                    }
                }
            }

            console.log(orderItems);

            let orderData = {
                address : formData,
                // email:formData.email,
                items : orderItems,
                amount : getCartAmount() + delivery_fee
            }

           let letPay = {
            address : formData,
            email:formData.email,
            items : orderItems,
            amount : getCartAmount() + delivery_fee
            }

            switch (method){
              case "cod" : 
              const response = await axios.post(backendUrl + '/api/order/place', orderData, {headers: {token}})
              if(response.data.success){
                toast.success('Order placed')
                setCartItems({})
                navigate("/orders")
              }else{
                toast.error(response.data.message)
               }

              break

              case "stripe" : {
                const responseStripe = await axios.post(backendUrl + "/api/order/stripe", orderData, {headers : {token}})
                if(responseStripe.data.success){
                  const {session_url} = responseStripe.data
                  // redirects user to stripe payment page
                  window.location.replace(session_url)
                }else{
                  toast.error(responseStripe.data.message)
                }
              }
              break

              case "paystack": {
                const responseStack = await axios.post(backendUrl + "/api/order/paystack", letPay, {
                  headers: { token }
                });
              
                if (responseStack.data.success) {
                  const { authorization_url } = responseStack.data;
                  window.location.replace(authorization_url); // redirect to Paystack payment page
                } else {
                  toast.error(responseStack.data.message);
                }
              }
              break;

              case 'flutterwave' : {
                const responseWave = await axios.post(backendUrl + "/api/order/flutterwave", letPay, {headers : {token}})

                if(responseWave.data.success){
                  const {authorization_url} = responseWave.data
                  window.location.replace(authorization_url)
                }else{
                  toast.error(responseWave.data.message)
                }
              }

              
              default : 
              break
            }

            
        } catch (error) {
            console.log(error.message);
            toast.error(response.data.message)
            
        }

    }

    const submit = () => {
      onSubmitHandler()
    }
 
    const pay = (method) => {
      setMethod(method)
      submit()
    } 



  return (
    <div className='w-full py-10'>
      
      <Text text1={'Delivery'} text2={'Information'}/>

      <form onSubmit={onSubmitHandler} className=' mt-10'>
     <div className='flex lg:gap-20 gap-20 flex-col lg:flex-row'>
      <div className='flex-[50%] space-y-4'>
     
      <div className='flex gap-5'>
      <input name='firstName' value={formData.firstName} onChange={handleChange} className='w-full outline-0 border rounded border-gray-300 pl-2 py-1' type="text" placeholder='First name' required/>
      <input name='lastName' value={formData.lastName} onChange={handleChange} className='w-full outline-0 border rounded border-gray-300 pl-2 py-1' type="text" placeholder='Last name' required/>
      </div>
      <input name='email' value={formData.email} onChange={handleChange} type="email" placeholder='Email address' className='w-full rounded outline-0 border border-gray-300 pl-2 py-1' required/>
      <input name='street' value={formData.street} onChange={handleChange} type="text" placeholder='Street' className='w-full outline-0 rounded border border-gray-300 pl-2 py-1' required/>
      <div className='flex gap-5'>
      <input name='city' value={formData.city} onChange={handleChange} className='w-full outline-0 border rounded border-gray-300 pl-2 py-1' type="text" placeholder='City' required/>
      <input name='state' value={formData.state} onChange={handleChange} className='w-full outline-0 border rounded border-gray-300 pl-2 py-1' type="text" placeholder='State' required/>
      </div>
      <div className='flex gap-5'>
      <input name='zipCode' value={formData.zipCode} onChange={handleChange} className='w-full outline-0 border rounded border-gray-300 pl-2 py-1' type="text" placeholder='Zip Code' required />
      <input name='country' value={formData.country} onChange={handleChange} className='w-full outline-0 border rounded border-gray-300 pl-2 py-1' type="text" placeholder='Country' required/>
      </div>
      <input name='phone' value={formData.phone} onChange={handleChange} className='w-full outline-0 border rounded border-gray-300 pl-2 py-1' type="tel" placeholder='Phone Number' required/>
      </div>



      <div className='w-full flex-[50%]'>
        <CartTotal />

        <div className='mt-10'>
        <Text text1={'Payment'} text2={'Method'}/>

        <div className='flex flex-wrap  gap-5 mt-5'>
           <button className='flex items-center lg:gap-5 gap-2 border border-gray-300 px-3 py-1' onClick={() => pay("cod")}>
            <p className={`${method === 'cod' ? "bg-green-500" : ""} h-3 rounded-full w-3 `}></p>
            <p className='text-gray-400 text-[14px]'>COD</p>
           </button>

           <button className='flex items-center lg:gap-5 gap-2 border border-gray-300 px-3 py-1' onClick={() => pay("stripe")}>
            <p className={`${method === 'stripe' ? "bg-green-500" : ""} h-3 rounded-full w-3  `}></p>
            {/* <p className='text-gray-400'>Cash on delivery</p> */}
            <img className='w-[40px]' src={assets.stripe_logo} alt="" />
           </button>

           <button type='submit'  className='flex items-center lg:gap-5 gap-2 border border-gray-300 px-3 py-1' onClick={() => pay('paystack')}>
            <p className={`${method === 'paystack' ? "bg-green-500" : ""} h-3 rounded-full w-3  `}></p>
            {/* <p className='text-gray-400'>Cash on delivery</p> */}
            <img className='w-[70px]' src={assets.paystack} alt="" />
            {/* <p>Paystack</p> */}
      
           </button>

           <button className='flex items-center lg:gap-5 gap-2 border border-gray-300 px-3 py-4' onClick={() => pay("flutterwave")}>
            <p className={`${method === 'flutterwave' ? "bg-green-500" : ""} h-3 rounded-full w-3  `}></p>
            {/* <p className='text-gray-400'>Cash on delivery</p> */}
            <img className='w-[70px]' src={assets.flw} alt="" />
            {/* <p>Flutterwave</p> */}
      
           </button>
           
        </div>
        </div>
        <div className='mt-5'>
        {/* <button type='submit' className='bg-black text-white px-6 py-2 uppercase text-sm mt-2'>Place Order</button> */}
     </div>
      </div>


</div>
      
      </form>
       
     
     
    </div>
  )
}

export default PlaceOrder
