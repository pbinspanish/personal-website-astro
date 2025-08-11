import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date().optional(),
      language: z.enum(["en", "es"]),
      tags: z.array(z.string()),
      draft: z.boolean(),
    }),
});

const photography = defineCollection({
  loader: glob({
    base: "./src/content/photography",
    pattern: "**/*.{.jpg,.jpeg,.png}",
  }),
});

export const collections = { blog };
