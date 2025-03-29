import React from 'react'
import Text from '../components/Text'
import { assets } from '../assets/assets'
import NewsLetter from '../components/NewsLetter'

const Contact = () => {
  return (
    <div className='w-full'>
      
      <div className='grid place-items-center mb-10'>
        <Text text1={'contact'} text2={'us'}/>
      </div>


      <div className='flex md:flex-row flex-col gap-10 md:items-center  justify-center'>
       <div className=''>
        <img className='md:max-w-[480px] w-full' src={assets.contact_img} alt="" />
       </div>

       <div className='space-y-7 '>
        <p className='text-gray-600 font-bold'>Our Store</p>
        <p className='text-gray-500'>54709 Willms Station <br />
        Suite 350, Washington, USA</p>
        <p className='text-gray-500'>Tel: (415) 555-0132 <br />
        Email: admin@royalboutique.com</p>
        <p className='text-gray-600 font-bold'>Careers at RoyalBoutique</p>
        <p className='text-gray-500'>Learn more about our teams and job openings.</p>

        <button className='border border-black/75 bg-transparent p-4 hover:bg-black hover:text-white transition-colors duration-300 ease-in'>Explore Jobs</button>

       </div>


      </div>

<NewsLetter />
    </div>
  )
}

export default Contact
