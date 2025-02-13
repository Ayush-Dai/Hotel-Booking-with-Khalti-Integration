import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import "./footer.css"; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Hotel Info */}
        <div className="footer-section">
          <h2 className="footer-title">Hamro Hotel</h2>
          <p className="footer-text">
            Experience comfort and luxury in the heart of Ilam, Nepal. Enjoy breathtaking views, 
            exquisite dining, and world-class hospitality.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/home">Rooms</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/Gallery">Gallery</a></li>
          </ul>
        </div>

        {/* Contact Details */}
        <div className="footer-section">
          <h3 className="footer-title">Contact Us</h3>
          <p className="footer-text"><FaMapMarkerAlt className="footer-icon" /> Illam, Nepal</p>
          <p className="footer-text"><FaPhone className="footer-icon" /> +977-123456789</p>
          <p className="footer-text"><FaEnvelope className="footer-icon" /> contact@hamrohotel.com</p>

          {/* Social Media Icons */}
          <div className="footer-social">
            <a href="#" className="social-link"><FaFacebook /></a>
            <a href="#" className="social-link"><FaInstagram /></a>
            <a href="#" className="social-link"><FaTwitter /></a>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Hamro Hotel. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
