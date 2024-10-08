// CommunityPage.js

import React from 'react';
import './community.css';
// import Qr from '../assets/images/qr.png';

const CommunityPage = () => {
  return (
   
    <div className="community-container">
      {/* Join Our Community Section */}
      <div className="community-header">
        <h1>Join Our Community</h1>
        <div className="community-grid">
          <div className="community-item">
            <img src="/images/Qr.png" alt="Sports" />
            <p>Sports</p>
          </div>
          <div className="community-item">
            <img src="/images/Qr.png" alt="Music" />
            <p>Music</p>
          </div>
          <div className="community-item">
            <img src="/images/Qr.png" alt="Cooking" />
            <p>Cooking</p>
          </div>
          <div className="community-item">
            <img src="/images/Qr.png" alt="Art" />
            <p>Art</p>
          </div>
        </div>
      </div>

      {/* Upcoming Events Section */}
      <div className="events-section">
        <h2>Upcoming Events and Competitions</h2>
        <div className="event-card">Event 1: Local Football Match - 10th Oct 2024
          <p>Contact: 1231467298</p>
          <p>Address:Mumbai Football Turf Sports Complex, Link Road, Near Andheri Sports Club, Andheri West, Mumbai, Maharashtra 400053, India</p>
        </div>
        <div className="event-card">Event 2: Painting Exhibition - 12th Oct 2024
        <p>Contact: 1231467298</p>
        <p>Address:Mumbai Art Gallery & Exhibition Center 2nd Floor, Kala Bhavan, Fort, Near Jehangir Art Gallery, M.G. Road, Mumbai, Maharashtra 400001, India</p>
        </div>
        <div className="event-card">Event 3: Italian Cuisine Masterclass - 20th Oct 2024
        <p>Contact: 1231467298</p>
        <p>Address:Cucina Italiana Cooking Studio Ground Floor, Gourmet Plaza, Opposite Infinity Mall, Lokhandwala, Andheri West, Mumbai, Maharashtra 400058, India</p>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
