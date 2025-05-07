import React, { useEffect, useRef } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useLocation } from 'react-router-dom'

const Navbar = ({setToken, setOpen, open}) => {

  const navRef = useRef()

  const logout = () => {

    localStorage.removeItem("token")
    setToken("")
  }

  const location = useLocation()

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if(window.scrollY >= 10){
        navRef.current.classList.add("black")

      }else{
        navRef.current.classList.remove("black")
      }
    })



  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location])
  return (
    <>
    <nav ref={navRef} className='px-5 transition duration-500 delay-75 ease-in-out lg:px-20 py-5 sticky z-40 top-0 w-full flex justify-between items-center border-b border-gray-200'>
      
      <div>
        <img className='w-[100px]' src={assets.logo} alt="" />
      </div>

      <div>
        <button onClick={logout} className='text-white px-4 md:block hidden py-2 bg-black/75 rounded-3xl'>Logout</button>
      </div>

      <div onClick={() => setOpen(!open)} className='md:hidden block cursor-pointer' >
      <img className='w-[30px]' src="https://cdn-icons-png.freepik.com/256/4610/4610297.png?ga=GA1.1.2728068.1744452084&semt=ais_hybrid" alt="" />

      </div>

    </nav>

    <div onClick={() => setOpen(false)} className={`${open ? 'opacity-100': "pointer-events-none opacity-0"} overflow-hidden transition-opacity duration-500 delay-75 ease-in-out md:hidden backdrop-blur-3xl   bg-gray-400  top-0 left-0 right-0 h-full fixed z-50` }>
    </div>
     
    <div className={`${open ? ' w-[100%] ': "pointer-events-none w-0"}  overflow-hidden transition-all duration-500 delay-75 ease-in-out md:hidden bg-white/75  top-0 left-0 h-full fixed z-50`}>

    <div onClick={() =>setOpen(false)} className='flex justify-end pt-2 pr-2'>
      <img className='w-[25px]' src="https://cdn-icons-png.freepik.com/256/5038/5038500.png?ga=GA1.1.2728068.1744452084&semt=ais_hybrid" alt="" />
    </div>
        
        <div className='flex   flex-col gap-5 pt-4 w-full'>
        
        <NavLink to={'/'} className={'md:flex-1 text-black flex gap-2 items-center px-4 py-2'}>
            <img className='w-[20px] ' src='https://cdn-icons-png.freepik.com/256/7855/7855883.png?ga=GA1.1.2728068.1744452084&semt=ais_hybrid' alt="" />
            <p className=' text-[12px] xl:text-base'>Dashboard</p>
        </NavLink>
        
        <NavLink to={'/add'} className={'flex-1 text-black flex gap-2 items-center px-4 py-2'}>
        <img className='w-[20px]' src={'https://cdn-icons-png.freepik.com/256/2099/2099163.png?ga=GA1.1.2728068.1744452084&semt=ais_hybrid'} alt="" />
        <p className=' text-[12px] xl:text-base'>Add Items</p>
        </NavLink>

        <NavLink to={'/items'} className={'flex-1 text-black flex gap-2 items-center px-4 py-2'}>
        <img className='w-[20px]' src={'https://cdn-icons-png.freepik.com/256/1373/1373779.png?ga=GA1.1.2728068.1744452084&semt=ais_hybrid'} alt="" />
        <p className=' text-[12px] xl:text-base'>List Items</p>
        </NavLink>

        <NavLink to={'/order'} className={'flex-1 text-black flex gap-2 items-center px-4 py-2'}>
        <img className='w-[20px]' src={'https://cdn-icons-png.freepik.com/256/6145/6145514.png?ga=GA1.1.2728068.1744452084&semt=ais_hybrid'} alt="" />
        <p className=' text-[12px] xl:text-base'>Orders</p>
        </NavLink>

        <NavLink to={'/customers'} className={'flex-1 text-black flex gap-2 items-center  px-4 py-2'}>
        <img className='w-[20px]' src={'https://cdn-icons-png.freepik.com/256/11201/11201497.png?ga=GA1.1.2728068.1744452084&semt=ais_hybrid'} alt="" />
        <p className=' text-[12px] xl:text-base'>Customers</p>
        </NavLink>

       

        </div>
        <div onClick={logout} className='px-4 flex gap-2 absolute bottom-5 items-center'>
          <p className='text-[12px] xl:text-base'>Logout</p>
        <img className='w-[20px] md:hidden block' src="https://cdn-icons-png.freepik.com/256/8717/8717140.png?ga=GA1.1.2728068.1744452084&semt=ais_hybrid" alt="" />
      </div>

    </div>

    </>
  )
}

export default Navbar
