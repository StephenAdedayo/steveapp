import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Add from './pages/Add'
import Items from './pages/Items'
import Order from './pages/Order'
import Customers from './pages/Customers'
import { ToastContainer } from 'react-toastify'
import Login from './components/Login'

export const backendUrl = import.meta.env.VITE_BACKEND_URL

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem("token") : "")
  const [open, setOpen] = useState(false)

  const location = useLocation()

  // useEffect(() => {
    //  localStorage.setItem("token", token)
    //  setOpen(false)
  // }, [location])

  return (
    
    <>
    <main className='bg-gray-50 min-h-screen'>
 <ToastContainer theme='dark'/>     
    {token === "" ? <Login setToken={setToken} /> : 
    <>
    <Navbar setToken={setToken} setOpen={setOpen} open={open}/>
    <div className='flex w-full'>
     <div className='flex-[20%] md:block hidden '>
    <Sidebar setToken={setToken} open={open} setOpen={setOpen}/>
    </div>
    
    <div className='flex-[80%] py-10 px-5 lg:px-20'>
   <Routes>

  <Route path='/' element={<Dashboard />}/>
  <Route path='/add' element={<Add token={token}/>}/>
  <Route path='/items' element={<Items token={token} />}/>
  <Route path='/order' element={<Order token={token}/>}/>
  <Route path='/customer' element={<Customers />}/>
  {/* <Route path='/login' element={<Login />}/> */}

   </Routes>
   </div>
   </div>
   </>
    }
      
      </main>
    </>
  )
}

export default App
