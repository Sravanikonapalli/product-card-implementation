# E-Commerce Application

This is an e-commerce application built with **React**, **React Query**, and **React Context**. Users can browse products, add them to a shopping cart, toggle between light and dark themes, and manage cart items (including adding/removing items and adjusting quantities). Cart and favorite items are persisted in local storage.

---

## Features

- **Product List:** Displays products fetched from [Fake Store API](https://fakestoreapi.com/products).
- **Shopping Cart:** Add/remove products, adjust quantities, and view total items.
- **Favorites:** Toggle product favorites and persist them in local storage.
- **Theme Toggle:** Switch between light and dark themes.
- **Persisted State:** Cart and favorites are saved in local storage for session persistence.

---

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/Sravanikonapalli/product-card-implementation.git
    ```
2. **Navigate into the project directory:**
    ```bash
    cd product-card-implementation
    ```
3. **Install dependencies:**
    ```bash
    npm install
    ```
4. **Start the development server:**
    ```bash
    npm start
    ```
    The app will open in the browser at [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
/src
├── components/
│   ├── ProductCard.tsx      # Component to display individual product details and add-to-cart button
│   └── ThemeToggle.tsx      # Component for toggling light/dark themes
│
├── context/
│   └── AppContext.tsx       # React Context for managing global state (cart, favorites, theme)
│
├── hooks/
│   └── useProducts.ts       # Custom hook using React Query to fetch product data from API
│
├── models/
│   └── Product.ts           # TypeScript interface/model definition for product data
│
├── styles/
│   └── styles.css           # Global CSS styles (layout, colors, spacing, etc.)
│
├── App.tsx                  # Main application component combining UI pieces
├── index.tsx                # Entry point for React, renders <App /> into the DOM

```
-----
### Key Files

- **App.tsx:** Assembles the main UI, including theme toggle, cart header, and product list.
- **AppContext.tsx:** Manages global state for cart, favorites, and theme using React Context.
- **useProducts.ts:** Custom hook for fetching and caching product data.
- **ProductCard.tsx:** Displays each product as a card with cart and favorite actions.
- **ThemeToggle.tsx:** Button to switch between light and dark themes.

---

### Challenges Faced
# Persistent State:

- One of the challenges was ensuring that the cart and favorites persisted between page reloads. This was achieved using local storage to store the cart and favorites data. Every time the cart or favorites change, the state is saved to local storage, and on initialization, the data is fetched from it.

# State Management:

- Managing the global state (cart, favorites, and theme) using React Context was challenging as it required a clear understanding of how to share the state across multiple components. To address this, I wrapped the entire app in the AppProvider component, which allows all child components to access the shared state via the useAppContext hook.

# Performance:

- Fetching the product list using React Query was an important aspect for performance optimization, as it automatically handles caching, refetching, and updating the UI based on the API state. This ensures that the app remains responsive and doesn't re-fetch the data unnecessarily.

# Cart Functionality:

- The ability to add/remove products from the cart and update the quantities posed a challenge, especially in managing the cart's state (i.e., the quantities). I implemented helper functions for adding to the cart, increasing/decreasing quantities, and removing items, ensuring the cart data is updated efficiently.

----
### Trade-offs Made
# Persisting State in Local Storage:

- **Trade-off:** Local storage is easy to implement, but it has size limitations and is not secure. It may also lead to stale data if not handled carefully.

- **Why:** Local storage was chosen because it was simple and persistent across sessions, which was the requirement for this app. For a larger or more sensitive app, a more robust state management solution (e.g., backend persistence or session storage) would be needed.

# Using React Context for Global State:

- **Trade-off:** React Context is not the best solution for large-scale applications with complex state, as it may lead to unnecessary re-renders.

- **Why:** React Context was used here because the app is relatively small and does not involve complex state logic. For larger applications, state management solutions like Redux or Zustand might be more appropriate.

# External API (Fake Store API):

- **Trade-off:** Using an external API (Fake Store API) means we rely on a third-party service, which may change or become unavailable.

- **Why:** This was a trade-off to avoid building a backend and keep the project lightweight. In a production environment, this would typically be replaced with a dedicated backend service.

---

## Conclusion

This e-commerce app demonstrates cart management, theme toggling, and state persistence using React. While local storage and React Context are suitable for small to medium apps, larger projects may require more robust solutions.

**Future improvements:**
- Backend storage for persistent user data
- Enhanced error handling
- Improved accessibility

--------

### Live demo
- [live demo](https://product-card-implementation.vercel.app/)
