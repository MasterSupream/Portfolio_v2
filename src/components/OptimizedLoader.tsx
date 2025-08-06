'use client';

import { memo } from 'react';

interface OptimizedLoaderProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'dots' | 'pulse';
}

function OptimizedLoaderComponent({ 
  className = '', 
  size = 'md',
  variant = 'spinner'
}: OptimizedLoaderProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  if (variant === 'spinner') {
    return (
      <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-500 ${sizeClasses[size]} ${className}`} />
    );
  }

  if (variant === 'dots') {
    return (
      <div className={`flex space-x-1 ${className}`}>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className={`bg-gray-300 dark:bg-gray-700 rounded animate-pulse ${sizeClasses[size]} ${className}`} />
    );
  }

  return null;
}

export const OptimizedLoader = memo(OptimizedLoaderComponent);

// Skeleton loader for content
interface SkeletonProps {
  className?: string;
  lines?: number;
}

function SkeletonComponent({ className = '', lines = 3 }: SkeletonProps) {
  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2 ${
            index === lines - 1 ? 'w-3/4' : 'w-full'
          }`}
        />
      ))}
    </div>
  );
}

export const Skeleton = memo(SkeletonComponent);

// Image placeholder
interface ImagePlaceholderProps {
  width?: number;
  height?: number;
  className?: string;
}

function ImagePlaceholderComponent({ 
  width = 300, 
  height = 200, 
  className = '' 
}: ImagePlaceholderProps) {
  return (
    <div 
      className={`bg-gray-200 dark:bg-gray-800 animate-pulse flex items-center justify-center ${className}`}
      style={{ width, height }}
    >
      <svg
        className="w-8 h-8 text-gray-400"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}

export const ImagePlaceholder = memo(ImagePlaceholderComponent);