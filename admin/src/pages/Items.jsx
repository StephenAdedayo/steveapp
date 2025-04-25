import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'


const Items = ({token}) => {

   const [items, setItems] = useState([])

  const getProducts = async () => {
    toast.success("Fetching.....", {
      toastId : "fetching"
    })
   try {
    const response = await axios.get(backendUrl + "/api/product/list")
    if(!response.data.success){
      throw new Error(response.data.message)
    } 

    if(response.data.success){
        setItems(response.data.product)
    }
     
    setTimeout(() => {
      toast.success("Product Fetched", {
        toastId : "fetched"
      })

    }, 2000);

   } catch (error) {
      console.log(error.message);
      toast.error(response.data.message)
      
   }

  }


  const deleteProduct = async (id) => {
    
     try {
      const response =  await axios.post(backendUrl + "/api/product/remove", {id}, {headers : {token}}
      )
      // setItems(prev => prev.filter(item => item._id !== id))
      if(!response.data.success){
        toast.error(response.data.message)
      }
      if(response.data.success){
        toast.success(response.data.message)
        await getProducts()
      }
     } catch (error) {
      console.log(error.message);
      toast.error(response.data.message)
      
     }
  }

  useEffect(() => {
     getProducts()
  }, [])

  return (
    <div className='w-full'>
      
      <h1>All Products</h1>

      <div>

        <div className='border border-gray-400 p-2 bg-gray-300 text-gray-500 grid grid-cols-12 gap-2'>
        <p className='col-span-3'>Image</p>
         <p className='col-span-3'>Name</p>
         <p className='col-span-2'>Category</p>
         <p className='col-span-2'>Price</p>
         <p className='col-span-2'>Action</p>
        </div>

       <div className='w-full overflow-x-scroll '>
        {items.map((item, index) => (
          <div className='p-2  border border-gray-300 grid grid-cols-12 gap-2 items-center' key={index}>
            <img className='w-[100px] col-span-3' src={item.image[0]} alt="" />
            <p className='col-span-3'>{item.name}</p>
            <p className='col-span-2'>{item.category}</p>
            <p className='col-span-2'>{item.price}</p>
            <p onClick={() => deleteProduct(item._id)} className='col-span-2 '>X</p>
          </div>
        ))}
       </div>




      </div>

    </div>
  )
}

export default Items
