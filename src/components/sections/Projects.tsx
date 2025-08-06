'use client';

import { useState, useMemo, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { projects, getProjectsByCategory } from '@/data/projects';
import { PROJECT_CATEGORIES, ANIMATION_VARIANTS } from '@/lib/constants';
import { Project } from '@/lib/types';
import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectsProps {
  onProjectClick?: (project: Project) => void;
}

function Projects({ onProjectClick }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // Filter projects based on active filter
  const filteredProjects = useMemo(() => {
    return getProjectsByCategory(activeFilter);
  }, [activeFilter]);

  // Get unique technologies for filter buttons
  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach(project => {
      project.technologies.forEach(tech => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, []);

  const handleFilterChange = useCallback((filter: string) => {
    setActiveFilter(filter);
  }, []);

  const handleProjectClick = useCallback((project: Project) => {
    if (onProjectClick) {
      onProjectClick(project);
    }
  }, [onProjectClick]);

  const handleExternalLink = useCallback((url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <section id="projects" className="min-h-screen flex items-center py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={ANIMATION_VARIANTS.fadeIn}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Projects</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and experience in various technologies.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={ANIMATION_VARIANTS.slideUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
                     {PROJECT_CATEGORIES.map((category) => (
             <Button
               key={category}
               variant={activeFilter === category ? 'primary' : 'outline'}
               size="sm"
               onClick={() => handleFilterChange(category)}
               className="capitalize transition-all duration-300"
             >
               {category === 'all' ? 'All Projects' : category}
             </Button>
           ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={ANIMATION_VARIANTS.scale}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                layout
              >
                <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105" onClick={() => handleProjectClick(project)}>
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading={index < 3 ? 'eager' : 'lazy'}
                      priority={index < 3}
                    />
                    
                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-3 left-3 z-10">
                        <span className="px-2 py-1 text-xs font-medium bg-blue-500 text-white rounded-full">
                          Featured
                        </span>
                      </div>
                    )}

                                         {/* Quick Action Buttons */}
                     <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                       {project.liveUrl && (
                         <Button
                           size="sm"
                           variant="secondary"
                           className="p-2 h-8 w-8"
                           onClick={(e) => handleExternalLink(project.liveUrl!, e)}
                           title="View Live Demo"
                         >
                           <ExternalLink className="h-3 w-3" />
                         </Button>
                       )}
                       {project.githubUrl && (
                         <Button
                           size="sm"
                           variant="secondary"
                           className="p-2 h-8 w-8"
                           onClick={(e) => handleExternalLink(project.githubUrl!, e)}
                           title="View Source Code"
                         >
                           <Github className="h-3 w-3" />
                         </Button>
                       )}
                     </div>
                  </div>

                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg line-clamp-1">{project.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    {/* Technology Badges */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                                         {/* Action Buttons */}
                     <div className="flex gap-2 items-center">
                       <Button
                         className="flex-1 h-10 text-xs font-medium"
                         onClick={(e) => {
                           e.stopPropagation();
                           handleProjectClick(project);
                         }}
                         size="sm"
                       >
                         View Details
                       </Button>
                       {project.liveUrl && (
                         <Button
                           size="sm"
                           variant="outline"
                           onClick={(e) => handleExternalLink(project.liveUrl!, e)}
                           className="px-3"
                         >
                           <ExternalLink className="h-3 w-3" />
                         </Button>
                       )}
                     </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* No Projects Message */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={ANIMATION_VARIANTS.fadeIn}
            className="text-center py-12"
          >
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No projects found for the selected filter.
            </p>
          </motion.div>
        )}


      </div>
    </section>
  );
}

export default memo(Projects);