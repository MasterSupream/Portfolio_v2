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
    image: '/images/ChordC.png',
    images: [
      '/images/ChordC.png',
      '/images/ChordC.png',
      '/images/ChordC.png'
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
    image: '/images/Whitz_.png',
    images: [
      '/images/Whitz_.png',
      '/images/Whitz_.png',
      '/images/Whitz_.png'
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
    image: '/images/Versha_.png',
    images: [
      '/images/Versha_.png',
      '/images/Versha_.png',
      '/images/Versha_.png'
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
    image: '/images/Printscript.png',
    images: [
      '/images/Printscript.png',
      '/images/Printscript.png',
      '/images/Printscript.png'
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
    image: '/images/KSA.png',
    images: [
      '/images/KSA.png',
      '/images/KSA.png',
      '/images/KSA.png'
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