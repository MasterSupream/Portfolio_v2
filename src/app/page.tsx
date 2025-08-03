'use client';

import { Navigation } from '@/components/Navigation';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import { Contact } from '@/components/sections/Contact';
import ProjectModal from '@/components/ProjectModal';
import ParallaxBackground from '@/components/ParallaxBackground';
import { useState } from 'react';
import { Project } from '@/lib/types';

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
      <ParallaxBackground>
        <Navigation />
        <main className="min-h-screen text-gray-900 dark:text-gray-100">
          {/* Hero Section */}
          <Hero />

          {/* About Section */}
          <About />

          {/* Projects Section */}
          <Projects onProjectClick={handleProjectClick} />

          {/* Contact Section */}
          <Contact className="bg-gray-50/80 dark:bg-gray-800/80" />
        </main>

        {/* Project Modal */}
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </ParallaxBackground>
    </>
  )
}