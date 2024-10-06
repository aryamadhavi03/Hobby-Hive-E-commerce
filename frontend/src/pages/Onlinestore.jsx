// src/Onlinestore.jsx
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import './Onlinestore.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
function OnlineStore() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from API
    fetch('https://dummyjson.com/products')
      .then(response => response.json())
      .then(data => setProducts(data.products))
      .catch(error => console.error('Error fetching products:', error));
  }, []);
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
    <div className="OnlineStore">
    <Navbar handleLogout={handleLogout} />
      <header>
        <h1>Online Store</h1>
      </header>

      {/* Product Cards */}
      <div className="product-grid">
        {products.length > 0 ? (
          products.map(product => <ProductCard key={product.id} product={product} />)
        ) : (
          <p>Loading products...</p>
        )}
      </div>

      {/* Footer Component */}
      <Footer/>
    </div>
  );
}

export default OnlineStore;
