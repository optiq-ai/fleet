import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * @typedef {'light' | 'dark' | 'blue' | 'green' | 'purple'} ThemeType
 */

/**
 * @typedef {Object} ThemeContextType
 * @property {ThemeType} theme - Current theme
 * @property {boolean} isDarkMode - Whether dark mode is enabled
 * @property {function} setTheme - Function to set theme
 * @property {function} toggleDarkMode - Function to toggle dark mode
 * @property {number} fontSize - Font size in pixels
 * @property {function} setFontSize - Function to set font size
 * @property {boolean} highContrast - Whether high contrast mode is enabled
 * @property {function} setHighContrast - Function to set high contrast mode
 * @property {boolean} reducedMotion - Whether reduced motion is enabled
 * @property {function} setReducedMotion - Function to set reduced motion
 */

const ThemeContext = createContext(undefined);

/**
 * Theme provider component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} ThemeProvider component
 */
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem('isDarkMode');
    return savedDarkMode ? JSON.parse(savedDarkMode) : false;
  });
  
  const [fontSize, setFontSize] = useState(() => {
    const savedFontSize = localStorage.getItem('fontSize');
    return savedFontSize ? parseInt(savedFontSize) : 16;
  });
  
  const [highContrast, setHighContrast] = useState(() => {
    const savedHighContrast = localStorage.getItem('highContrast');
    return savedHighContrast ? JSON.parse(savedHighContrast) : false;
  });
  
  const [reducedMotion, setReducedMotion] = useState(() => {
    const savedReducedMotion = localStorage.getItem('reducedMotion');
    return savedReducedMotion ? JSON.parse(savedReducedMotion) : false;
  });
  
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };
  
  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('theme', theme);
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
    localStorage.setItem('fontSize', fontSize.toString());
    localStorage.setItem('highContrast', JSON.stringify(highContrast));
    localStorage.setItem('reducedMotion', JSON.stringify(reducedMotion));
    
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-dark-mode', isDarkMode.toString());
    document.documentElement.style.fontSize = `${fontSize}px`;
    
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    
    if (reducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
  }, [theme, isDarkMode, fontSize, highContrast, reducedMotion]);
  
  return (
    <ThemeContext.Provider value={{
      theme,
      isDarkMode,
      setTheme,
      toggleDarkMode,
      fontSize,
      setFontSize,
      highContrast,
      setHighContrast,
      reducedMotion,
      setReducedMotion
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Custom hook to use theme context
 * @returns {ThemeContextType} Theme context
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
