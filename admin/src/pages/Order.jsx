import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {backendUrl} from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
// import {currency} from '../App'

const Order = ({token}) => {
   
  const [orders, setOrders] = useState([])

  const allOrders = async () => {

    if(!token){
      return null
    }

    try {

      const response = await axios.post(backendUrl + "/api/order/allOrders", {}, {headers : {token}})
      if(response.data.success){
        console.log(response.data);
        
        setOrders(response.data.orders)
        // console.log(response.data);
        
      }else{
        console.log(response.data.message);
        toast.error(response.data.message)
        
      }
    } catch (error) {
      console.log(error.message);
      toast.error(response.data.message)
      
    }

  }

  const statusHandler = async (e, orderId) => {

    try {
      const response = await axios.post(backendUrl + "/api/order/updateStatus", {orderId, status:e}, {headers:{token}})
      if(response.data.success){
        await allOrders()
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message)
      
    }

  }

  useEffect(() => {
     allOrders()
  }, [])

  return (
    <div>
      {orders.map((order, index) => (
         <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3  items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={index}>
                   <div>
          {
            order.items.map((item, index) => {
              // this means this item is the last item
          //  if(index === order.items.length - 1){
            // this will display just the first item on that order
          //  return 
          return (
            <div>
              <img className='w-[50px]' src={item.image[0]} alt="" />
            <p className='py-0.5' key={index}>{item.name} x {item.quantity} <span>{item.size}</span></p>
            {/* <p className='py-0.5' key={index}>{item.name} x {item.quantity} <span>{item.size},</span></p> */}
          </div>
                    )

          //  }
            })
          }
         </div>
         {/* <img className='w-12' src={assets.parcel_icon} alt="" /> */}
         <div>

         <p className='mt-3 mb-2 font-medium'>{order.address.firstName + " " + order.address.lastName}</p>
          <div>
            <p>{order.address.street + "," }</p>
            <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipCode }</p>
          </div>
          <p>{order.address.phone}</p>
      </div>

       <div>
        <p className='text-sm sm:text-[15px]'>Items : {order.items.length}</p>
        <p className='mt-3'>Method : {order.paymentMethod}</p>
        <p>Payment : { order.payment ? 'Done' : 'Pending' }</p>
        <p>Date : {new Date(order.date).toLocaleDateString()}</p>
       </div>

       <p className='text-sm sm:text-[15px]'>{order.amount}</p>
        <select onChange={(e) => statusHandler(e.target.value, order._id) } value={order.status} className='p-2 font-semibold'>
          <option value="Order Placed">Order Placed</option>
          <option value="Packing">Packing</option>
          <option value="Shipped">Shipped</option>
          <option value="Out for delivery">Out for delivery</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>
      ))}
    </div>
  )
}

export default Order
