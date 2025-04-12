import React from 'react';
import './css/Web.css';
import { Link } from 'react-router-dom';

const WebFooter = () => {
  return (
    <div className='footer'>
      <p>
        Copyright © 2025 - Raretech Institute of Information Technology • Ludhiana, Punjab • Tel: +91-6280009096
      </p>

      <div className="footer-menu">
        <h3>For Institute Use Only</h3>
        <ul>
          <li><a href="">Exam</a></li>
          <li><a href="https://admin.raretech.co.in/">Dashboard</a></li>
          <li><a href="https://typing.raretech.co.in/">Typing Tutor</a></li>
          <li><Link to="/certificate">Certificate Verification</Link></li>
        </ul>
        <br />
        <ul>
          <li><Link to="/privacy-policy">Privacy Policy</Link></li>
          <li><Link to="/refund">Refund</Link></li>
          <li><Link to="/shipping-delivery">Shipping</Link></li>
          <li><Link to="/terms-conditions">Terms and Conditions</Link></li>
          
        </ul>

      </div>
    </div>
  );
}

export default WebFooter;
