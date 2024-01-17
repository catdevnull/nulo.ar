const { DOCTYPE, Raw } = require("eleventy-hast-jsx");
exports.default = ({ title, description, content, tailwind, page }) => (
  <>
    <DOCTYPE />
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="author" content="Nulo" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://nulo.ar${page.url}`} />
        <meta property="og:image" content="/assets/cowboy.svg" />
        <meta content="index, follow" name="robots" />
        <link rel="icon" href="/assets/cowboy.svg" />
        <style>
          {`
          /* inter-latin-wght-normal */
          @font-face {
            font-family: 'Inter Variable';
            font-style: normal;
            font-display: swap;
            font-weight: 100 900;
            src: url(/assets/inter-latin-wght-normal.woff2) format('woff2-variations');
            unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;
          }
          `}
          {tailwind}
        </style>
      </head>
      <body class="dark:bg-neutral-900 dark:text-neutral-50">
        <Raw html={content} />
      </body>
    </html>
  </>
);
