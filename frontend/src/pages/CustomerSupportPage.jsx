import React from 'react';
import './customerSupport.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";

const CustomerSupportPage = () => {

  const navigate = useNavigate();

  const handleLogout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('loggedInEmail');
    handleSuccess('User Logged out');
    setTimeout(() => {
      navigate('/home');
    }, 2000);
  }
  return (
    <>
     <Navbar handleLogout={handleLogout} />
    <div className="support-page">
      {/* About Us Section */}
      <section className="refund-policy">
        <h1>About Us</h1>
        <p>
        Hobby Hive is an online platform designed to connect hobby enthusiasts with a wide range of hobby-related products,services and Community.The platform aims to foster creativity and relaxation by making it easier for people to explore and engage in their hobbies.Whether users are interested in crafting, gardening, cooking, or any other hobbies. Hobby Hives provides resources, tutorials, and supplies in one accessible location.

        </p>
      </section>

      {/* Refund Policy Section */}
      <section className="refund-policy">
        <h1>Refund Policy</h1>
        <p>
          We provide a 30-day return policy for all purchases. To be eligible for a refund, items must be unused, 
          in their original condition, and accompanied by the receipt. Contact our support team to begin the return process.
        </p>
      </section>

      {/* Contact Us Section */}
      <section className="contact-us">
        <h1>Contact Us</h1>
        <p>
          Need help or have a question? </p><p>Reach out to our support team </p> 
          <p>Email: <a href="mailto:support@ourcompany.com"> hobbyhive@gmail.com</a></p>
          <p>Contact : (123) 456-7890.</p>
          <p> We are available Monday to Friday from 9 AM to 6 PM.</p>
        {/* <button>Contact Support</button> */}
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <h1>Frequently Asked Questions (FAQ)</h1>
        <div className="faq-item">
          <h2>What is your return policy?</h2>
          <p>We offer a 30-day return policy on all purchases. Items must be unused and in their original condition.</p>
        </div>
        <div className="faq-item">
          <h2>How long does shipping take?</h2>
          <p>Standard shipping takes 5-7 business days. Expedited options are available during checkout.</p>
        </div>
        <div className="faq-item">
          <h2>Can I change my order after it's placed?</h2>
          <p>You can modify your order within 24 hours of placing it. Contact our support team for assistance.</p>
        </div>
      </section>

      {/* Support Resources Section */}
      <section className="support-resources">
        <h1>Support Resources</h1>
        <p>
          We have curated a list of resources to help guide you through common issues. From troubleshooting guides to product manuals, 
          find everything you need below.
        </p>
        <ul>
          <li><a href="https://www.ifixit.com/">Troubleshooting Guides</a></li>
          <li><a href="https://www.usermanuals.tech/">Product Manuals</a></li>
          <li><a href="https://www.youtube.com/watch?v=nLsBAtVo_O8&list=PLsgvQK2KJKNyIlfaA9EsdAA93k6ujbh07">Instructional Videos</a></li>
        </ul>
      </section>
    </div>
    <Footer></Footer>
    </>
  );
};

export default CustomerSupportPage;
