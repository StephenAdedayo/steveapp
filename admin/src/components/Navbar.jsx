import React from 'react'
import { assets } from '../assets/assets'

const Navbar = ({setToken}) => {
  return (
    <nav className='px-5 lg:px-20 py-5 flex justify-between items-center border-b border-gray-200 '>
      
      <div>
        <img className='w-[100px]' src={assets.logo} alt="" />
      </div>

      <div>
        <button onClick={() => setToken("")} className='text-white px-4 py-2 bg-black/75 rounded-3xl'>Logout</button>
      </div>

    </nav>
  )
}

export default Navbar
