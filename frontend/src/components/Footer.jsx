import React from 'react';
import "./Footer.css";

const Footer = () => {
  return (
    <div className="hobbyhive-footer-container">
      <footer className="hobbyhive-footer">
        <div className="hobbyhive-social-links">
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <img src="/images/facebook.svg" alt="Facebook" className="hobbyhive-icon" />
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <img src="/images/insta.svg" alt="Instagram" className="hobbyhive-icon" />
          </a>
          <a href="https://x.com/home" target="_blank" rel="noopener noreferrer">
            <img src="/images/twitter.svg" alt="Twitter" className="hobbyhive-icon" />
          </a>
          <a href="https://in.pinterest.com/" target="_blank" rel="noopener noreferrer">
            <img src="/images/pinterest.svg" alt="Pinterest" className="hobbyhive-icon" />
          </a>
        </div>

        <div className="hobbyhive-contact">
          <h3>Contact Us</h3>
          <div className="hobbyhive-contact-info">
            <div className="hobbyhive-phone">
              <span>Phone:</span> 9988776655
            </div>
            <div className="hobbyhive-email">
              <span>Email:</span> example.com@gmail.com
            </div>
          </div>
        </div>

        <div className="hobbyhive-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, sequi voluptatibus suscipit atque doloremque facilis!
        </div>

        <div className="hobbyhive-copyright">
          <p>&copy; <span id="current-year">{new Date().getFullYear()}</span> Hobby Hive. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
