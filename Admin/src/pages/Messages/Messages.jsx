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
          </div>
        ))}
      </div>
    </div>
  )
}

export default Messages
