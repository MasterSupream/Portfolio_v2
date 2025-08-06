'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { LiquidButton } from './ui/liquid-glass-button';
import { ThemeToggle } from './ThemeToggle';
import { NAV_ITEMS } from '@/lib/constants';
import { useActiveSection } from '@/hooks/useActiveSection';
import { motion, AnimatePresence } from 'framer-motion';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const activeSection = useActiveSection();

  // Handle scroll effect for navigation background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed header height
      const elementPosition = element.offsetTop - offset;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setIsOpen(false); // Close mobile menu after navigation
  };

  // Handle keyboard navigation for nav items
  const handleNavKeyDown = (event: React.KeyboardEvent, sectionId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      scrollToSection(sectionId);
    }
  };

  // Close mobile menu when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest('.mobile-menu') && !target.closest('.menu-button')) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        // Return focus to menu button
        const menuButton = document.querySelector('.menu-button') as HTMLElement;
        if (menuButton) {
          menuButton.focus();
        }
      }
      
      // Handle arrow key navigation in mobile menu
      if (isOpen && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
        event.preventDefault();
        const menuItems = Array.from(document.querySelectorAll('.mobile-menu button[tabindex="0"]')) as HTMLElement[];
        const currentIndex = menuItems.findIndex(item => item === document.activeElement);
        
        if (event.key === 'ArrowDown') {
          const nextIndex = currentIndex < menuItems.length - 1 ? currentIndex + 1 : 0;
          menuItems[nextIndex]?.focus();
        } else if (event.key === 'ArrowUp') {
          const prevIndex = currentIndex > 0 ? currentIndex - 1 : menuItems.length - 1;
          menuItems[prevIndex]?.focus();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Prevent body scroll when mobile menu is open and manage focus
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      // Focus the first menu item when mobile menu opens
      const firstMenuItem = document.querySelector('.mobile-menu button[tabindex="0"]') as HTMLElement;
      if (firstMenuItem) {
        setTimeout(() => firstMenuItem.focus(), 100);
      }
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800'
            : 'bg-transparent'
        }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex-shrink-0"
            >
              <button
                onClick={() => scrollToSection('hero')}
                onKeyDown={(e) => handleNavKeyDown(e, 'hero')}
                className="text-xl font-bold gradient-text hover:opacity-80 transition-opacity focus-visible"
                aria-label="Go to home section"
                tabIndex={0}
              >
                Anuvesh
              </button>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="hidden md:block"
            >
              <div className="ml-10 flex items-baseline space-x-4">
                {NAV_ITEMS.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    onClick={() => scrollToSection(item.id)}
                    onKeyDown={(e) => handleNavKeyDown(e, item.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 focus-visible ${
                      activeSection === item.id
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    aria-label={`Navigate to ${item.label} section`}
                    aria-current={activeSection === item.id ? 'page' : undefined}
                    tabIndex={0}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Desktop Theme Toggle */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="hidden md:block"
            >
              <ThemeToggle />
            </motion.div>

            {/* Mobile menu button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="md:hidden flex items-center space-x-2"
            >
              <ThemeToggle />
              <LiquidButton
                variant="outline"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="menu-button p-2"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </LiquidButton>
            </motion.div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="mobile-menu fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-900 shadow-xl z-50 md:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Mobile menu header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                  <span className="text-lg font-semibold gradient-text">Menu</span>
                  <LiquidButton
                    variant="outline"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="p-2"
                    aria-label="Close menu"
                  >
                    <X className="h-4 w-4" />
                  </LiquidButton>
                </div>

                {/* Mobile menu items */}
                <nav className="flex-1 px-4 py-6">
                  <div className="space-y-2">
                    {NAV_ITEMS.map((item, index) => (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.1 }}
                        onClick={() => scrollToSection(item.id)}
                        onKeyDown={(e) => handleNavKeyDown(e, item.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 focus-visible ${
                          activeSection === item.id
                            ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                            : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                        aria-label={`Navigate to ${item.label} section`}
                        aria-current={activeSection === item.id ? 'page' : undefined}
                        tabIndex={0}
                      >
                        {item.label}
                      </motion.button>
                    ))}
                  </div>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}