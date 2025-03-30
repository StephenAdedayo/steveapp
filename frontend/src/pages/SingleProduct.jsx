import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useParams } from 'react-router-dom'
import { assets } from '../assets/assets'
import RelatedProduct from '../components/RelatedProduct'

const SingleProduct = () => {
    
    const {id} = useParams()
    const {products, currency} = useContext(ShopContext)
    const [productData, setProductData] =  useState(false)
    const [image, setImage] = useState('')
    const [size, setSize] = useState('')

    const fetchProductData = async () => {
        products.map((item) => {
            if(item._id === id){
                setProductData(item)
                console.log(item);
                setImage(item.image[0])
                return null
            }
        })
    }

    useEffect(() => {
      fetchProductData()
    }, [id, products])

  return productData ? (
    <div className='w-full '>
        
        <div className='flex flex-col sm:flex-row gap-8'>
        
        <div className='flex flex-col-reverse sm:flex-row gap-5 flex-[60%]'>

      <div className='flex gap-3 flex-row sm:flex-col overflow-x-auto'>
        {productData.image.map((image, index) => (
            <img onClick={() => setImage(image)} key={index} src={image} alt="" className='w-[100px] '/>
        ))}
      </div>

      <div className='w-full sm:w-[80%]'>
        <img className='h-auto w-full' src={image} alt="" />
      </div>


        </div>


       <div className='flex-[40%] space-y-5'>
       <p>{productData.name}</p>
        
        <div className='flex items-center gap-1 mt-2'>
       <img src={assets.star_icon} alt="" className="w-3 5" />
       <img src={assets.star_icon} alt="" className="w-3 5" />
       <img src={assets.star_icon} alt="" className="w-3 5" />
       <img src={assets.star_icon} alt="" className="w-3 5" />
       <img src={assets.star_dull_icon} alt="" className="w-3 5" />
       <p className='pl-2'>(122)</p>
       </div>

       <div>
       <p>{currency}{productData.price}</p>
       <p className='text-gray-500'>{productData.description}</p>
         </div>
      
        <p>Select Size</p>
        <div className='space-x-2'>
            {productData.sizes.map((item, index) => (
                <button className={`${size === item ? 'border-orange-500' : ''} border bg-gray-100 px-4 py-2  `} onClick={() => setSize(item)}>{item}</button>
            ))}
        </div>

        <button className='border bg-black px-4 py-2 text-white'>Add to Cart</button>

<hr />

<p className='text-gray-500'>100% Original Product <br />
Cash on delivery is avaliable on this product <br />
Eash return and exchange policy within 7 days</p>


       </div>



        </div>

        <div className='my-20'>
            <div className='flex'>
                <p className='border border-gray-300 px-6 text-[14px] font-bold py-2'>Description</p>
                <p className='border border-gray-300 px-6 text-[14px] py-2'>Reviews(122)</p>
            </div>
            <div className='border text-[14px] space-y-4 border-gray-300 text-gray-500 px-6 py-4'>
                <p >An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
                <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
            </div>
        </div>
        
        <RelatedProduct category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ) : <></>
}

export default SingleProduct
