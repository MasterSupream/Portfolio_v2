import { z } from 'zod';
import type { Experience } from '@/lib/types';

// Zod validation schema for Experience
export const ExperienceSchema = z.object({
  id: z.string().min(1),
  company: z.string().min(1).max(100),
  position: z.string().min(1).max(100),
  startDate: z.string().regex(/^\d{4}-\d{2}$/), // YYYY-MM format
  endDate: z.string().regex(/^\d{4}-\d{2}$/).optional(),
  description: z.string().min(1).max(500),
  achievements: z.array(z.string().min(1).max(200)),
  technologies: z.array(z.string().min(1)),
});

// Work experience - Currently a student with no professional experience
export const experiences: Experience[] = [
  // No professional experience yet - focusing on learning and building projects
];

// Helper functions
export const getCurrentExperience = (): Experience | undefined => {
  return experiences.find(exp => !exp.endDate);
};

export const getPreviousExperiences = (): Experience[] => {
  return experiences.filter(exp => exp.endDate);
};

export const getTotalYearsOfExperience = (): number => {
  if (experiences.length === 0) return 0;
  const startDate = new Date(experiences[experiences.length - 1].startDate + '-01');
  const currentDate = new Date();
  const diffTime = Math.abs(currentDate.getTime() - startDate.getTime());
  const diffYears = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 365));
  return diffYears;
};

export const getExperienceById = (id: string): Experience | undefined => {
  return experiences.find(exp => exp.id === id);
};

export const getAllTechnologies = (): string[] => {
  const allTechs = experiences.flatMap(exp => exp.technologies);
  return Array.from(new Set(allTechs)).sort();
};

export const getExperiencesByTechnology = (technology: string): Experience[] => {
  return experiences.filter(exp => 
    exp.technologies.some(tech => 
      tech.toLowerCase().includes(technology.toLowerCase())
    )
  );
};

// Format date for display
export const formatExperienceDate = (dateString: string): string => {
  const [year, month] = dateString.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short' 
  });
};

// Calculate duration between two dates
export const calculateDuration = (startDate: string, endDate?: string): string => {
  const start = new Date(startDate + '-01');
  const end = endDate ? new Date(endDate + '-01') : new Date();
  
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
  
  const years = Math.floor(diffMonths / 12);
  const months = diffMonths % 12;
  
  if (years === 0) {
    return `${months} month${months !== 1 ? 's' : ''}`;
  } else if (months === 0) {
    return `${years} year${years !== 1 ? 's' : ''}`;
  } else {
    return `${years} year${years !== 1 ? 's' : ''} ${months} month${months !== 1 ? 's' : ''}`;
  }
};

// Validate all experiences against schema
export const validateExperiences = (): boolean => {
  try {
    experiences.forEach(experience => ExperienceSchema.parse(experience));
    return true;
  } catch (error) {
    console.error('Experience validation failed:', error);
    return false;
  }
};