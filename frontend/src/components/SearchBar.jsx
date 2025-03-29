import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { useLocation } from 'react-router-dom'

const SearchBar = () => {

    const {showSearch, setShowSearch, search, setSearch} = useContext(ShopContext)
    const [visible, setVisible] = useState(true)
    const location = useLocation()

    useEffect(() => {
     const locate = location.pathname.includes('collection')
     if(locate){
        setVisible(true)
     }else{
        setVisible(false)
     }
    }, [location])

  return showSearch && visible ? (
    <div className='w-full py-6 px-2 border-t border-b border-gray-300 bg-gray-50 text-center'>
        
        <div className='flex items-center gap-5 w-full justify-center'>
        <div className='border px-3 py-2 border-gray-500 rounded-2xl w-full lg:w-[50%] flex items-center'>
            <input value={search} onChange={(e) => setSearch(e.target.value)} type="search" className='outline-0  flex-1  w-full lg:w-[50%]' placeholder='search'/>
            <img src={assets.search_icon} alt="" className='size-[20px]' />
        </div>
        <img src={assets.cross_icon} alt="" className='w-[15px]' onClick={() => setShowSearch(false)}/>
        </div>

    </div>
  ) : null
}

export default SearchBar
