import { z } from 'zod';
import type { Project } from '@/lib/types';

// Zod validation schema for Project
export const ProjectSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(300),
  longDescription: z.string().min(1).max(1000),
  technologies: z.array(z.string()).min(1),
  category: z.enum(['web', 'mobile', 'desktop', 'api', 'other']),
  image: z.string().min(1),
  images: z.array(z.string().min(1)),
  liveUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
  featured: z.boolean(),
});

// Portfolio projects
export const projects: Project[] = [
  {
    id: 'chordcircle',
    title: 'ChordCircle',
    description: 'A social music-sharing platform that lets users connect through their Spotify playlists',
    longDescription: 'ChordCircle is a social music-sharing platform that lets users connect through their Spotify playlists. Discover new music, find people with similar tastes, and build friendships based on shared vibes. Built with modern web technologies for a seamless music discovery experience.',
    technologies: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Spotify API'],
    category: 'web',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=600&fit=crop'
    ],
    githubUrl: 'https://github.com/Anuvesh07/ChordCircle',
    featured: true,
  },
  {
    id: 'whitezilla',
    title: 'Whitezilla',
    description: '🦖 A real-time collaborative whiteboard that stomps latency and crushes creative limits',
    longDescription: '🦖 A real-time collaborative whiteboard that stomps latency and crushes creative limits. Draw, brainstorm, and ideate with your team live — from anywhere, on any device. Built for seamless collaboration with real-time synchronization.',
    technologies: ['JavaScript', 'React.js', 'Socket.io', 'Canvas API'],
    category: 'web',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop'
    ],
    githubUrl: 'https://github.com/Anuvesh07/Whitezilla',
    featured: true,
  },
  {
    id: 'veshara',
    title: 'Veshara',
    description: 'A clean and easy-to-use blogging site where your words come first',
    longDescription: 'A clean and easy-to-use blogging site where your words come first. No clutter, no distractions — just a smooth space to write and share your thoughts. Built with modern web technologies for optimal writing experience.',
    technologies: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Markdown'],
    category: 'web',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68e2c6b7d3?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1486312338219-ce68e2c6b7d3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=600&fit=crop'
    ],
    githubUrl: 'https://github.com/Anuvesh07/Veshara',
    featured: true,
  },
  {
    id: 'printscript',
    title: 'PrintScript',
    description: 'A simple web app that converts Markdown and other text formats into clean, professional PDFs',
    longDescription: 'A simple web app that lets you convert Markdown and other text formats into clean, professional PDFs — right from your browser. Fast, minimal, and dev-friendly. Perfect for creating documentation, reports, and formatted documents.',
    technologies: ['TypeScript', 'Next.js', 'Tailwind CSS', 'PDF Generation'],
    category: 'web',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop'
    ],
    liveUrl: 'https://printscript-cilre1mko-masters-projects-0e320efc.vercel.app/',
    githubUrl: 'https://github.com/Anuvesh07/PrintScript',
    featured: false,
  },
  {
    id: 'ksa',
    title: 'KSA - Kindred Supportive Assistant',
    description: 'An AI-powered supportive assistant currently under development',
    longDescription: 'KSA (Kindred Supportive Assistant) is an innovative AI-powered assistant designed to provide supportive and helpful interactions. This project is currently under active development, exploring the intersection of artificial intelligence and human-centered design.',
    technologies: ['AI/ML', 'Python', 'Natural Language Processing', 'Machine Learning'],
    category: 'other',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&h=600&fit=crop'
    ],
    featured: false,
  },
];

// Helper functions for filtering and sorting projects
export const getFeaturedProjects = (): Project[] => {
  return projects.filter(project => project.featured);
};

export const getProjectsByCategory = (category: string): Project[] => {
  if (category === 'all') return projects;
  return projects.filter(project => project.category === category);
};

export const getProjectsByTechnology = (technology: string): Project[] => {
  return projects.filter(project => 
    project.technologies.some(tech => 
      tech.toLowerCase().includes(technology.toLowerCase())
    )
  );
};

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};

// Validate all projects against schema
export const validateProjects = (): boolean => {
  try {
    projects.forEach(project => ProjectSchema.parse(project));
    return true;
  } catch (error) {
    console.error('Project validation failed:', error);
    return false;
  }
};