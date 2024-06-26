import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'
import "./Side.css"
const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
       <NavLink to="/add" className="sidebar-option">
           <img src={assets.add_icon} alt="" />
            <p>Add items</p>
        </NavLink>
        <NavLink to="/list" className="sidebar-option">
           <img src={assets.order_icon} alt="" />
            <p>List item</p>
        </NavLink>
        <NavLink to = "/orders" className="sidebar-option">
           <img src={assets.order_icon} alt="" />
            <p>Orders</p>
        </NavLink>
        <NavLink to = "/messages" className="sidebar-option">
           <img src={assets.order_icon} alt="" />
            <p>Messages</p>
        </NavLink>
      </div>
      
    </div>
  )
}

export default Sidebar
