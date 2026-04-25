import React, { createContext, useContext, useState, ReactNode } from "react";

// Create the context
const DarkModeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => {},
});

// Custom hook to use the DarkModeContext
export const useDarkMode = () => useContext(DarkModeContext);

// The provider component that wraps your app or component tree
export const DarkModeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);

    // Toggle the "dark" class on the html element for Tailwind dark mode
    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
