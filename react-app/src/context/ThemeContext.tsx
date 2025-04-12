import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Definicja typów motywów
export type ThemeType = 'light' | 'dark' | 'blue' | 'green' | 'purple';

interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  success: string;
  warning: string;
  info: string;
}

interface ThemeContextType {
  currentTheme: ThemeType;
  themeColors: ThemeColors;
  changeTheme: (theme: ThemeType) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

// Definicja kolorów dla różnych motywów
const themeColorSchemes: Record<ThemeType, ThemeColors> = {
  light: {
    primary: '#3f51b5',
    secondary: '#f50057',
    background: '#f5f5f5',
    surface: '#ffffff',
    text: '#212121',
    textSecondary: '#757575',
    border: '#e0e0e0',
    error: '#f44336',
    success: '#4caf50',
    warning: '#ff9800',
    info: '#2196f3'
  },
  dark: {
    primary: '#7986cb',
    secondary: '#ff4081',
    background: '#121212',
    surface: '#1e1e1e',
    text: '#ffffff',
    textSecondary: '#b0b0b0',
    border: '#333333',
    error: '#f44336',
    success: '#4caf50',
    warning: '#ff9800',
    info: '#2196f3'
  },
  blue: {
    primary: '#1976d2',
    secondary: '#ff4081',
    background: '#e3f2fd',
    surface: '#ffffff',
    text: '#212121',
    textSecondary: '#757575',
    border: '#bbdefb',
    error: '#f44336',
    success: '#4caf50',
    warning: '#ff9800',
    info: '#2196f3'
  },
  green: {
    primary: '#388e3c',
    secondary: '#f50057',
    background: '#e8f5e9',
    surface: '#ffffff',
    text: '#212121',
    textSecondary: '#757575',
    border: '#c8e6c9',
    error: '#f44336',
    success: '#4caf50',
    warning: '#ff9800',
    info: '#2196f3'
  },
  purple: {
    primary: '#7b1fa2',
    secondary: '#ff4081',
    background: '#f3e5f5',
    surface: '#ffffff',
    text: '#212121',
    textSecondary: '#757575',
    border: '#e1bee7',
    error: '#f44336',
    success: '#4caf50',
    warning: '#ff9800',
    info: '#2196f3'
  }
};

// Utworzenie kontekstu motywu
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Hook do używania kontekstu motywu
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

// Provider kontekstu motywu
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Pobieranie zapisanego motywu z localStorage
  const getSavedTheme = (): ThemeType => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme as ThemeType) || 'light';
  };

  const [currentTheme, setCurrentTheme] = useState<ThemeType>(getSavedTheme());
  const [isDarkMode, setIsDarkMode] = useState<boolean>(currentTheme === 'dark');

  // Efekt do aktualizacji zmiennych CSS przy zmianie motywu
  useEffect(() => {
    const colors = themeColorSchemes[currentTheme];
    const root = document.documentElement;

    // Ustawienie zmiennych CSS
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    // Zapisanie motywu w localStorage
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  // Funkcja do zmiany motywu
  const changeTheme = (theme: ThemeType) => {
    setCurrentTheme(theme);
    setIsDarkMode(theme === 'dark');
  };

  // Funkcja do przełączania między trybem jasnym i ciemnym
  const toggleDarkMode = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    changeTheme(newTheme);
  };

  const value: ThemeContextType = {
    currentTheme,
    themeColors: themeColorSchemes[currentTheme],
    changeTheme,
    isDarkMode,
    toggleDarkMode
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export default ThemeContext;
