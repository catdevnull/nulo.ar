import { z, defineCollection } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.date(),
    tags: z.array(z.string()).optional(),
  }),
});
const notasCollection = defineCollection({
  type: "content",
});

export const collections = {
  blog: blogCollection,
  notas: notasCollection,
};
