import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme, isLoading } = useTheme();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const isDarkTheme = theme === 'dark';

  return (
    <div className="min-h-screen bg-background theme-transition">
      <Header />
      <Sidebar />
      
      <main className={`theme-transition ${
        isDarkTheme 
          ? 'ml-64 min-h-screen' 
          : 'pt-16 min-h-screen'
      }`}>
        <div className={`${
          theme === 'colorful' 
            ? 'p-8' 
            : isDarkTheme 
              ? 'p-6' 
              : 'p-6'
        }`}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;