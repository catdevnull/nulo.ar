const { Raw } = require("eleventy-hast-jsx");
const Prose = require("./prose");
const { formatDate } = require("../../helpers/date");
exports.data = {
  layout: "base.jsx",
};
exports.default = ({ page, link, content }) => (
  <>
    <nav>
      <a href="/">☚ Volver al inicio</a> | En: bookmarks
    </nav>
    <article itemscope="" itemtype="https://schema.org/Article">
      <header>
        <time datetime="{{dateToISO page.date}}" itemprop="datePublished">
          {formatDate(page.date, false)}
        </time>
        <h1>
          <a href={link}>{link}</a>
        </h1>
        <h3>{page.fileSlug}</h3>
      </header>
      <main itemprop="articleBody" data-pagefind-body>
        <Raw html={content} />
      </main>
    </article>
  </>
);
