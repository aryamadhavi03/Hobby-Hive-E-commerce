import React, { useState } from 'react';
import "./Outlets.css"
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const Outlets = () => {
    const [mapSrc, setMapSrc] = useState("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241256.85087786085!2d72.71076122643161!3d19.123517495601366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c7f02fdd817f%3A0xe8cb6e1010d2fb49!2sCulinary%20Craft%20%7C%20Best%20Cooking%20Classes%20in%20Mumbai!5e0!3m2!1sen!2sin!4v1728321758226!5m2!1sen!2sin");
    // const [address, setAddress] = useState("High School, Shop No. 1 & 2, Siddhachal Building No. 3 Phase 8, Pokharan Rd Number 2, opposite Vasant Vihar, Vasant Vihar, Thane West, Mumbai, Maharashtra 400610");
    const [mapTitle, setMapTitle] = useState("Powai");

      

    const stores = [
        {
          name: 'Culinary Craft',
          address: '247/248, Second Floor, Powai Plaza, Hiranandani Gardens, Sainath Nagar, Powai, Mumbai, Maharashtra 400076',
          phone: '18001231555',
          openUntil: '09:30 PM',
          mapLink: '#', // Link to the map location
          websiteLink: '#', // Link to the store's website
          shopLink: '#', // Link to the shop
          src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241256.85087786085!2d72.71076122643161!3d19.123517495601366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c7f02fdd817f%3A0xe8cb6e1010d2fb49!2sCulinary%20Craft%20%7C%20Best%20Cooking%20Classes%20in%20Mumbai!5e0!3m2!1sen!2sin!4v1728321758226!5m2!1sen!2sin",
          city: "Powai",
        },

        {
          name: 'The Oricra Art Studio',
          address: '13b4, sindhi colony, Rd Number 24, Sion West, Mumbai, Maharashtra 400022',
          phone: '18001231555',
          openUntil: '09:30 PM',
          mapLink: '#', // Link to the map location
          websiteLink: '#', // Link to the store's website
          shopLink: '#', // Link to the shop
          src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120687.88762950688!2d72.76460608926203!3d19.0418964523656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c948f112a235%3A0x495d733ffd6b949a!2sThe%20Oricra%20Art%20Studio!5e0!3m2!1sen!2sin!4v1728322223447!5m2!1sen!2sin",
          city: "Mumbai",    

        },
        {
          name: 'Emma Sports Academy',
          address: 'Plot no. 103, behind Hiranandani Hospital Road, Hariom Nagar, Ramabai Ambedkar Nagar, Powai, Mumbai, Maharashtra 400076',
          phone: '18001231555',
          openUntil: '09:30 PM',
          mapLink: '#', // Link to the map location
          websiteLink: '#', // Link to the store's website
          shopLink: '#', // Link to the shop
          src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121527.54269737074!2d72.76359816463003!3d19.041616112488704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c7260b287043%3A0xf09f4c77ca48b791!2sEmma%20Sports%20Academy!5e0!3m2!1sen!2sin!4v1728322431637!5m2!1sen!2sin",
          city: "Mumbai",
        },
        {
          name: 'Rhythm Music Hall',
          address: 'Road No 13, Chembur West, Tilak Nagar, Chembur, Mumbai, Maharashtra 400089',
          phone: '18001231555',
          openUntil: '09:30 PM',
          mapLink: '#', // Link to the map location
          websiteLink: '#', // Link to the store's website
          shopLink: '#', // Link to the shop
          src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15083.37661735893!2d72.8785546395508!3d19.07058850000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9dd42db3ead%3A0x13e9f186ed2b3e6e!2sRhythm%20Music%20Hall!5e0!3m2!1sen!2sin!4v1728386047837!5m2!1sen!2sin" ,
          city: "Chembur",
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
                <img src="/outlet_assets/bg_class.png" alt="" />
            </div>

            <h1>Our Collaborations</h1>
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
                            <h3>💈 Collaboration with Classes</h3>
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

           





            {/* <div className="ownoutlet">
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
            </div> */}
            {/* <Footer></Footer> */}
        </main>
    );
};

export default Outlets;
