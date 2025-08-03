import { z } from 'zod';
import { CONTACT_FORM_CONFIG } from './constants';

// Contact form validation schema
export const ContactFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(CONTACT_FORM_CONFIG.maxNameLength, `Name must be less than ${CONTACT_FORM_CONFIG.maxNameLength} characters`)
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(254, 'Email address is too long'),
  
  subject: z
    .string()
    .min(1, 'Subject is required')
    .max(CONTACT_FORM_CONFIG.maxSubjectLength, `Subject must be less than ${CONTACT_FORM_CONFIG.maxSubjectLength} characters`),
  
  message: z
    .string()
    .min(CONTACT_FORM_CONFIG.minMessageLength, `Message must be at least ${CONTACT_FORM_CONFIG.minMessageLength} characters`)
    .max(CONTACT_FORM_CONFIG.maxMessageLength, `Message must be less than ${CONTACT_FORM_CONFIG.maxMessageLength} characters`),
});

// Newsletter subscription schema
export const NewsletterSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
});

// Project filter schema
export const ProjectFilterSchema = z.object({
  category: z.enum(['all', 'web', 'mobile', 'desktop', 'api', 'other']).optional(),
  technology: z.string().optional(),
  featured: z.boolean().optional(),
});

// Search schema
export const SearchSchema = z.object({
  query: z
    .string()
    .min(1, 'Search query is required')
    .max(100, 'Search query is too long'),
  category: z.enum(['all', 'projects', 'skills', 'experience']).default('all'),
});

// Theme preference schema
export const ThemeSchema = z.enum(['light', 'dark', 'system']);

// Export type inference for TypeScript
export type ContactFormData = z.infer<typeof ContactFormSchema>;
export type NewsletterData = z.infer<typeof NewsletterSchema>;
export type ProjectFilterData = z.infer<typeof ProjectFilterSchema>;
export type SearchData = z.infer<typeof SearchSchema>;
export type ThemeData = z.infer<typeof ThemeSchema>;

// Validation helper functions
export const validateContactForm = (data: unknown) => {
  return ContactFormSchema.safeParse(data);
};

export const validateNewsletter = (data: unknown) => {
  return NewsletterSchema.safeParse(data);
};

export const validateProjectFilter = (data: unknown) => {
  return ProjectFilterSchema.safeParse(data);
};

export const validateSearch = (data: unknown) => {
  return SearchSchema.safeParse(data);
};

export const validateTheme = (data: unknown) => {
  return ThemeSchema.safeParse(data);
};