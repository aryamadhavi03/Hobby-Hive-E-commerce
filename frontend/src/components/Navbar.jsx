import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ handleLogout }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setLoggedInUser(storedUser); // Set loggedInUser if available in local storage
    }
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown); // Toggle dropdown visibility
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <NavLink to="/home">
          <img src="/images/logo.png" alt="Logo" />
        </NavLink>
      </div>
      <ul className="navbar-links">
        <li>
          <NavLink exact to="/home" activeclassname="active">
            <img src="/images/home.svg" alt="Home" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/cutomersupport" activeclassname="active">
            <img src="/images/customer.svg" alt="Services" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/shop" activeclassname="active">
            <img src="/images/cart.svg" alt="Appointment" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/communitypage" activeclassname="active">
            <img src="/images/mega.svg" alt="Store" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/location" activeclassname="active">
            <img src="/images/location.svg" alt="Outlets" />
          </NavLink>
        </li>

        {/* Conditionally render dropdown for logged-in user */}
        {loggedInUser ? (
          <li className="dropdown">
            <button onClick={toggleDropdown} className="dropdown-button">
              {loggedInUser} <span className="dropdown-arrow">▼</span>
            </button>
            {showDropdown && (
              <div className="dropdown-menu">
                <NavLink to="#" activeclassname="active" onClick={handleLogout}>Logout</NavLink>
              </div>
            )}
          </li>
        ) : (
          <li><NavLink to="/login" activeclassname="active">LOGIN</NavLink></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
