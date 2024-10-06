import React from 'react'
import "./Footer.css";



const Footer = () => {
  return (
    <div className="footerimg">
    <img src="/images/cup.png" alt="Cup" />
    <footer>
        <div className="social">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><img src="/images/facebook.svg" alt="Facebook" /></a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><img src="/images/insta.svg" alt="Instagram" /></a>
            <a href="https://x.com/home" target="_blank" rel="noopener noreferrer"><img src="/images/twitter.svg" alt="Twitter" /></a>
            <a href="https://in.pinterest.com/" target="_blank" rel="noopener noreferrer"><img src="/images/pinterest.svg" alt="Pinterest" /></a>
        </div>

        <div className="contact">
            CONTACT US
        </div>

        <div className="coninfo">
            <div className="phone">
                <div>Phone Number</div>
                <div>9988776655</div>
            </div>
            <div className="email">
                <div>Email</div>
                <div>example.com@gmail.com</div>
            </div>
        </div>

        <div className="info">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo id veritatis qui nemo, in earum optio veniam impedit laudantium iusto voluptas soluta, ex obcaecati blanditiis voluptatum. Ad vel itaque blanditiis temporibus nisi nam, vitae tempora, suscipit eos a consequatur, fuga necessitatibus? Fugiat consequatur mollitia incidunt aliquam quibusdam atque, harum sequi.
        </div>

        <div className="copyright">
            <p>&copy; <span id="current-year">{new Date().getFullYear()}</span> Salon demo. All rights reserved.</p>
        </div>
    </footer>
</div>
  )
}

export default Footer
