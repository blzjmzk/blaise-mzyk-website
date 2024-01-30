import { z } from "zod";

const slugRegex = /^[a-zA-Z0-9-]+$/;

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

export const bookNoteSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255),
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
