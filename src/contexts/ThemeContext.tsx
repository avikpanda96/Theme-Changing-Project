import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'colorful';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('light');
  const [isLoading, setIsLoading] = useState(true);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme') as Theme;
    if (savedTheme && ['light', 'dark', 'colorful'].includes(savedTheme)) {
      setThemeState(savedTheme);
    }
    setIsLoading(false);
  }, []);

  // Apply theme to document body and save to localStorage
  useEffect(() => {
    if (!isLoading) {
      const body = document.body;
      
      // Remove all theme classes
      body.classList.remove('theme-dark', 'theme-colorful');
      
      // Add appropriate theme class
      if (theme === 'dark') {
        body.classList.add('theme-dark');
      } else if (theme === 'colorful') {
        body.classList.add('theme-colorful');
      }
      
      // Save to localStorage
      localStorage.setItem('app-theme', theme);
    }
  }, [theme, isLoading]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const value = {
    theme,
    setTheme,
    isLoading,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};