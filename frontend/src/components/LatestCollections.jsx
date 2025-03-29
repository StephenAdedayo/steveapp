import React, { useContext, useEffect, useState } from 'react'
import Text from './Text'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem'

const LatestCollections = () => {

    const {products} = useContext(ShopContext)

    const [latestProducts, setLatestProducts] = useState([])

    useEffect(() => {
       setLatestProducts(products.slice(0,10))
    }, [products])

  return (
    <>
      <div className='w-full my-20 '>
        <div className='text-center flex items-center mb-3 justify-center text-3xl'>
        <Text text1={'Latest'} text2={'Collection'}/>
        </div>
        
        <p className='w-3/4 m-auto mb-3 text-xs sm:text-sm md:text-base text-gray-600 text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa consequatur labore voluptates, ut iure quam. Veniam magni eligendi error illum.</p>

         <div className='mt-10'>
          
        <ProductItem products={latestProducts}/> 
    
         </div>

  
      </div>
    </>
  )
}

export default LatestCollections
