import { z } from 'zod';
import type { Skill, SkillGroup } from '@/lib/types';

// Zod validation schema for Skill
export const SkillSchema = z.object({
  name: z.string().min(1).max(50),
  level: z.number().min(1).max(100),
  category: z.enum(['frontend', 'backend', 'tools', 'design']),
  icon: z.string().min(1),
  yearsOfExperience: z.number().min(0).max(20),
});

// Technical skills - Currently learning and developing
export const skills: Skill[] = [
  // Skills will be added as they develop

];

// Group skills by category
export const skillGroups: SkillGroup[] = [
  {
    category: 'frontend',
    skills: skills.filter(skill => skill.category === 'frontend'),
  },
  {
    category: 'backend',
    skills: skills.filter(skill => skill.category === 'backend'),
  },
  {
    category: 'tools',
    skills: skills.filter(skill => skill.category === 'tools'),
  },
  {
    category: 'design',
    skills: skills.filter(skill => skill.category === 'design'),
  },
];

// Helper functions
export const getSkillsByCategory = (category: string): Skill[] => {
  return skills.filter(skill => skill.category === category);
};

export const getTopSkills = (limit: number = 8): Skill[] => {
  return skills
    .sort((a, b) => b.level - a.level)
    .slice(0, limit);
};

export const getSkillByName = (name: string): Skill | undefined => {
  return skills.find(skill => 
    skill.name.toLowerCase() === name.toLowerCase()
  );
};

export const getAverageSkillLevel = (category?: string): number => {
  const filteredSkills = category 
    ? skills.filter(skill => skill.category === category)
    : skills;
  
  if (filteredSkills.length === 0) return 0;
  
  const totalLevel = filteredSkills.reduce((sum, skill) => sum + skill.level, 0);
  return Math.round(totalLevel / filteredSkills.length);
};

// Validate all skills against schema
export const validateSkills = (): boolean => {
  try {
    skills.forEach(skill => SkillSchema.parse(skill));
    return true;
  } catch (error) {
    console.error('Skills validation failed:', error);
    return false;
  }
};