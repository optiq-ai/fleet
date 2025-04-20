import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * @typedef {Object} ThemeContextType
 * @property {string} currentTheme - Current theme ID ('light', 'dark', 'blue', 'green')
 * @property {function} setTheme - Function to set current theme
 * @property {Object} themeColors - Current theme color values
 * @property {boolean} isLoading - Whether theme is loading
 */

// Define theme colors for each theme
const themeDefinitions = {
  light: {
    primary: '#3f51b5',
    secondary: '#f50057',
    background: '#ffffff',
    surface: '#f5f5f5',
    text: '#333333',
    textSecondary: '#666666',
    border: '#e0e0e0',
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
    info: '#2196f3',
    sidebar: '#ffffff',
    sidebarText: '#333333',
    header: '#ffffff',
    headerText: '#333333',
    card: '#ffffff',
    cardBorder: '#e0e0e0',
    hover: '#f0f0f0'
  },
  dark: {
    primary: '#7986cb',
    secondary: '#ff4081',
    background: '#121212',
    surface: '#1e1e1e',
    text: '#ffffff',
    textSecondary: '#b0b0b0',
    border: '#333333',
    success: '#81c784',
    warning: '#ffb74d',
    error: '#e57373',
    info: '#64b5f6',
    sidebar: '#1e1e1e',
    sidebarText: '#ffffff',
    header: '#1e1e1e',
    headerText: '#ffffff',
    card: '#2d2d2d',
    cardBorder: '#333333',
    hover: '#333333'
  },
  blue: {
    primary: '#1976d2',
    secondary: '#dc004e',
    background: '#f5f8fa',
    surface: '#ffffff',
    text: '#333333',
    textSecondary: '#666666',
    border: '#e1e8ed',
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
    info: '#03a9f4',
    sidebar: '#1976d2',
    sidebarText: '#ffffff',
    header: '#1976d2',
    headerText: '#ffffff',
    card: '#ffffff',
    cardBorder: '#e1e8ed',
    hover: '#e3f2fd'
  },
  green: {
    primary: '#2e7d32',
    secondary: '#c2185b',
    background: '#f1f8e9',
    surface: '#ffffff',
    text: '#33691e',
    textSecondary: '#558b2f',
    border: '#dcedc8',
    success: '#388e3c',
    warning: '#f57f17',
    error: '#d32f2f',
    info: '#0288d1',
    sidebar: '#2e7d32',
    sidebarText: '#ffffff',
    header: '#2e7d32',
    headerText: '#ffffff',
    card: '#ffffff',
    cardBorder: '#dcedc8',
    hover: '#e8f5e9'
  }
};

// Create context with default value
export const ThemeContext = createContext(undefined);

/**
 * Theme provider component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} ThemeProvider component
 */
export const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or default to 'light'
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });
  
  const [isLoading, setIsLoading] = useState(true);
  
  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('theme', currentTheme);
    
    // Apply theme to root element
    applyThemeToDocument(currentTheme);
    
    setIsLoading(false);
  }, [currentTheme]);
  
  /**
   * Apply theme colors to document root as CSS variables
   * @param {string} themeId - Theme ID to apply
   */
  const applyThemeToDocument = (themeId) => {
    const theme = themeDefinitions[themeId] || themeDefinitions.light;
    const root = document.documentElement;
    
    // Set CSS variables for each theme color
    Object.entries(theme).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
    
    // Add theme class to body
    document.body.className = `theme-${themeId}`;
  };
  
  /**
   * Set current theme
   * @param {string} themeId - Theme ID to set
   */
  const setTheme = (themeId) => {
    if (themeDefinitions[themeId]) {
      setCurrentTheme(themeId);
    } else {
      console.error(`Theme "${themeId}" not found, using default`);
      setCurrentTheme('light');
    }
  };
  
  // Get current theme colors
  const themeColors = themeDefinitions[currentTheme] || themeDefinitions.light;
  
  return (
    <ThemeContext.Provider value={{
      currentTheme,
      setTheme,
      themeColors,
      isLoading
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

// Also export as default for backward compatibility
export default ThemeContext;
