import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isSparkyTheme, setIsSparkyTheme] = useState(false);

  const toggleTheme = () => {
    setIsSparkyTheme(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isSparkyTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};