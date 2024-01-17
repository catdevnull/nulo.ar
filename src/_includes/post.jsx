const { Raw } = require("eleventy-hast-jsx");
const Prose = require("./prose");
const { dateToISO, formatDate } = require("../../helpers/date");
const { default: Nav } = require("./components/nav");
exports.data = {
  layout: "base.jsx",
};
exports.default = ({ title, content, dateInTitle, backlinks, page }) => (
  <>
    <Nav active="home" />
    <article class="max-w-2xl mx-auto" itemscope="" itemtype="https://schema.org/Article">
      <header class="m-8 text-center">
        {/* https://github.com/CloudCannon/pagefind/issues/532 */}
        <h1 data-pagefind-body class="font-bold text-3xl">
          {title}
        </h1>
        {!dateInTitle ? (
          <>
            <time datetime={dateToISO(page.date)} itemprop="datePublished">
              {formatDate(page.date, false)}
            </time>{" "}
            /{" "}
          </>
        ) : null}
        <a
          href={`https://github.com/catdevnull/nulo.ar/commits/ANTIFASCISTA/${page.inputPath}`}
          class="underline"
        >
          Historial
        </a>
        {backlinks.length ? (
          <>
            {" "}
            /{" "}
            <a href="#conexiones" class="underline">
              Conexiones
            </a>
          </>
        ) : null}
      </header>
      <main itemprop="articleBody" data-pagefind-body>
        <Prose>
          <Raw html={content} />
        </Prose>
      </main>
      {backlinks.length ? (
        <section id="conexiones" class="max-w-2xl mx-auto">
          <h2 class="font-bold text-2xl">⥆ Conexiones ({backlinks.length})</h2>
          <ul class="my-2">
            {backlinks.map((link) => (
              <li class="prose prose-neutral dark:prose-invert before:content-['↜_']">
                <a href={link.url}>{link.title}</a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  </>
);
