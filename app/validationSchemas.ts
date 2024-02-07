import { z } from "zod";

const slugRegex = /^[a-zA-Z0-9-]+$/;

//POSTS
export const postSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255),
  slug: z
    .string()
    .min(1, "Slug is required.")
    .max(255)
    .regex(
      slugRegex,
      "Slug can only contain letters, numbers, and hyphens (-)"
    ),
  category: z.string().min(1, "Category is required.").max(255),
  description: z.string().min(1, "Description is required").max(65535),
  content: z.string().min(1, "Content is required").max(65535),
});

export const patchPostSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255).optional(),
  slug: z
    .string()
    .min(1, "Slug is required.")
    .max(255)
    .regex(slugRegex, "Slug can only contain letters, numbers, and hyphens (-)")
    .optional(),
  category: z.string().min(1, "Category is required.").max(255).optional(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(65535)
    .optional(),
  content: z.string().min(1, "Content is required").max(65535).optional(),
});

//BOOK NOTES
export const bookNoteSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255),
  author: z.string().min(1, "Author is required.").max(255),
  year: z.string().min(1, "Year is required.").max(4),
  cover: z.string().min(1, "Year is required.").max(255),
  slug: z
    .string()
    .min(1, "Slug is required.")
    .max(255)
    .regex(
      slugRegex,
      "Slug can only contain letters, numbers, and hyphens (-)"
    ),
  description: z.string().min(1, "Description is required").max(65535),
  highlights: z.string().min(1, "Highlights is required").max(65535),
  thoughts: z.string().min(1, "Thoughts is required").max(65535),
});

export const patchBookNoteSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255).optional(),
  author: z.string().min(1, "Author is required.").max(255).optional(),
  year: z.string().min(1, "Year is required.").max(4).optional(),
  cover: z.string().min(1, "Year is required.").max(255).optional(),
  slug: z
    .string()
    .min(1, "Slug is required.")
    .max(255)
    .regex(slugRegex, "Slug can only contain letters, numbers, and hyphens (-)")
    .optional(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(65535)
    .optional(),
  highlights: z.string().min(1, "Highlights is required").max(65535).optional(),
  thoughts: z.string().min(1, "Thoughts is required").max(65535).optional(),
});

//PROJECTS
export const projectSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255),
  order: z
    .string()
    .min(1, "Order is required.")
    .max(2, "Order should be from 1-99"),
  type: z.string().min(1, "Type is required.").max(255),
  image: z.string().min(1, "Image is required.").max(255),
  codeLink: z.string().max(255).optional(),
  liveLink: z.string().max(255).optional(),
  designLink: z.string().max(255).optional(),
  description: z.string().min(1, "Description is required").max(65535),
  features: z.string().min(1, "Features are required").max(65535),
});

export const patchProjectSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255).optional(),
  order: z.string().min(1, "Order is required.").max(2).optional(),
  type: z.string().min(1, "Type is required.").max(255).optional(),
  image: z.string().min(1, "Image is required.").max(255).optional(),
  codeLink: z.string().max(255).nullable().optional(),
  liveLink: z.string().max(255).nullable().optional(),
  designLink: z.string().max(255).nullable().optional(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(65535)
    .optional(),
  features: z.string().min(1, "Features are required").max(65535).optional(),
});

//Contact form
export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  subject: z.string().min(1, "Subject is required").max(255),
  email: z.string().email().min(1, "Email is required").max(255),
  message: z.string().min(1, "Message is required").max(65535),
});
