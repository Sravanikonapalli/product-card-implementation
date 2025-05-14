import React from "react";
import { Product } from "../models/Product";
import { useAppContext } from "../context/AppContext";
import { FaHeart } from 'react-icons/fa/index.js';
import { FaRegHeart } from 'react-icons/fa/index.js';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  // Destructure necessary context values like favorites, cart, and functions
  const {
    favorites,       
    toggleFavorite, 
    cart,            
    addToCart,    
    increaseQty,     
    decreaseQty      
  } = useAppContext();

  // Get the current quantity of the product in the cart (defaults to 0 if not in cart)
  const quantity = cart[product.id] || 0;

  return (
    <div className="card">
        <img src={product.image} alt={product.title} />
        <h3>
        {product.title}
        <span onClick={() => toggleFavorite(product.id)} style={{ cursor: "pointer" }}>
            {favorites[product.id] ? <FaHeart color="red" /> : <FaRegHeart />}
        </span>
        </h3>
        <p>{product.description}</p>
        <strong>${product.price}</strong>
        
        <div className="actions">
            <button onClick={() => addToCart(product.id)}>Add to Cart</button>
            
            <div className="quantity">
            <button onClick={() => decreaseQty(product.id)}>-</button>
            <span>{quantity}</span>
            <button onClick={() => increaseQty(product.id)}>+</button>
            </div>
        </div>
    </div>
  );
};

export default ProductCard;
