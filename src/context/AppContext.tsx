import React, { createContext, useContext, useState, useEffect } from "react";

// shape of the AppContext, including favorites, cart, and theme management
interface AppContextProps {
  favorites: Record<number, boolean>;          
  toggleFavorite: (id: number) => void;         
  cart: Record<number, number>;                
  addToCart: (id: number) => void;            
  increaseQty: (id: number) => void;           
  decreaseQty: (id: number) => void;            
  removeFromCart: (id: number) => void;       
  theme: string;                            
  toggleTheme: () => void;                      
}

// Create the AppContext with a default value of undefined
const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Record<number, boolean>>(() =>
    JSON.parse(localStorage.getItem("favorites") || "{}")  
  );

  const [cart, setCart] = useState<Record<number, number>>(() =>
    JSON.parse(localStorage.getItem("cart") || "{}") 
  );

  const [theme, setTheme] = useState<string>(() => localStorage.getItem("theme") || "light");  

  // Persist favorites in localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Apply the theme to the body element and persist it in localStorage
  useEffect(() => {
    document.body.className = theme;  // Change the body class based on the current theme
    localStorage.setItem("theme", theme);  
  }, [theme]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const addToCart = (id: number) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const increaseQty = (id: number) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
  };

  const decreaseQty = (id: number) => {
    setCart(prev => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 1),  // Prevent quantity from going below 1
    }));
  };

  // Remove a product from the cart by deleting it from the cart state
  const removeFromCart = (id: number) => {
    setCart(prev => {
      const newCart = { ...prev };
      delete newCart[id];  
      return newCart;
    });
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <AppContext.Provider
      value={{
        favorites,
        toggleFavorite,
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart, 
        theme,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to access the AppContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};
