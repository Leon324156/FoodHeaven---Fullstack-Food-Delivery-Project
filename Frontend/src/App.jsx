import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import Contactpopup from './components/Contactpopup/Contactpopup'
import Footer from './components/Footer/Footer'
import Loginpopup from './components/Loginpopup/Loginpopup'
import Navbar from './components/Navbar/Navbar'
import Cart from './pages/Cart/Cart'
import Home from './pages/Home/home'
import MyOrders from './pages/MyOrders/MyOrders'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Verify from './pages/Verify/Verify'
const App = () => {

  const [showLogin,setShowLogin] = useState(false)
  const [showContact,setShowContact] = useState(false)
  

  return (
    <>
    {showLogin?<Loginpopup setShowLogin={setShowLogin}/>:<></>}
    {showContact?<Contactpopup setShowContact={setShowContact}/> : <></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin} setShowContact={setShowContact}/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<PlaceOrder/>} />
        <Route path='/verify' element={<Verify/>} />
        <Route path='/myorders' element={<MyOrders/>} />
      </Routes>
    </div>
     <Footer/>
     </>
  )
}

export default App
