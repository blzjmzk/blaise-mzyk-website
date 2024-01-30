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
