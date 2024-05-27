import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import './MyOrders.css';

const MyOrders = () => {
    const [data, setData] = useState([]);
    const { url, token } = useContext(StoreContext);
    
    const fetchOrders = async () => {
        try {
            const response = await axios.post(`${url}/api/order/userorders`, {}, { headers: { token } });
            setData(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }
    
    useEffect(() => {
        if (token) {
            fetchOrders();

        }
    }, [token]);
    
    return (
        <div className='my-orders'>
          <h2>My orders</h2>
          <div className="container">
            {data.map((order, index) => (
              <div key={index} className='my-order'>
                <img src={assets.parcel_icon} alt="" />
                <p>{order.items.map((item,index)=>{
                    if (index === order.items.length -1){
                        return item.name + "x" + item.quantity
                    }
                    else{
                        return item.name + "x" + item.quantity + ", "
                    }

                })}</p>
                <p>${order.amount}.00</p>
                <p>Items : {order.items.length}</p>
                <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                <button>Track Order</button>
              </div>
            ))}
          </div>
        </div>
      );
}

export default MyOrders;
