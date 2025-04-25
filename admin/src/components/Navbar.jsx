import React, { useEffect, useRef } from 'react'
import { assets } from '../assets/assets'

const Navbar = ({setToken}) => {

  const navRef = useRef()

  const logout = () => {

    localStorage.removeItem("token")
    setToken("")
  }

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if(window.scrollY >= 10){
        navRef.current.classList.add("black")

      }else{
        navRef.current.classList.remove("black")
      }
    })

  }, [])

  return (
    <nav ref={navRef} className='px-5 transition duration-500 delay-75 ease-in-out lg:px-20 py-5 sticky z-50 top-0 w-full flex justify-between items-center border-b border-gray-200 '>
      
      <div>
        <img className='w-[100px]' src={assets.logo} alt="" />
      </div>

      <div>
        <button onClick={logout} className='text-white px-4 py-2 bg-black/75 rounded-3xl'>Logout</button>
      </div>

    </nav>
  )
}

export default Navbar
