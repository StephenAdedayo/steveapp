import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <aside className='w-full sticky top-0 min-h-screen border-r py-10 border-r-gray-200 pl-5 lg:pl-20'>
        
        <div className='flex flex-col gap-5 w-full'>
        
        <NavLink to={'/'} className={'md:flex-1 flex gap-2 items-center border border-r-0 border-gray-300 px-4 py-2'}>
            <img className='w-[20px]' src={assets.add_icon} alt="" />
            <p className='hidden md:block text-[12px] xl:text-base'>Dashboard</p>
        </NavLink>
        
        <NavLink to={'/add'} className={'flex-1 flex gap-2 items-center border border-r-0 border-gray-300 px-4 py-2'}>
            <img className='w-[20px]' src={assets.add_icon} alt="" />
            <p className='hidden md:block text-[12px] xl:text-base'>Add Items</p>
        </NavLink>

        <NavLink to={'/items'} className={'flex-1 flex gap-2 items-center border border-r-0 border-gray-300 px-4 py-2'}>
            <img className='w-[20px]' src={assets.parcel_icon} alt="" />
            <p className='hidden md:block text-[12px] xl:text-base'>List Items</p>
        </NavLink>

        <NavLink to={'/order'} className={'flex-1 flex gap-2 items-center border border-r-0 border-gray-300 px-4 py-2'}>
            <img className='w-[20px]' src={assets.order_icon} alt="" />
            <p className='hidden md:block text-[12px] xl:text-base'>Orders</p>
        </NavLink>

        <NavLink to={'/customers'} className={'flex-1 flex gap-2 items-center border border-r-0 border-gray-300 px-4 py-2'}>
            <img className='w-[20px]' src={assets.order_icon} alt="" />
            <p className='hidden md:block text-[12px] xl:text-base'>Customers</p>
        </NavLink>

        </div>


    </aside>
  )
}

export default Sidebar
