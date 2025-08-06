'use client';

import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { LiquidButton } from './ui/liquid-glass-button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <LiquidButton
        variant="outline"
        size="icon"
        aria-label="Toggle theme"
        className="relative"
      >
        <Sun className="h-4 w-4" />
        <span className="sr-only">Toggle theme</span>
      </LiquidButton>
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

  const getIcon = () => {
    if (theme === 'light') {
      return <Sun className="h-4 w-4" />;
    } else if (theme === 'dark') {
      return <Moon className="h-4 w-4" />;
    } else {
      // System theme - show based on current appearance
      return <Sun className="h-4 w-4 dark:hidden" />;
    }
  };

  const getLabel = () => {
    if (theme === 'light') return 'Switch to dark mode';
    if (theme === 'dark') return 'Switch to system theme';
    return 'Switch to light mode';
  };

  return (
    <LiquidButton
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label={getLabel()}
      className="relative"
    >
      {getIcon()}
      {theme === 'dark' && <Moon className="h-4 w-4 hidden dark:block" />}
      <span className="sr-only">{getLabel()}</span>
    </LiquidButton>
  );
}