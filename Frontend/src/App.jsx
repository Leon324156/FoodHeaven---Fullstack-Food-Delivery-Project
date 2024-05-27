import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Loginpopup from './components/Loginpopup/Loginpopup'
import Navbar from './components/Navbar/Navbar'
import Cart from './pages/Cart/Cart'
import Home from './pages/Home/home'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Verify from './pages/Verify/Verify'

const App = () => {

  const [showLogin,setShowLogin] = useState(false)

  return (
    <>
    {showLogin?<Loginpopup setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<PlaceOrder/>} />
        <Route path='/verify' element={<Verify/>} />
      </Routes>
    </div>
     <Footer/>
     </>
  )
}

export default App
