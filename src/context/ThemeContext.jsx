import { createContext, useState, useContext, useEffect } from 'react';
import React from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  
  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.add(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
  };

  return React.createElement(
    ThemeContext.Provider,
    { value: { theme, toggleTheme } },
    children
  );
};

export const useTheme = () => useContext(ThemeContext);