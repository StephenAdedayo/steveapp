import React, { useContext, useEffect, useState } from 'react'
import {assets} from '../assets/assets'
import { NavLink, useLocation } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {

    const [isMenuOpen, setMenuOpen] = useState(false)
    const {setShowSearch, navigate} = useContext(ShopContext)
  

    const openSearchBar = () => {
      navigate('/collection')
      setShowSearch(true)
    }

    const location = useLocation()

    useEffect(() => {
    setMenuOpen(false)
    }, [location])

  return (
    <>
      <nav className='px-5 py-8 lg:px-40 flex justify-between items-center'>
        <div>
            <img src={assets.logo} alt="" className='w-[150px]' />
        </div>
        
        
        <div className='lg:flex hidden gap-10'>
        
        <NavLink to={'/'} className={'flex flex-col items-center'}>
            <p className='uppercase text-base'>Home</p>
            <hr  className='bg-gray-700 w-2/4 border-none hidden h-[1.5px]'/>
        </NavLink>

        <NavLink to={'/collection'} className={'flex flex-col items-center'}>
            <p className='uppercase text-base'>Collection</p>
            <hr  className='bg-gray-700 w-2/4 border-none hidden h-[1.5px]'/>
        </NavLink>

        <NavLink to={'/about'} className={'flex flex-col items-center'}>
            <p className='uppercase text-base'>About</p>
            <hr  className='bg-gray-700 w-2/4 border-none hidden h-[1.5px]'/>
        </NavLink>

        <NavLink to={'/contact'} className={'flex flex-col items-center'}>
            <p className='uppercase text-base'>Contact</p>
            <hr  className='bg-gray-700 w-2/4 border-none hidden h-[1.5px]'/>
        </NavLink>

        </div>

    <div className='flex gap-5'>
        <img className='size-5' onClick={openSearchBar}  src={assets.search_icon} alt="" />
        <img className='size-5' src={assets.profile_icon} alt="" />
        <img className='size-5' src={assets.cart_icon} alt="" />
        <img className='size-5 lg:hidden block' src={assets.menu_icon} alt="" onClick={() => setMenuOpen(!isMenuOpen)}/>
    </div>

      </nav>


      {/* smaller screens */}

      <div onClick={() => setMenuOpen(false)} className={`${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} h-full right-0 left-0  top-0 w-full fixed bg-gray-400/40  backdrop-blur-xl`}>

      </div>

      <nav className={`${isMenuOpen ? 'w-[70%]' : 'w-0 pointer-events-none'} overflow-hidden lg:hidden block z-50 transition-all duration-300 delay-75 ease-in bg-white fixed top-0 right-0 bottom-0  pt-3`}>
  
      <div onClick={() => setMenuOpen(false)} className='flex px-5 items-center gap-3'>
        <img src={assets.dropdown_icon} className='-rotate-180 w-2' alt="" />
        <p>Back</p>
      </div>

      <div className='flex flex-col mt-2'>
      <NavLink to={'/'} className={'py-2 uppercase border-b pl-6'}>
            Home
        </NavLink>

        <NavLink to={'/collection'} className={'py-2 uppercase border-b pl-6'}>
            Collection
        </NavLink>

        <NavLink to={'/about'} className={'py-2 uppercase border-b pl-6'}>
            About
        </NavLink>

        <NavLink to={'/contact'} className={'py-2 uppercase border-b pl-6'}>
            Contact
        </NavLink>
      </div>

      
      </nav>
    </>
  )
}

export default Navbar
