'use client';

import { NewNavigation } from '@/components/NewNavigation';
import Hero from '@/components/sections/Hero';
import { Waves } from '@/components/ui/waves-background';
import { useState, lazy, Suspense } from 'react';
import { Project } from '@/lib/types';

// Lazy load heavy components for better initial page load
const About = lazy(() => import('@/components/sections/About'));
const Projects = lazy(() => import('@/components/sections/Projects'));
const Contact = lazy(() => import('@/components/sections/Contact').then(module => ({ default: module.Contact })));
const ProjectModal = lazy(() => import('@/components/ProjectModal'));

// Loading component for lazy-loaded sections
const SectionLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-2 border-gray-300 border-t-blue-500"></div>
  </div>
);

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Delay clearing the project to allow exit animation
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <>
      <NewNavigation />
      <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 relative">
        {/* Waves Background */}
        <Waves 
          className="fixed inset-0 z-0"
          lineColor="rgba(255, 255, 255, 0.1)"
          backgroundColor="transparent"
          waveSpeedX={0.02}
          waveSpeedY={0.01}
          waveAmpX={40}
          waveAmpY={20}
          friction={0.9}
          tension={0.01}
          maxCursorMove={120}
          xGap={12}
          yGap={36}
        />
        
        {/* Content Layer */}
        <div className="relative z-10">
          {/* Hero Section */}
          <Hero />

          {/* About Section */}
          <Suspense fallback={<SectionLoader />}>
            <About />
          </Suspense>

          {/* Projects Section */}
          <Suspense fallback={<SectionLoader />}>
            <Projects onProjectClick={handleProjectClick} />
          </Suspense>

          {/* Contact Section */}
          <Suspense fallback={<SectionLoader />}>
            <Contact className="bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm" />
          </Suspense>
        </div>
      </main>

      {/* Project Modal */}
      {isModalOpen && (
        <Suspense fallback={null}>
          <ProjectModal
            project={selectedProject}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        </Suspense>
      )}
    </>
  )
}