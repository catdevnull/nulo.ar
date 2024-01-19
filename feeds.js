import { readFile, writeFile, mkdir } from "fs/promises";
import { join } from "path";

const feeds = {
  fauno: "https://fauno.endefensadelsl.org/feed.xml",
  copiona: "https://copiona.com/feed.xml",
  j3s: "https://j3s.sh/feed.atom",
  // icyphox: "https://icyphox.sh/blog/feed.xml",
  brunoscheufler: "https://brunoscheufler.com/rss.xml",
  taylor: "https://taylor.town/feed.xml",
  nexxel: "https://www.nexxel.dev/rss.xml",
  delroth: "https://delroth.net//posts/index.xml",
};

const cachedFeedsDir = ".cached-feeds/";

if (process.argv[2] === "refresh") {
  (async () => {
    await mkdir(cachedFeedsDir, { recursive: true });
    await Promise.all(
      Object.entries(feeds).map(async ([name, url]) => {
        console.log(`Refreshing ${name}`);
        try {
          const res = await fetch(url);
          const txt = await res.text();
          await writeFile(join(cachedFeedsDir, `${name}.xml`), txt);
        } catch (error) {
          console.error(`Fail on ${name}:`, error);
        }
      }),
    );
  })();
}

/**
 * Lee un feed ya cacheado sin parsear.
 * @param {string} name
 * @returns string
 */
async function readFeed(name) {
  return await readFile(join(cachedFeedsDir, name + ".xml"), "utf-8");
}

export { feeds, readFeed };
