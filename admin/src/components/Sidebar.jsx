import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = ({setToken, open, setOpen}) => {

    const logout = () => {

        localStorage.removeItem("token")
        setToken("")
      }

      
  return (
    <aside className={`sticky top-0 min-h-screen border-r py-10 border-r-gray-200 pl-5 lg:pl-20`}>
        
        <div className='flex flex-col gap-5 w-full'>
        
        <NavLink to={'/'} className={'md:flex-1 flex gap-2 items-center border border-r-0 border-gray-300 px-4 py-2'}>
            <img className='w-[20px]' src={'https://cdn-icons-png.freepik.com/256/7855/7855883.png?ga=GA1.1.2728068.1744452084&semt=ais_hybrid'} alt="" />
            <p className='hidden md:block text-[12px] xl:text-base'>Dashboard</p>
        </NavLink>
        
        <NavLink to={'/add'} className={'flex-1 flex gap-2 items-center border border-r-0 border-gray-300 px-4 py-2'}>
            <img className='w-[20px]' src={'https://cdn-icons-png.freepik.com/256/2099/2099163.png?ga=GA1.1.2728068.1744452084&semt=ais_hybrid'} alt="" />
            <p className='hidden md:block text-[12px] xl:text-base'>Add Items</p>
        </NavLink>

        <NavLink to={'/items'} className={'flex-1 flex gap-2 items-center border border-r-0 border-gray-300 px-4 py-2'}>
            <img className='w-[20px]' src={'https://cdn-icons-png.freepik.com/256/1373/1373779.png?ga=GA1.1.2728068.1744452084&semt=ais_hybrid'} alt="" />
            <p className='hidden md:block text-[12px] xl:text-base'>List Items</p>
        </NavLink>

        <NavLink to={'/order'} className={'flex-1 flex gap-2 items-center border border-r-0 border-gray-300 px-4 py-2'}>
            <img className='w-[20px]' src={'https://cdn-icons-png.freepik.com/256/6145/6145514.png?ga=GA1.1.2728068.1744452084&semt=ais_hybrid'} alt="" />
            <p className='hidden md:block text-[12px] xl:text-base'>Orders</p>
        </NavLink>

        <NavLink to={'/customers'} className={'flex-1 flex gap-2 items-center border border-r-0 border-gray-300 px-4 py-2'}>
            <img className='w-[20px]' src={'https://cdn-icons-png.freepik.com/256/11201/11201497.png?ga=GA1.1.2728068.1744452084&semt=ais_hybrid'} alt="" />
            <p className='hidden md:block text-[12px] xl:text-base'>Customers</p>
        </NavLink>

        <div onClick={logout} className=''>
        {/* <button  className='text-black px-4 md:hidden block py-2'>SignOut </button> */}
        <img className='w-[40px] md:hidden block' src="https://cdn-icons-png.freepik.com/256/17558/17558115.png?ga=GA1.1.2728068.1744452084&semt=ais_hybrid" alt="" />
      </div>

        </div>


    </aside>
  )
}

export default Sidebar
