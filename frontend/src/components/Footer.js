import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">🍽️ Smart Dining</h3>
            <p className="footer-text">
              Discover the best restaurants and make reservations with ease. 
              Your culinary journey starts here.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                📘
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                🐦
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                📷
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                💼
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/restaurants">Restaurants</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">Support</h4>
            <ul className="footer-links">
              <li><Link to="/help">Help Center</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">Contact Info</h4>
            <div className="contact-info">
              <p>📍 123 Dining Street, Food City</p>
              <p>📞 +1 (555) 123-4567</p>
              <p>✉️ info@smartdining.com</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Smart Dining. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 