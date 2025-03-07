import React from 'react'
import './css/Contact.css';
const Contact = () => {
  return (
    <div>
      <div className="top">
    <h1>Contact US</h1>
  </div>
  <div className="contact-container">
      <div className="contact-left">
        <h1>Contact Us for Further Information</h1>
        <hr />
        <div className="contact-info">
          <div>
            <h3>Address</h3>
            <p>Near Tikoni Park, New Subhash Nagar, Ludhiana</p>
          </div>
          <div>
            <h3>Phone</h3>
            <p>+91 79861-11400, +91 62840-04413</p>
          </div>
          <div>
            <h3>Email</h3>
            <p>md331148@gmail.com</p>
          </div>
        </div>
      </div>
      <div className="contact-right">
        <form className="contact-form">
          <label htmlFor="name">Full Name</label>
          <input className='input' type="text" id="name" placeholder="Enter your full name" />
          <label htmlFor="email">Email</label>
          <input className='input' type="email" id="email" placeholder="Enter your email" />
          <label htmlFor="message">Message</label>
          <textarea className='input' id="message" placeholder="Enter your message"></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Contact
