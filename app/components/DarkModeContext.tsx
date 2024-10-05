import React, { createContext, useContext, useState, ReactNode } from "react";

// Create the context
const DarkModeContext = createContext({
  darkMode: true,
  toggleDarkMode: () => {},
});

// Custom hook to use the DarkModeContext
export const useDarkMode = () => useContext(DarkModeContext);

// The provider component that wraps your app or component tree
export const DarkModeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);

    // Toggle body color here
    if (darkMode) {
      document.body.classList.remove("bg-dark");
      document.body.classList.add("bg-light");
    } else {
      document.body.classList.remove("bg-light");
      document.body.classList.add("bg-dark");
    }
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
