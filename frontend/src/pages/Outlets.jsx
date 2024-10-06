import React, { useState } from 'react';
import "./Outlets.css"
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const Outlets = () => {
    const [mapSrc, setMapSrc] = useState("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120556.01377007818!2d72.85082642655325!3d19.22246313631774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b9666160a75b%3A0x105a5333c2a95751!2sLakme%20Salon!5e0!3m2!1sen!2sin!4v1722692297203!5m2!1sen!2sin");
    const [address, setAddress] = useState("High School, Shop No. 1 & 2, Siddhachal Building No. 3 Phase 8, Pokharan Rd Number 2, opposite Vasant Vihar, Vasant Vihar, Thane West, Mumbai, Maharashtra 400610");
    const [mapTitle, setMapTitle] = useState("Thane");

      

    const stores = [
        {
          name: 'Viviana Mall',
          address: 'High School, Shop No. 1 & 2, Siddhachal Building No. 3 Phase 8,Vasant Vihar, Thane West, Mumbai,400610',
          phone: '18001231555',
          openUntil: '09:30 PM',
          mapLink: '#', // Link to the map location
          websiteLink: '#', // Link to the store's website
          shopLink: '#', // Link to the shop
          src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120556.01377007818!2d72.85082642655325!3d19.22246313631774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b9666160a75b%3A0x105a5333c2a95751!2sLakme%20Salon!5e0!3m2!1sen!2sin!4v1722692297203!5m2!1sen!2sin",
          city: "Thane",
        },

        {
          name: 'Mumbai Mall',
          address: 'No A28/1, Inorbit Mall, Block No 1406, Link Road, Malad West, Mumbai - 400064',
          phone: '18001231555',
          openUntil: '09:30 PM',
          mapLink: '#', // Link to the map location
          websiteLink: '#', // Link to the store's website
          shopLink: '#', // Link to the shop
          src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d148524.3640880721!2d72.7538906570983!3d19.108643498659866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9b51222092f%3A0x89cb958615e528e9!2sLakme%20Salon!5e0!3m2!1sen!2sin!4v1722692367401!5m2!1sen!2sin",
          city: "Mumbai",    

        },
        {
          name: 'Kalyan Mall',
          address: 'No A28/1, Inorbit Mall, Block No 1406, Link Road, Malad West, Mumbai - 400064',
          phone: '18001231555',
          openUntil: '09:30 PM',
          mapLink: '#', // Link to the map location
          websiteLink: '#', // Link to the store's website
          shopLink: '#', // Link to the shop
          src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d220273.46615733232!2d72.85684923548233!3d19.173933744560237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be79517705f74a9%3A0x1b772e028156ba4a!2sLakme%20Salon!5e0!3m2!1sen!2sin!4v1722692426326!5m2!1sen!2sin",
          city: "Kalyan",
        },
        {
          name: 'Hill Road Bandra',
          address: '101, C/5, First floor, Libra towers,,Opp. St. Peters Church, Hill Road,Mumbai,400050 Phone Number: 8655680153,2226430417',
          phone: '18001231555',
          openUntil: '09:30 PM',
          mapLink: '#', // Link to the map location
          websiteLink: '#', // Link to the store's website
          shopLink: '#', // Link to the shop
          scr: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3771.1948228468655!2d72.82737707520485!3d19.055169982145063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTnCsDAzJzE4LjYiTiA3MsKwNDknNDcuOCJF!5e0!3m2!1sen!2sin!4v1726225758301!5m2!1sen!2sin",
          city: "Mumbai",    
        },
        {
          name: 'Shivaji Park',
          address: 'Shop No.3,Shiv Kutir,,Mumbai,400028',
          phone: '8097433945',
          openUntil: '09:30 PM',
          mapLink: '#', // Link to the map location
          websiteLink: '#', // Link to the store's website
          shopLink: '#', // Link to the shop
          scr: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3771.822476668948!2d72.83594097520414!3d19.027542682167073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTnCsDAxJzM5LjIiTiA3MsKwNTAnMTguNyJF!5e0!3m2!1sen!2sin!4v1726225969806!5m2!1sen!2sin",
          city: "Mumbai",
        },
        // Add more stores here if needed
        
      ];

   

    
      const handleLocationClick = (index, event) => {
        event.preventDefault(); // Prevents default anchor behavior
        setMapSrc(stores[index].src); // Updates the map source
        setMapTitle(stores[index].city); // Updates the map title
        console.log(mapSrc)
    };
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
        <main>
               <Navbar handleLogout={handleLogout} />
            <div className="topimg">
                <img src="/outlet_assets/bg_outlet.png" alt="" />
            </div>

            <h1>Our Available Outlets</h1>
            <div className="outletmap">
                <div className="map">
                    <div className="mapT"><h2>{mapTitle}</h2></div>
                    <iframe
                        src={mapSrc}
                        width="600"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Outlet Map"
                    ></iframe>
                    {/* <div className="list">
                        <ul>
                            {locations.map((location, index) => (
                                <li key={index} onClick={() => handleLocationClick(index)}>{location.city}</li>
                            ))}
                        </ul>
                    </div> */}
                    
                </div>
                {/* <div className="address">
                    <strong>ADDRESS</strong>: {address}
                </div> */}
                <div className="stores-list">
                    {stores.map((store, index) => (
                        <div key={index} className="store-card">
                        <div className="store-header">
                            <h3>💈 Salon Stores</h3>
                        </div>
                        <div className="store-info">
                            <h4>{store.name}</h4>
                            <p>📍 {store.address}</p>
                            <p>📞 {store.phone}</p>
                            <p>🕒 Open until {store.openUntil}</p>
                        </div>
                        <div className="store-actions">
                            <button onClick={(event) => handleLocationClick(index, event)} className="btn map-btn">Map</button>
                            <a href={store.websiteLink} className="btn website-btn">Website</a>
                            <a href={store.shopLink} className="btn shop-btn">Shop Now</a>
                        </div>
                        </div>
                    ))}
                </div>


            </div>

           





            <div className="ownoutlet">
                <div className="text">
                    <h1>Wanna own an outlet?</h1>
                    Checkout here
                </div>

                <div className="ownoutlet1">
                    <div className="container">
                        <div className="img1">
                            <img src="/outlet_assets/outletown.jpg" alt="" />
                        </div>
                        <div className="forms">
                            <div className="entry1">
                                Email:<input type="email" />
                            </div>
                            <div className="entry1">
                                Mobile number:<input type="tel" id="mobile" name="mobile" pattern="[0-9]{10}" required />
                            </div>
                            <div className="sumitt">
                                <input type="submit" value="Submit" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </main>
    );
};

export default Outlets;
