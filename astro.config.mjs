import { defineConfig } from "astro/config";
import wikiLinkPlugin from "remark-wiki-link";
import { slug } from "github-slugger";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), mdx(), icon()],
  build: { inlineStylesheets: "always" },
  markdown: {
    remarkPlugins: [
      [
        wikiLinkPlugin,
        {
          pageResolver: (name) => [slug(name)],
          hrefTemplate: (permalink) => `/notas/${permalink}`,
        },
      ],
    ],
  },
  redirects: {
    // TODO
  },
});
