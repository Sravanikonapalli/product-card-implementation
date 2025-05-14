import React from "react";
import { useAppContext } from "../context/AppContext";  // Import the context hook to access the theme

const ThemeToggle: React.FC = () => {
  // Destructure `theme` and `toggleTheme` from the AppContext
  const { theme, toggleTheme } = useAppContext();

  return (
    <button onClick={toggleTheme} className="theme-toggle">
      {theme === "light" ? "🌙" : "🌞"}
    </button>
  );
};

export default ThemeToggle;
