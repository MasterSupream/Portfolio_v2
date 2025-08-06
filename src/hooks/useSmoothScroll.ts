import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export function useSmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // RAF for Lenis
    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    };
  }, []);

  // Smooth scroll to element
  const scrollTo = (target: string | HTMLElement, options?: {
    offset?: number;
    duration?: number;
    easing?: (t: number) => number;
  }) => {
    if (!lenisRef.current) return;

    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (!element) return;

    const offset = options?.offset || 80; // Account for fixed header
    const duration = options?.duration || 1.2;
    const easing = options?.easing || ((t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)));

    lenisRef.current.scrollTo(element, {
      offset: -offset,
      duration,
      easing,
    });
  };

  // Smooth scroll to top
  const scrollToTop = (duration?: number) => {
    if (!lenisRef.current) return;

    lenisRef.current.scrollTo(0, {
      duration: duration || 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  };

  // Get current scroll position
  const getScrollPosition = () => {
    return lenisRef.current?.scroll || 0;
  };

  // Stop scrolling
  const stop = () => {
    lenisRef.current?.stop();
  };

  // Start scrolling
  const start = () => {
    lenisRef.current?.start();
  };

  return {
    lenis: lenisRef.current,
    scrollTo,
    scrollToTop,
    getScrollPosition,
    stop,
    start,
  };
} 