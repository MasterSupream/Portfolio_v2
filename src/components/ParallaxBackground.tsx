'use client';

import { useParallaxEffect } from '@/hooks/useParallaxEffect';

interface ParallaxBackgroundProps {
  children: React.ReactNode;
}

export default function ParallaxBackground({ children }: ParallaxBackgroundProps) {
  const { offsetX, offsetY, scrollY } = useParallaxEffect();

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Parallax background gradient */}
      <div 
        className="absolute inset-0 w-full h-full bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 z-0"
        style={{ 
          transform: `translateY(${scrollY * 0.1}px)` 
        }}
      />
      
      {/* Floating circles - slow movement with mouse */}
      <div 
        className="absolute inset-0 w-full h-full z-0 opacity-30 dark:opacity-20 transition-transform duration-300 ease-out"
        style={{ 
          transform: `translate(${offsetX * -15}px, ${offsetY * -15}px) translateY(${scrollY * 0.05}px)` 
        }}
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary-200 dark:bg-primary-900 blur-3xl" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 rounded-full bg-secondary-200 dark:bg-secondary-900 blur-3xl" />
      </div>
      
      {/* Floating circles - medium movement with mouse */}
      <div 
        className="absolute inset-0 w-full h-full z-0 opacity-20 dark:opacity-10 transition-transform duration-300 ease-out"
        style={{ 
          transform: `translate(${offsetX * -25}px, ${offsetY * -25}px) translateY(${scrollY * 0.08}px)` 
        }}
      >
        <div className="absolute top-1/3 right-1/3 w-48 h-48 rounded-full bg-secondary-300 dark:bg-secondary-800 blur-2xl" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full bg-primary-300 dark:bg-primary-800 blur-2xl" />
      </div>
      
      {/* Floating particles - fast movement with mouse */}
      <div 
        className="absolute inset-0 w-full h-full z-0 opacity-30 dark:opacity-20 transition-transform duration-300 ease-out"
        style={{ 
          transform: `translate(${offsetX * -35}px, ${offsetY * -35}px) translateY(${scrollY * 0.12}px)` 
        }}
      >
        {Array.from({ length: 20 }).map((_, i) => {
          // Generate deterministic random values for each particle
          const size = (Math.sin(i * 3.14) * 4 + 6);
          const top = (i * 5) % 100;
          const left = (i * 7) % 100;
          const opacity = (Math.sin(i) * 0.2 + 0.5);
          
          return (
            <div 
              key={i}
              className="absolute rounded-full bg-white dark:bg-gray-700 blur-sm"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                top: `${top}%`,
                left: `${left}%`,
                opacity
              }}
            />
          );
        })}
      </div>

      {/* Light effect that follows mouse */}
      <div 
        className="absolute w-[40vw] h-[40vw] rounded-full radial-gradient opacity-20 dark:opacity-10 pointer-events-none z-0"
        style={{ 
          background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
          left: `calc(${(offsetX + 1) * 50}% - 20vw)`, 
          top: `calc(${(offsetY + 1) * 50}% - 20vw)`,
          transform: 'translate3d(0, 0, 0)',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}