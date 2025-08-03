'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
        duration: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 pb-8"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating geometric shapes - hidden on mobile for performance */}
        <motion.div
          className="hidden sm:block absolute top-20 left-10 w-16 h-16 lg:w-20 lg:h-20 bg-blue-200 dark:bg-blue-800 rounded-full opacity-20"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="hidden md:block absolute top-40 right-20 w-12 h-12 lg:w-16 lg:h-16 bg-purple-200 dark:bg-purple-800 rounded-lg opacity-20 rotate-45"
          animate={{
            y: [0, 15, 0],
            rotate: [45, 90, 45],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="hidden sm:block absolute bottom-40 left-20 w-10 h-10 lg:w-12 lg:h-12 bg-indigo-200 dark:bg-indigo-800 rounded-full opacity-20"
          animate={{
            y: [0, -25, 0],
            x: [0, -15, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="hidden lg:block absolute bottom-20 right-10 w-20 h-20 lg:w-24 lg:h-24 bg-pink-200 dark:bg-pink-800 opacity-10"
          style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
          animate={{
            y: [0, 20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />
        </div>
      </div>
      
      {/* Content */}
      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-5xl mx-auto">
          {/* Main heading with enhanced name display */}
          <motion.div
            className="mb-6 md:mb-8"
            variants={itemVariants}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Greeting text */}
            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-2 md:mb-4 font-medium"
              variants={itemVariants}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            >
              Hello, I&apos;m
            </motion.p>
            
            {/* Large name display */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-2 md:mb-4 px-4 leading-tight"
              variants={itemVariants}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <span className="relative inline-block">
                <motion.span 
                  className="hero-name-gradient block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  Anuvesh Chilwal
                </motion.span>
                
                {/* Animated underline */}
                <motion.div
                  className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 1, ease: "easeOut" }}
                />
                
                {/* Subtle glow effect */}
                <motion.div
                  className="absolute inset-0 hero-name-gradient blur-lg opacity-20 -z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.2 }}
                  transition={{ duration: 1.5, delay: 1.5 }}
                >
                  Anuvesh Chilwal
                </motion.div>
                
                {/* Floating particles around name */}
                <motion.div
                  className="absolute -top-4 -left-4 w-2 h-2 bg-blue-400 rounded-full opacity-60"
                  animate={{
                    y: [-10, 10, -10],
                    x: [-5, 5, -5],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: 2,
                  }}
                />
                <motion.div
                  className="absolute -top-2 -right-6 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-60"
                  animate={{
                    y: [10, -10, 10],
                    x: [5, -5, 5],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: 2.5,
                  }}
                />
                <motion.div
                  className="absolute -bottom-6 left-1/2 w-1 h-1 bg-indigo-400 rounded-full opacity-60"
                  animate={{
                    y: [5, -15, 5],
                    x: [-10, 10, -10],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    delay: 3,
                  }}
                />
              </span>
            </motion.h1>

            {/* Decorative elements around name */}
            <div className="relative flex justify-center items-center mb-4">
              <motion.div
                className="absolute -left-8 sm:-left-12 md:-left-16 w-8 sm:w-12 md:w-16 h-0.5 bg-gradient-to-r from-transparent to-blue-500"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              />
              <motion.div
                className="w-2 h-2 bg-blue-500 rounded-full mx-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 1.4 }}
              />
              <motion.div
                className="absolute -right-8 sm:-right-12 md:-right-16 w-8 sm:w-12 md:w-16 h-0.5 bg-gradient-to-l from-transparent to-purple-500"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              />
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.h2
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-gray-700 dark:text-gray-300 mb-4 md:mb-6 px-4"
            variants={itemVariants}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          >
            <span className="relative">
              Full Stack Developer
              {/* Subtle highlight effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 -z-10 rounded-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.6 }}
              />
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 md:mb-12 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4"
            variants={itemVariants}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          >
            A passionate student exploring AI/ML, web development, and everything software. 
            Driven by curiosity and a deep interest in technology, I create innovative solutions 
            to unlock potential and help others through code.
          </motion.p>

          {/* Call-to-action buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-12 md:mb-16 px-4"
            variants={itemVariants}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
          >
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => scrollToSection('projects')}
              className="w-full sm:w-auto min-w-[160px] group"
            >
              <span className="mr-2">View My Work</span>
              <motion.span
                className="inline-block"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                →
              </motion.span>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => scrollToSection('contact')}
              className="w-full sm:w-auto min-w-[160px] group"
            >
              <span className="mr-2">Contact Me</span>
              <motion.span
                className="inline-block"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                ✉
              </motion.span>
            </Button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="flex flex-col items-center"
            variants={itemVariants}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1.0 }}
          >
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Scroll to explore
            </p>
            <motion.button
              onClick={() => scrollToSection('about')}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              animate={{ y: [0, 10, 0] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronDown className="w-6 h-6 text-gray-400" />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;