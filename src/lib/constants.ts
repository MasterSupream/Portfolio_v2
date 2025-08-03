// Theme constants
export const THEME_STORAGE_KEY = 'portfolio-theme';

// Animation constants
export const ANIMATION_DURATION = {
  fast: 200,
  normal: 300,
  slow: 500,
} as const;

// Breakpoints (matching Tailwind defaults)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// Color palette
export const COLORS = {
  primary: '#3B82F6',
  secondary: '#8B5CF6',
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
} as const;

// Z-index scale
export const Z_INDEX = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modal: 1040,
  popover: 1050,
  tooltip: 1060,
} as const;

// Navigation configuration
export const NAV_ITEMS = [
  { id: 'hero', label: 'Home', href: '#hero' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'contact', label: 'Contact', href: '#contact' },
] as const;

// Project categories
export const PROJECT_CATEGORIES = [
  'all',
  'web',
  'mobile',
  'desktop',
  'api',
  'other',
] as const;

// Skill categories
export const SKILL_CATEGORIES = [
  'frontend',
  'backend',
  'tools',
  'design',
] as const;

// Contact form configuration
export const CONTACT_FORM_CONFIG = {
  maxNameLength: 100,
  maxSubjectLength: 200,
  maxMessageLength: 1000,
  minMessageLength: 10,
} as const;

// Animation variants for Framer Motion
export const ANIMATION_VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  slideDown: {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
} as const;

// SEO configuration
export const SEO_CONFIG = {
  title: 'Anuvesh Chilwal | Full Stack Developer',
  description: 'Passionate student and full stack developer exploring AI/ML, web development, and innovative software solutions. Building the future through code.',
  keywords: 'anuvesh chilwal, full stack developer, web development, ai ml, student developer, react, next.js, typescript, javascript, software engineer',
  author: 'Anuvesh Chilwal',
  siteUrl: 'https://anuvesh-portfolio.vercel.app',
  image: '/images/og-image.jpg',
} as const;

// Social media links
export const SOCIAL_LINKS = {
  github: 'https://github.com/Anuvesh07',
  linkedin: 'https://www.linkedin.com/in/anuvesh-chilwal-891382357/',
  twitter: 'https://x.com/AnuveshC7',
  email: 'anuveshchilwal007@gmail.com',
} as const;