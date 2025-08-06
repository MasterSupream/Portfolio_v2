'use client';

import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { LiquidButton } from '@/components/ui/liquid-glass-button';
import { motion } from 'framer-motion';

export default function SmoothScrollDemoPage() {
  const { scrollTo, scrollToTop, getScrollPosition } = useSmoothScroll();

  const sections = [
    { id: 'section1', title: 'Section 1', color: 'bg-blue-100 dark:bg-blue-900' },
    { id: 'section2', title: 'Section 2', color: 'bg-green-100 dark:bg-green-900' },
    { id: 'section3', title: 'Section 3', color: 'bg-purple-100 dark:bg-purple-900' },
    { id: 'section4', title: 'Section 4', color: 'bg-orange-100 dark:bg-orange-900' },
    { id: 'section5', title: 'Section 5', color: 'bg-pink-100 dark:bg-pink-900' },
  ];

  return (
    <div className="min-h-screen">
      {/* Fixed Navigation */}
      <div className="fixed top-4 left-4 z-50 space-y-2">
        <LiquidButton
          onClick={() => scrollToTop(1.5)}
          className="w-full"
          size="sm"
        >
          Scroll to Top
        </LiquidButton>
        {sections.map((section) => (
          <LiquidButton
            key={section.id}
            onClick={() => scrollTo(`#${section.id}`, { offset: 80, duration: 1.5 })}
            variant="outline"
            className="w-full"
            size="sm"
          >
            {section.title}
          </LiquidButton>
        ))}
      </div>

      {/* Scroll Position Indicator */}
      <div className="fixed top-4 right-4 z-50 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-lg">
        <p className="text-sm font-mono">
          Scroll: {Math.round(getScrollPosition())}px
        </p>
      </div>

      {/* Sections */}
      {sections.map((section, index) => (
        <motion.section
          key={section.id}
          id={section.id}
          className={`min-h-screen flex items-center justify-center ${section.color}`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {section.title}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md">
              This section demonstrates the smooth scrolling capabilities of Lenis. 
              The scroll animation is buttery smooth and provides an excellent user experience.
            </p>
            <div className="mt-8 space-x-4">
              <Button
                onClick={() => scrollToTop(1.2)}
                variant="outline"
              >
                Back to Top
              </Button>
              {index < sections.length - 1 && (
                <Button
                  onClick={() => scrollTo(`#${sections[index + 1].id}`, { offset: 80, duration: 1.2 })}
                >
                  Next Section
                </Button>
              )}
            </div>
          </div>
        </motion.section>
      ))}

      {/* Additional content to demonstrate scrolling */}
      <section className="min-h-screen bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Smooth Scrolling Demo
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mb-8">
            This demo showcases the Lenis smooth scrolling library integration. 
            Notice how smooth and natural the scrolling feels compared to native browser scrolling.
            The library provides excellent performance and customization options.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Smooth Animation</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Buttery smooth scrolling with customizable easing functions.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Performance</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Optimized for 60fps performance with minimal impact on battery life.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Customizable</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Easy to configure duration, easing, and scroll behavior.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 