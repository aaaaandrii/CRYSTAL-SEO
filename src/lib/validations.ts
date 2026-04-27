import { z } from 'zod';

export const newsCreateSchema = z.object({
  title: z.string().min(1).max(200),
  excerpt: z.string().min(1).max(500),
  content: z.string().min(1),
  imageUrl: z.string().min(1),
  imageAlt: z.string().max(200).optional(),
  published: z.boolean().optional().default(false),
  publishedAt: z.string().optional(),
  source: z.string().optional(),
  sourceName: z.string().max(100).optional(),
  tags: z.string().optional(),
});

export const newsUpdateSchema = newsCreateSchema.partial();

export const caseStudyCreateSchema = z.object({
  title: z.string().min(1).max(200),
  client: z.string().min(1).max(100),
  sector: z.enum([
    'space', 'corporate', 'crypto', 'cultural',
    'dna', 'ip', 'luxury', 'personal',
  ]),
  excerpt: z.string().min(1).max(500),
  challenge: z.string().min(1),
  solution: z.string().min(1),
  outcome: z.string().min(1),
  content: z.string().optional().default(''),
  imageUrl: z.string().min(1),
  imageAlt: z.string().max(200).optional(),
  logoUrl: z.string().optional(),
  published: z.boolean().optional().default(false),
  publishedAt: z.string().optional(),
  featured: z.boolean().optional().default(false),
});

export const caseStudyUpdateSchema = caseStudyCreateSchema.partial();

export const contactFormSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  company: z.string().max(100).optional(),
  message: z.string().min(10).max(5000),
});

export const scheduleDemoSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  company: z.string().min(1).max(100),
  phone: z.string().max(20).optional(),
  preferredDate: z.string().optional(),
  message: z.string().max(2000).optional(),
});
