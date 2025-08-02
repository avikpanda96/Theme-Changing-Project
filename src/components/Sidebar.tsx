import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Palette, Home, User, Mail, Menu } from 'lucide-react';
import { useState } from 'react';

const Sidebar: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const themeOptions = [
    { value: 'light', label: 'Minimalist' },
    { value: 'dark', label: 'Dark Sidebar' },
    { value: 'colorful', label: 'Colorful Grid' },
  ];

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/about', label: 'About', icon: User },
    { path: '/contact', label: 'Contact', icon: Mail },
  ];

  if (theme !== 'dark') {
    return null; // Only show sidebar in dark theme
  }

  return (
    <aside className={`fixed left-0 top-0 h-full bg-sidebar border-r border-sidebar-border z-50 theme-transition ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
                  <Palette className="w-4 h-4 text-sidebar-primary-foreground" />
                </div>
                <span className="font-bold text-lg text-sidebar-foreground">ThemeZone</span>
              </Link>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-md hover:bg-sidebar-accent text-sidebar-foreground theme-transition"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md theme-transition ${
                    isActive
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                      : 'hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground'
                  }`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && <span className="font-medium">{item.label}</span>}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Theme Selector */}
        {!isCollapsed && (
          <div className="p-4 border-t border-sidebar-border">
            <label className="block text-sm font-medium text-sidebar-foreground mb-2">
              Switch Theme
            </label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger className="w-full bg-sidebar-accent text-sidebar-accent-foreground">
                <SelectValue />
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
        )}
      </div>
    </aside>
  );
};

export default Sidebar;