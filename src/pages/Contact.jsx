import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./css/Contact.css";

const Contact = () => {
  const formRef = useRef(); // Create a reference for the form
  const [messageSent, setMessageSent] = useState(false);
  const [error, setError] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Send email using EmailJS
    emailjs
      .sendForm(
        "service_dnlw2l5", // Your EmailJS Service ID
        "template_5lin8lv", // Your EmailJS Template ID
        formRef.current,
        "GihJAGVBYHxBNNHeV" // Your EmailJS Public Key
      )
      .then(
        () => {
          setMessageSent(true);
          setError(null);
          formRef.current.reset(); // Reset form after successful submission
        },
        (error) => {
          setError("Failed to send the message. Please try again.");
          console.error("Email sending failed:", error);
        }
      );
  };

  return (
    <div>
      <div className="top">
        <h1>Contact Us</h1>
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
          <form ref={formRef} className="contact-form" onSubmit={sendEmail}>
            <label htmlFor="name">Full Name</label>
            <input className="input" type="text" name="name" placeholder="Enter your full name" required />

            <label htmlFor="email">Email</label>
            <input className="input" type="email" name="email" placeholder="Enter your email" required />

            <label htmlFor="message">Message</label>
            <textarea className="input" name="message" placeholder="Enter your message" required></textarea>

            <button type="submit">Send Message</button>

            {messageSent && <p className="success-message">Message sent successfully!</p>}
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
