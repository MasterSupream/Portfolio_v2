// Performance monitoring utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  // Mark the start of a performance measurement
  mark(name: string): void {
    if (typeof window !== 'undefined' && 'performance' in window) {
      performance.mark(`${name}-start`);
    }
  }

  // Mark the end and measure performance
  measure(name: string): number | null {
    if (typeof window !== 'undefined' && 'performance' in window) {
      try {
        performance.mark(`${name}-end`);
        performance.measure(name, `${name}-start`, `${name}-end`);
        
        const measure = performance.getEntriesByName(name)[0];
        const duration = measure?.duration || 0;
        
        this.metrics.set(name, duration);
        
        // Clean up marks
        performance.clearMarks(`${name}-start`);
        performance.clearMarks(`${name}-end`);
        performance.clearMeasures(name);
        
        return duration;
      } catch (error) {
        console.warn('Performance measurement failed:', error);
        return null;
      }
    }
    return null;
  }

  // Get all metrics
  getMetrics(): Record<string, number> {
    return Object.fromEntries(this.metrics);
  }

  // Log performance metrics in development
  logMetrics(): void {
    if (process.env.NODE_ENV === 'development') {
      console.table(this.getMetrics());
    }
  }

  // Monitor Core Web Vitals
  observeWebVitals(): void {
    if (typeof window === 'undefined') return;

    // Largest Contentful Paint
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          console.log('LCP:', lastEntry.startTime);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            console.log('FID:', entry.processingStart - entry.startTime);
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0;
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          console.log('CLS:', clsValue);
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (error) {
        console.warn('Web Vitals observation failed:', error);
      }
    }
  }
}

// Hook for React components
export function usePerformanceMonitor() {
  const monitor = PerformanceMonitor.getInstance();
  
  return {
    mark: monitor.mark.bind(monitor),
    measure: monitor.measure.bind(monitor),
    getMetrics: monitor.getMetrics.bind(monitor),
    logMetrics: monitor.logMetrics.bind(monitor),
  };
}

// Utility to debounce expensive operations
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Utility to throttle expensive operations
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Check if device has reduced motion preference
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Check if device is low-end
export function isLowEndDevice(): boolean {
  if (typeof navigator === 'undefined') return false;
  
  // Check for device memory (if available)
  const deviceMemory = (navigator as any).deviceMemory;
  if (deviceMemory && deviceMemory <= 4) return true;
  
  // Check for hardware concurrency
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) return true;
  
  // Check for connection type
  const connection = (navigator as any).connection;
  if (connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')) {
    return true;
  }
  
  return false;
}