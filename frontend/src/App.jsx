import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'

const App = () => {
  return (
    <>
    
    <Navbar />
    <div className='px-4 lg:px-40'>
    <SearchBar />

    </div>
    <main className='px-4 lg:px-40'>
      <Routes>
       <Route path='/' element={<Home />}/>
       <Route path='/collection' element={<Collection />}/>
       <Route path='/about' element={<About />}/>
       <Route path='/contact' element={<Contact />}/>


      </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
