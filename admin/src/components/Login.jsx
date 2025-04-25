import axios from 'axios'
import React, { useState } from 'react'
import { backendUrl } from '../App'

const Login = ({setToken}) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const onSubmitHandler = async (e) => {
    e.preventDefault()

   

    try {


      const response = await axios.post(backendUrl + "/api/users/admin", {email, password})
      if(response.data.success){
        setToken(response.data.token)
        localStorage.setItem("token", response.data.token)
      }
    } catch (error) {
      console.log(error.message);
      
    }
  }

  return (
    <div className='w-full h-screen grid place-items-center '>
      

         <form onSubmit={onSubmitHandler} className='max-w-[400px] w-full p-6 shadow rounded-lg' action="">
          <h1 className='mb-4 font-bold '>Admin Panel</h1>
          
          <div className='mb-6'>
          <label className='' htmlFor="">Email Address</label> <br />
          <input value={email} onChange={(e) => setEmail(e.target.value)} className='outline-0 border border-gray-300 pl-2 py-2 rounded-lg w-full' type="email"  placeholder='enter your email' required/>
          </div>

          <div>
          <label className='' htmlFor="">Password</label> <br />
          <input value={password} onChange={(e) => setPassword(e.target.value)} className='outline-0 border border-gray-300 pl-2 py-2 rounded-lg w-full' type="password"  placeholder='enter your password' required/>
          </div>
          
          <button type='submit' className='text-white bg-black w-full py-2 rounded-lg mt-10'>Login</button>

         </form>

    </div>
  )
}

export default Login
