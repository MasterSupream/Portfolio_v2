'use client';

import React, { useState, useEffect } from 'react';
import { Home, User, FolderOpen, Mail, Menu, X, Sun, Moon } from 'lucide-react';
import { ExpandableTabs } from './ui/expandable-tabs';
import { useTheme } from './ThemeProvider';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { motion, AnimatePresence } from 'framer-motion';

export function NewNavigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection();
  const { scrollTo } = useSmoothScroll();
  const { theme, setTheme } = useTheme();

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
    scrollTo(`#${sectionId}`, {
      offset: 80,
      duration: 1.2,
    });
    setIsMobileMenuOpen(false);
  };

  // Navigation tabs configuration
  const navigationTabs = [
    { title: "Home", icon: Home },
    { title: "About", icon: User },
    { title: "Projects", icon: FolderOpen },
    { title: "Contact", icon: Mail },
    { type: "separator" },
    { 
      title: theme === 'light' ? "Dark Mode" : theme === 'dark' ? "Light Mode" : "System Mode", 
      icon: theme === 'light' ? Moon : theme === 'dark' ? Sun : Sun 
    },
  ];

  // Handle tab selection
  const handleTabChange = (index: number | null) => {
    if (index !== null) {
      // Check if it's the theme toggle tab (index 5, after separator)
      if (index === 5) {
        // Toggle theme
        if (theme === 'light') {
          setTheme('dark');
        } else if (theme === 'dark') {
          setTheme('system');
        } else {
          setTheme('light');
        }
        return;
      }
      
      const sections = ['hero', 'about', 'projects', 'contact'];
      const sectionId = sections[index];
      scrollToSection(sectionId);
    }
  };

  // Mobile navigation items
  const mobileNavItems = [
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'contact', label: 'Contact', icon: Mail },
    { 
      id: 'theme', 
      label: theme === 'light' ? 'Dark Mode' : theme === 'dark' ? 'Light Mode' : 'System Mode', 
      icon: theme === 'light' ? Moon : theme === 'dark' ? Sun : Sun 
    },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700' 
            : 'bg-transparent'
        }`}
      >
                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex items-center justify-center h-16 relative">
 
             {/* Desktop Navigation Tabs - Centered */}
             <div className="hidden md:block">
               <ExpandableTabs
                 tabs={navigationTabs}
                 onChange={handleTabChange}
                 activeColor="text-blue-600 dark:text-blue-400"
                 className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-gray-200 dark:border-gray-700"
               />
             </div>

                         {/* Right side - Mobile menu button */}
             <div className="absolute right-4 flex items-center space-x-4">
               {/* Mobile menu button */}
               <button
                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                 className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                 aria-label="Toggle mobile menu"
               >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={24} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={24} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700"
          >
            <div className="px-4 py-4">
              <div className="flex flex-col space-y-2">
                                 {mobileNavItems.map((item) => (
                   <motion.button
                     key={item.id}
                     onClick={() => {
                       if (item.id === 'theme') {
                         // Toggle theme
                         if (theme === 'light') {
                           setTheme('dark');
                         } else if (theme === 'dark') {
                           setTheme('system');
                         } else {
                           setTheme('light');
                         }
                         setIsMobileMenuOpen(false);
                       } else {
                         scrollToSection(item.id);
                       }
                     }}
                     className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                       item.id === 'theme' 
                         ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                         : activeSection === item.id
                         ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                         : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                     }`}
                     whileHover={{ x: 4 }}
                     whileTap={{ scale: 0.98 }}
                   >
                     <item.icon size={20} />
                     <span className="font-medium">{item.label}</span>
                   </motion.button>
                 ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop for mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
} 