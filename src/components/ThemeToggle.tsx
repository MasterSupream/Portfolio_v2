'use client';

import React from 'react';
import { Moon, Sun, Laptop } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { Button } from './ui/Button';
import { cn } from '@/lib/utils';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="relative h-9 w-20 rounded-full bg-gray-100 dark:bg-gray-800 p-1 shadow-inner">
        <div className="h-7 w-7 rounded-full bg-white shadow animate-pulse"></div>
        <span className="sr-only">Loading theme toggle</span>
      </div>
    );
  }

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const getThemeIcon = (themeType: 'light' | 'dark' | 'system') => {
    switch (themeType) {
      case 'light':
        return <Sun className="h-4 w-4" />;
      case 'dark':
        return <Moon className="h-4 w-4" />;
      case 'system':
        return <Laptop className="h-4 w-4" />;
    }
  };

  const getLabel = () => {
    if (theme === 'light') return 'Switch to dark mode';
    if (theme === 'dark') return 'Switch to system theme';
    return 'Switch to light mode';
  };

  const getPosition = () => {
    switch (theme) {
      case 'light': return 'translate-x-0';
      case 'dark': return 'translate-x-[calc(100%-2px)]';
      case 'system': return 'translate-x-[calc(200%-4px)]';
      default: return 'translate-x-0';
    }
  };

  return (
    <div 
      onClick={toggleTheme}
      className="relative h-9 w-20 rounded-full bg-gradient-to-r from-blue-100 via-purple-100 to-gray-100 dark:from-blue-900 dark:via-purple-900 dark:to-gray-900 p-1 cursor-pointer shadow-inner overflow-hidden transition-colors duration-300 hover:shadow-md hover:scale-105 transform transition-transform"
      role="button"
      aria-label={getLabel()}
    >
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer pointer-events-none" />
      
      {/* Background indicators */}
      <div className="absolute inset-0 flex justify-between items-center px-2 pointer-events-none">
        <Sun className={cn(
          "h-4 w-4 transition-all duration-300", 
          theme === 'light' 
            ? "text-yellow-500 scale-110 animate-pulse" 
            : "text-yellow-500/40"
        )} />
        <Moon className={cn(
          "h-4 w-4 transition-all duration-300", 
          theme === 'dark' 
            ? "text-blue-500 scale-110 animate-pulse" 
            : "text-blue-500/40"
        )} />
        <Laptop className={cn(
          "h-4 w-4 transition-all duration-300", 
          theme === 'system' 
            ? "text-gray-500 scale-110 animate-pulse" 
            : "text-gray-500/40"
        )} />
      </div>
      
      {/* Sliding indicator */}
      <div 
        className={cn(
          "h-7 w-7 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center transform transition-all duration-300 z-10",
          getPosition(),
          "hover:shadow-lg hover:scale-105"
        )}
      >
        <div className="animate-spin-slow">
          {getThemeIcon(theme)}
        </div>
      </div>
      
      <span className="sr-only">{getLabel()}</span>
    </div>
  );
}