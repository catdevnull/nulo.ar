import { readFile, writeFile } from "fs/promises";
import { join } from "path";

export const feeds = {
  fauno: "https://fauno.endefensadelsl.org/feed.xml",
  copiona: "https://copiona.com/feed.xml",
  j3s: "https://j3s.sh/feed.atom",
  // icyphox: "https://icyphox.sh/blog/feed.xml",
  brunoscheufler: "https://brunoscheufler.com/rss.xml",
  taylor: "https://taylor.town/feed.xml",
};

if (process.argv[2] === "refresh") {
  await Promise.all(
    Object.entries(feeds).map(async ([name, url]) => {
      console.log(`Refreshing ${name}`);
      const res = await fetch(url);
      const txt = await res.text();
      await writeFile(join("cached-feeds/", `${name}.xml`), txt);
    }),
  );
}

/**
 * Lee un feed ya cacheado sin parsear.
 * @param {string} name
 * @returns string
 */
export async function readFeed(name) {
  return await readFile(join("cached-feeds/", name + ".xml"), "utf-8");
}
