const { parseFeed: _parseFeed } = require("htmlparser2");
const { parseDocument } = require("htmlparser2");
const { getElementsByTagName } = require("domutils");
const { feeds, readFeed } = require("./feeds.js");

module.exports = async () => {
  const articles = [];

  for (const [name, baseUrl] of Object.entries(feeds)) {
    const rawFeed = await readFeed(name);
    const { title, item, link } = parseFeed(baseUrl, rawFeed);

    articles.push({ title, item, link, baseUrl });
  }

  return { articles };
};

/**
 * parsea un feed de rss encontrando cosas que htmlparser2 solo no encuentra
 * @param {string} feedUrl
 * @param {string} rawFeed
 */
function parseFeed(feedUrl, rawFeed) {
  const feed = _parseFeed(rawFeed);
  const item = feed?.items[0];

  const dom = parseDocument(rawFeed);
  const feedDom = getElementsByTagName(
    (n) => n === "rss" || n === "feed" || n === "rdf:RDF",
    dom.childNodes,
    false
  )[0];
  const linksDom = getElementsByTagName(
    (t) => ["link", "atom:link"].includes(t),
    feedDom.childNodes,
    false
  );
  const linkDom = linksDom.find(
    (d) =>
      d.attribs.rel === "alternate" ||
      // https://datatracker.ietf.org/doc/html/rfc4287#section-4.2.7.2
      // >If the "rel" attribute is not present, the link element MUST be interpreted as if the link relation type is "alternate".
      !("rel" in d.attribs)
  );

  const feedUrll = new URL(feedUrl);
  const link = linkDom?.attribs?.href || feedUrll.origin;
  if (
    !feed ||
    !feed.link ||
    !feed.title ||
    !item ||
    !item.link ||
    !item.title ||
    !item.pubDate ||
    !link
  ) {
    throw "no pude parsear";
  }

  return {
    title: feed.title,
    link,
    item: { title: item.title, link: item.link, pubDate: item.pubDate },
  };
}
