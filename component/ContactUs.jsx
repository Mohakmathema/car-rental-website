// src/component/ContactUs.jsx
import React from 'react';
import '../styles/ContactUs.css';

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(Object.fromEntries(formData));
    alert('Thank you for your message!');
  };

  return (
    <div className="contact-container">
      <h1>Contact us</h1>
      
      <p className="contact-description">
        Have a question? We're here to help! Our friendly and knowledgeable 
        customer experience team love Black Girl Sunscreen and want to ensure 
        you will too! Feel free to reach us via phone, email or the form below. 
        You may also refer to our FAQ page to get quick answers to commonly 
        asked questions.
      </p>

      <div className="contact-info">
        <p><span className="contact-icon">✉️</span> Colabproject@gmail.com</p>
        <p><span className="contact-icon">📞</span> 9876543210</p>
        <p><span className="contact-icon">📞</span> 9856457365, 016632564</p>
      </div>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <input 
            type="email" 
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <input 
            type="tel" 
            placeholder="Enter your phone number"
            required
          />
        </div>
        <div className="form-group">
          <textarea 
            placeholder="Enter your issues"
            rows="4"
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactUs;