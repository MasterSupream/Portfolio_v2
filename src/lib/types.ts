// Core data interfaces for the portfolio website

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: string;
  image: string;
  images: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  level: number; // 1-100
  category: 'frontend' | 'backend' | 'tools' | 'design';
  icon: string;
  yearsOfExperience: number;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Import constants for type definitions
import { SKILL_CATEGORIES, PROJECT_CATEGORIES } from './constants';

// Utility types for component props and API responses
export type SkillCategory = typeof SKILL_CATEGORIES[number];

export type ProjectCategory = Exclude<typeof PROJECT_CATEGORIES[number], 'all'>;

export interface ProjectFilter {
  category?: ProjectCategory;
  technology?: string;
  featured?: boolean;
}

export interface SkillGroup {
  category: SkillCategory;
  skills: Skill[];
}

// Component prop types
export interface ProjectCardProps {
  project: Project;
  onClick?: (project: Project) => void;
}

export interface SkillBarProps {
  skill: Skill;
  animated?: boolean;
}

export interface ExperienceItemProps {
  experience: Experience;
  isLast?: boolean;
}

// API response types
export interface ContactFormResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}

export interface ValidationError {
  field: string;
  message: string;
}

// Theme types
export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Navigation types
export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface SectionRef {
  id: string;
  element: HTMLElement | null;
}

// Data summary types
export interface DataSummary {
  projects: {
    total: number;
    featured: number;
    categories: string[];
  };
  skills: {
    total: number;
    categories: string[];
    averageLevel: number;
  };
  experience: {
    total: number;
    totalYears: number;
    currentPosition: string;
  };
}