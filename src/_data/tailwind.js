// @ts-check
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const { readFile } = require("fs/promises");
const postcss = require("postcss")([tailwindcss(), autoprefixer()]);

module.exports = async () => {
  const result = await postcss.process(await readFile("src/tailwind.css", "utf-8"), {
    from: "assets/tailwind.css",
    to: "index.html",
  });
  return result.css;
};
