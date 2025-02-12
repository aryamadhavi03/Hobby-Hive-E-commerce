// Store.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import './Shop.css'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // To handle errors

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
  useEffect(() => {
    const fetchProducts = async (page = 1, accumulatedProducts = []) => {
      const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vaG9iYnloaXZlLmxvY2FsIiwiaWF0IjoxNzI4NDQ1NjE1LCJuYmYiOjE3Mjg0NDU2MTUsImV4cCI6MTcyOTA1MDQxNSwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.N664gbyP3YNQNQXgCS8pl_93JWmsDoFukzneEgnKIZk"; // Replace with the actual token received
  
      try {
        const response = await axios.get('http://hobbyhive.local/wp-json/wc/v3/products', {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          params: {
            per_page: 20, // Fetch 20 products per page
            page: page // Fetch products for the current page
          }
        });
  
        // Accumulate products across pages
        const newProducts = accumulatedProducts.concat(response.data);
        setProducts(newProducts);
  
        // If the current response contains products, fetch the next page
        if (response.data.length > 0) {
          fetchProducts(page + 1, newProducts);
        } else {
          setLoading(false); // Stop loading when there are no more products
        }
  
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
  
    // Initial call to fetch the first page of products
    fetchProducts();
  }, []);
  

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error fetching products: {error}</div>;
  }

  return (
    <>
    <Navbar handleLogout={handleLogout} />
    <div className="store-container">
      <h1>Store</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product">
            <h2>{product.name}</h2>
            <img src={product.images[0].src} alt={product.name} />
            <p>Price: {product.price}</p>
            <a href={product.permalink} target="_blank" rel="noopener noreferrer">
              View Product
            </a>
          </div>
        ))}
      </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default Shop;
