'use client';

import { useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LiquidButton } from '@/components/ui/liquid-glass-button';
import { Project } from '@/lib/types';
import { ANIMATION_VARIANTS, Z_INDEX } from '@/lib/constants';
import Image from 'next/image';
import { 
  X, 
  ExternalLink, 
  Github, 
  ChevronLeft, 
  ChevronRight,
  Calendar,
  Tag,
  Globe
} from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset image index when project changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [project]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen || !project) return;

    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        setCurrentImageIndex(prev => 
          prev === 0 ? project.images.length - 1 : prev - 1
        );
        break;
      case 'ArrowRight':
        e.preventDefault();
        setCurrentImageIndex(prev => 
          prev === project.images.length - 1 ? 0 : prev + 1
        );
        break;
    }
  }, [isOpen, project, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleKeyDown]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const nextImage = () => {
    if (!project) return;
    setCurrentImageIndex(prev => 
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!project) return;
    setCurrentImageIndex(prev => 
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          style={{ zIndex: Z_INDEX.modal }}
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {project.title}
                </h2>
                {project.featured && (
                  <span className="px-2 py-1 text-xs font-medium bg-blue-500 text-white rounded-full">
                    Featured
                  </span>
                )}
              </div>
              <LiquidButton
                variant="outline"
                size="icon"
                onClick={onClose}
                className="p-2 h-8 w-8"
                title="Close modal (Esc)"
              >
                <X className="h-4 w-4" />
              </LiquidButton>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
              {/* Image Carousel */}
              <div className="relative">
                <div className="relative h-64 md:h-80 bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={project.images[currentImageIndex]}
                    alt={`${project.title} - Image ${currentImageIndex + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 896px"
                    priority={currentImageIndex === 0}
                    loading={currentImageIndex === 0 ? 'eager' : 'lazy'}
                  />
                  
                  {/* Navigation Arrows */}
                  {project.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200"
                        title="Previous image (←)"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200"
                        title="Next image (→)"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  {project.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {project.images.length}
                    </div>
                  )}
                </div>

                {/* Image Thumbnails */}
                {project.images.length > 1 && (
                  <div className="flex gap-2 p-4 overflow-x-auto">
                    {project.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                          index === currentImageIndex
                            ? 'border-blue-500 ring-2 ring-blue-500/20'
                            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`${project.title} thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Project Details */}
              <div className="p-6 space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
                    About This Project
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {project.longDescription}
                  </p>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <Tag className="h-5 w-5" />
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Category
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 capitalize">
                      {project.category}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Status
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {project.featured ? 'Featured Project' : 'Portfolio Project'}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  {project.liveUrl && (
                    <LiquidButton
                      variant="default"
                      size="lg"
                      onClick={() => handleExternalLink(project.liveUrl!)}
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View Live Demo
                    </LiquidButton>
                  )}
                  {project.githubUrl && (
                    <LiquidButton
                      variant="outline"
                      size="lg"
                      onClick={() => handleExternalLink(project.githubUrl!)}
                      className="flex items-center gap-2"
                    >
                      <Github className="h-4 w-4" />
                      View Source Code
                    </LiquidButton>
                  )}
                  <LiquidButton
                    variant="secondary"
                    size="lg"
                    onClick={onClose}
                    className="ml-auto"
                  >
                    Close
                  </LiquidButton>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default memo(ProjectModal);