import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255),
  slug: z.string().min(1, "Slug is required.").max(255),
  category: z.string().min(1, "Category is required.").max(255),
  description: z.string().min(1, "Description is required").max(65535),
  content: z.string().min(1, "Content is required").max(65535),
});

export const patchPostSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255).optional(),
  slug: z.string().min(1, "Slug is required.").max(255).optional(),
  category: z.string().min(1, "Category is required.").max(255).optional(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(65535)
    .optional(),
  content: z.string().min(1, "Content is required").max(65535).optional(),
});
