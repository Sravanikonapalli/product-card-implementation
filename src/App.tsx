import React, { useState } from "react";
import { useProducts } from "./hooks/useProducts";
import ProductCard from "./components/ProductCard"; 
import ThemeToggle from "./components/ThemeToggle"; 
import { AppProvider, useAppContext } from "./context/AppContext"; 
import "./styles/styles.css"; 
import { FaShoppingCart } from 'react-icons/fa/index.js';

const CartHeader = () => {
  const { cart, removeFromCart } = useAppContext();
  const [showCart, setShowCart] = useState(false); 
  const { data: products } = useProducts();
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0); 

  const toggleCart = () => {
    setShowCart(!showCart); 
  };

  // Get product name by id (from products data)
  const getProductName = (id: number): string => {
    const product = products?.find((p) => p.id === id); 
    return product?.title || `Product ${id}`; 
  };

  return (
    <div className="cart-header">
      <button className="cart-button" onClick={toggleCart}>
        <FaShoppingCart size={20} />
        <span className="cart-count">{totalItems}</span> 
      </button>
      {showCart && (
        <div className="cart-dropdown">
          <h3>Your Cart</h3>
          {totalItems === 0 ? (
            <p>No items in cart.</p> // Message if no items are in the cart
          ) : (
            <ul>
              {Object.entries(cart).map(([id, qty]) => (
                <li key={id} className="cart-item">
                  <div>
                    <strong>{getProductName(parseInt(id))}</strong> - Qty: {qty}
                  </div>
                  <button
                    onClick={() => removeFromCart(parseInt(id))} // Remove item from cart when clicked
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

const MainApp = () => {
  const { data: products, isLoading, isError, error } = useProducts(); 

  return (
    <div className="app">
      <ThemeToggle />
      <CartHeader />
      <h1>Product List</h1>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error: {error.message}</div>}
      <div className="product-grid">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} /> 
        ))}
      </div>
    </div>
  );
};

// Main App wrapped in AppProvider to access context
const App = () => (
  <AppProvider>
    <MainApp />
  </AppProvider>
);

export default App;
