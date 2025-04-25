import React, { useContext, useEffect, useState } from 'react'
import Text from '../components/Text'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'

const Orders = () => {


  const {backendUrl, currency, token} = useContext(ShopContext)


  const [orders, setOrders] = useState([])


  const loadOrders = async () => {
      try {

        !token ? null : ""

        const response = await axios.post(backendUrl + '/api/order/userOrder', {}, {headers :{token}})
        console.log(response.data);
        if(response.data.success){
          let allOrderItems = []

          response.data.userOrder.map((order) => {
            order.items.map(item => {
              item['status'] = order.status
              item['paymentMethod'] = order.paymentMethod
              item["payment"] = order.payment
              item["date"] = order.date
              allOrderItems.push(item)
            })
          })

          setOrders(allOrderItems.reverse())
        }
        
      } catch (error) {
        
      }
  }

  useEffect(() => {
     loadOrders()
  }, [token])

  return (
    <div>
      <Text text1={'my'} text2={'orders'}/>

      <div className='my-20'>
        {
          orders.map((item, index) => (
               <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
         <div className='flex items-start gap-6 text-sm'>
        <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
        <div className=''>
        <p className='text-base font-medium'>{item.name}</p>
        <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
       <p className='text-lg'>{currency}{item.price}</p>
       <p>Quantity : {item.quantity}</p>
       <p>Size : {item.size}</p>
        </div>
        <p className='mt-1'>Date : <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
        <p className='mt-2'>Payment : <span className='text-gray-400'>{item.paymentMethod}</span></p>

        </div>
         </div>
         <div className='md:w-1/2 flex justify-between'>
        <div className='flex items-center gap-2'>
         <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
         <p className='text-sm md:text-base'>{item.status}</p>
        </div>
        <button onClick={loadOrders} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
         </div>
               </div>
          ))
        }
       </div>
    </div>
  )
}

export default Orders
