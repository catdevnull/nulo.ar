import { z, defineCollection } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.date(),
    tags: z.array(z.string()).optional(),
    lang: z.enum(["en", "es"]).optional(),
  }),
});
const notasCollection = defineCollection({
  type: "content",
});
const marcadoresCollection = defineCollection({
  type: "content",
  schema: z.object({
    url: z.string(),
    date: z.date().optional(),
    title: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  notas: notasCollection,
  marcadores: marcadoresCollection,
};
