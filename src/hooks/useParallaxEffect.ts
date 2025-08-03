import { useState, useEffect } from 'react';

interface ParallaxValues {
  offsetX: number;
  offsetY: number;
  scrollY: number;
}

export function useParallaxEffect() {
  const [values, setValues] = useState<ParallaxValues>({
    offsetX: 0,
    offsetY: 0,
    scrollY: 0,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position relative to the center of the screen
      const offsetX = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      const offsetY = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1
      
      setValues(prev => ({
        ...prev,
        offsetX,
        offsetY,
      }));
    };

    const handleScroll = () => {
      setValues(prev => ({
        ...prev,
        scrollY: window.scrollY,
      }));
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial values
    handleScroll();

    // Clean up
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return values;
}