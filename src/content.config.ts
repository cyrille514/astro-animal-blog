import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blogCollection = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/blog',
  }),
  // Validación estricta del Frontmatter con Zod
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1, "El título es obligatorio"),
      pubDate: z.coerce.date(),
      description: z.string().max(200, "La descripción no debe superar los 200 caracteres"),
      author: z.string().default('Admin'),
      image: z
        .object({
          url: z.string(),
          alt: z.string(),
        })
        .optional(),
      tags: z.array(z.string()).optional(),
    }),
});

export const collections = {
  blog: blogCollection,
};
