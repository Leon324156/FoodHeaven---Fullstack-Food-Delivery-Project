import axios from 'axios';
import React, { useContext, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './PlaceOrder.css';
const PlaceOrder = () => {
  const { GetTotal, food_list, token, cartItems, url } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "", 
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "", 
  });
   
  const placeOrder = async (event) => {
    event.preventDefault();
    
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] }; 
        orderItems.push(itemInfo);
      }
    });
  
    let orderData = {
      address: data,
      items: orderItems,
      amount: GetTotal() + 2,
    };
  
    try {
      let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.href = session_url; 
      } else {
        alert("Error: " + (response.data.message || "Unknown error"));
      }
    } catch (error) {
      alert("Request failed: " + error.message);
    }
  };

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            type="text"
            name='firstName'
            onChange={onChangeHandler}
            value={data.firstName}
            placeholder='First Name'
            required
          />
          <input
            type="text"
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            placeholder='Last Name'
            required
          />
        </div>
        <input
          type="email"
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          placeholder='Email addresses'
          required
        />
        <input
          type="text"
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          placeholder='Street'
          required
        />
        <div className="multi-fields">
          <input
            type="text"
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            placeholder='City'
            required
          />
          <input
            type="text"
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            placeholder='State'
            required
          />
        </div>
        <div className="multi-fields">
          <input
            type="text"
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            placeholder='Zip code'
            required
          />
          <input
            type="text"
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            placeholder='Country'
            required
          />
        </div>
        <input
          type="text"
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          placeholder='Phone'
          required
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${GetTotal()}</p>
            </div>
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${GetTotal() === 0 ? "0" : "2"}</p>
            </div>
            <div className="cart-total-details">
              <b>Total</b>
              <b>${GetTotal() === 0 ? "0" : GetTotal() + 2}</b>
            </div>
          </div>
          <button type='submit' >PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
