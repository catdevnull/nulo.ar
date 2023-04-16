import path from "node:path";
import { readFile } from "node:fs/promises";
import { parseFeed as _parseFeed } from "htmlparser2";
import { a, li, raw, render, ul } from "@nulo/html.js";
import { parseDocument } from "htmlparser2";
import { getElementsByTagName } from "domutils";

const feeds = {
  fauno: "https://fauno.endefensadelsl.org/feed.xml",
  copiona: "https://copiona.com/feed.xml",
};

export default async () => {
  const articles = [];

  for (const [name, baseUrl] of Object.entries(feeds)) {
    /**
     * @param {string} link
     * @returns string
     */
    const relativeLink = (link) => new URL(link, baseUrl).toString();

    const rawFeed = await readFile(
      path.join("cached-feeds/", name + ".xml"),
      "utf-8"
    );
    const { title, item, link } = parseFeed(rawFeed);

    articles.push(
      li(
        { class: "article" },
        a(
          {
            href: relativeLink(item.link),
            target: "_blank",
            rel: "noopener",
          },
          item.title
        ),
        // TODO: format date
        " via ",
        a({ href: relativeLink(link), rel: "noopener" }, title)
      )
    );
  }

  return render(ul(...articles));
};

/**
 * parsea un feed de rss encontrando cosas que htmlparser2 solo no encuentra
 * @param {string} rawFeed
 */
function parseFeed(rawFeed) {
  const feed = _parseFeed(rawFeed);
  const item = feed?.items[0];

  const dom = parseDocument(rawFeed);
  const feedDom = getElementsByTagName("feed", dom.childNodes, false)[0];
  const linksDom = getElementsByTagName("link", feedDom.childNodes, false);
  const linkDom = linksDom.find((d) => d.attribs.rel === "alternate");

  if (
    !feed ||
    !feed.link ||
    !feed.title ||
    !item ||
    !item.link ||
    !item.title ||
    !item.pubDate ||
    !linkDom ||
    !linkDom.attribs.href
  ) {
    throw "no pude parsear";
  }

  return {
    title: feed.title,
    link: linkDom.attribs.href,
    item: { title: item.title, link: item.link, pubDate: item.pubDate },
  };
}
