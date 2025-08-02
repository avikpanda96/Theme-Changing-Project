import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Palette, Home, User, Mail } from 'lucide-react';

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const themeOptions = [
    { value: 'light', label: 'Theme 1 - Minimalist' },
    { value: 'dark', label: 'Theme 2 - Dark Sidebar' },
    { value: 'colorful', label: 'Theme 3 - Colorful Grid' },
  ];

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/about', label: 'About', icon: User },
    { path: '/contact', label: 'Contact', icon: Mail },
  ];

  const currentThemeLabel = themeOptions.find(opt => opt.value === theme)?.label || 'Select Theme';

  if (theme === 'dark') {
    return null; // Dark theme uses sidebar navigation
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border theme-transition">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center theme-transition group-hover:scale-110">
              <Palette className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl theme-transition">ThemeZone</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md theme-transition ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Theme Selector */}
          <div className="flex items-center space-x-4">
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger className="w-48 theme-transition">
                <SelectValue placeholder={currentThemeLabel} />
              </SelectTrigger>
              <SelectContent>
                {themeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden pb-4">
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex-1 flex flex-col items-center py-2 px-1 rounded-md theme-transition ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted text-muted-foreground'
                  }`}
                >
                  <Icon className="w-4 h-4 mb-1" />
                  <span className="text-xs">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;