import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'
import "./Messages.css"

const Messages = ({ url }) => {
  const [messages, setMessages] = useState([])

  const fetchAllMessages = async () => {
    try {
      const response = await axios.get(`${url}/api/message/list`)
      if (response.data.success) {
        setMessages(response.data.data)
      } else {
        toast.error("Error fetching messages: " + response.data.message)
      }
    } catch (error) {
      toast.error("Error fetching messages: " + error.message)
    }
  }

  useEffect(() => {
    fetchAllMessages()
  }, [url]) 


  const removemessage = async(messageid) => {
    const response = await axios.post(`${url}/api/message/remove`, {id:messageid})
    await fetchAllMessages()
    if (response.data.success){
      toast.success(response.data.message)
    }
    else {
      toast.error(response.data.message)
    }
    }
  return (
    <div className='message-add'>
      <h3>Messages page</h3>
      <div className="message-list">
        {messages.map((message) => (
          <div key={message._id} className="message-item">
            <img src={assets.Message12} alt="Parcel Icon" />
            <div className="message-item-details">
              <p>Title: {message.title}</p>
              <p>Content: {message.content}</p>
              {message.email && <p>Email: {message.email}</p>}
              <p>Date: {new Date(message.date).toLocaleString()}</p>
            </div>
            <p className='cursor' onClick={()=>removemessage(message._id)}>x</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Messages
