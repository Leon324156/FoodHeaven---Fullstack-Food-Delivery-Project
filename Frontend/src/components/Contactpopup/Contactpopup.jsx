import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import './Contactpopup.css'

const ContactForm = ({ setShowContact }) => {
    const { url, token } = useContext(StoreContext)

    const [data, setData] = useState({
        content: "",
        email: "",
        title: ""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${url}/api/message/send`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                     'token' : token
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const result = await response.json();
                alert(result.message);
                setShowContact(false);
            } else {
                const error = await response.json();
                alert(error.message);
            }
        } catch (error) {
            alert("Error sending message");
        }
    }

    return (
        <div className='contact-popup'>
            <form className="contact-popup-container" onSubmit={handleSubmit}>
                <div className="contact-popup-header">
                    <h2>Contact Us</h2>
                    <img onClick={() => setShowContact(false)} src={assets.cross_icon} alt="Close" />
                </div>
                <div className="contact-popup-fields">
                    <input type="email" onChange={onChangeHandler} name='email' placeholder='Your email' required />
                    <input type="text" placeholder='Title' name='title' onChange={onChangeHandler} value={data.title} required />
                    <textarea onChange={onChangeHandler} value={data.content} name='content' rows="6" placeholder='Your message'></textarea>
                    <button type="submit">Send message</button>
                </div>
                <div className="contact-popup-terms">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use and privacy policy</p>
                </div>
            </form>
        </div>
    )
}

export default ContactForm
