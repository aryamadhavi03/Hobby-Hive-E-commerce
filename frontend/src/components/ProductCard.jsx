// src/components/ProductCard.js
import React from 'react';
import "./ProductCard.css"

const ProductCard = ({ product }) => {
  const handleAddToCart = () => {
    alert(`${product.title} added to cart!`);
  };

  const handleBuyNow = () => {
    alert(`Proceeding to buy ${product.title}!`);
  };

  return (
    <div className="card" style={{ width: '18rem', margin: '10px' }}>
      <img src={product.thumbnail} className="card-img-top" alt={product.title} />
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text">
          Price: ${product.price} <br />
          Discount: {product.discountPercentage}% <br />
          Rating: {product.rating} / 5
        </p>
        <div className="buttons">
          <button className="btn btn-primary" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button className="btn btn-success" onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
