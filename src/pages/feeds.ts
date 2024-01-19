import { parseFeed as _parseFeed } from "htmlparser2";
import { parseDocument } from "htmlparser2";
import { getElementsByTagName } from "domutils";
import { feeds, readFeed } from "../../feeds";

if (process.argv[1].endsWith("feeds.ts")) {
  console.info(await getFeeds());
}

export default async function getFeeds() {
  const articles = [];

  for (const [name, baseUrl] of Object.entries(feeds)) {
    try {
      const rawFeed = await readFeed(name);
      const { title, item, link } = parseFeed(baseUrl, rawFeed);

      articles.push({ title, item, link, baseUrl });
    } catch (error) {
      throw new Error(`failed parsing ${name}`, { cause: error });
    }
  }
  return { articles };
}

/**
 * parsea un feed de rss encontrando cosas que htmlparser2 solo no encuentra
 */
function parseFeed(feedUrl: string, rawFeed: string) {
  const feed = _parseFeed(rawFeed);
  const item = feed?.items[0];

  const dom = parseDocument(rawFeed);
  const feedDom = getElementsByTagName(
    (n) => n === "rss" || n === "feed" || n === "rdf:RDF",
    dom.childNodes,
    false,
  )[0];
  const linksDom = getElementsByTagName(
    (t) => ["link", "atom:link"].includes(t),
    feedDom.childNodes,
    false,
  );
  const linkDom = linksDom.find(
    (d) =>
      d.attribs.rel === "alternate" ||
      // https://datatracker.ietf.org/doc/html/rfc4287#section-4.2.7.2
      // >If the "rel" attribute is not present, the link element MUST be interpreted as if the link relation type is "alternate".
      !("rel" in d.attribs),
  );

  const feedUrll = new URL(feedUrl);
  let link = linkDom?.attribs?.href || feedUrll.origin;
  if (
    !feed ||
    !feed.link ||
    !feed.title ||
    !item ||
    !item.link ||
    !item.title ||
    !link
  ) {
    throw "no pude parsear";
  }
  item.link = item.link && new URL(item.link, feedUrl).toString();
  link = link && new URL(link, feedUrl).toString();

  return {
    title: feed.title,
    link,
    item: { title: item.title, link: item.link },
  };
}
