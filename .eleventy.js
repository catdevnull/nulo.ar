const { basename } = require("path");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const automaticNoopener = require("eleventy-plugin-automatic-noopener");
const markdownItWikilinks = require("markdown-it-wikilinks")({
  uriSuffix: "",
  generatePagePathFromLabel: (label) => `${label}/`,
  postProcessPagePath: (path) => path,
  postProcessLabel: (path) => basename(path).match(/^(?:(?:\d{4})-(?:\d{2})-(?:\d{2})-)?(.+)$/)[1],
  relativeBaseURL: "../",
});
const { formatDate, dateToISO } = require("./helpers/date");
const { readFileSync } = require("fs");

/**
 * @param {import("@11ty/eleventy").UserConfig} eleventyConfig
 */
module.exports = function config(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/status/*");
  eleventyConfig.addPassthroughCopy("src/_redirects");
  eleventyConfig.addPassthroughCopy("src/**/*.webp");
  eleventyConfig.addPassthroughCopy("src/x/**/*.png");
  eleventyConfig.addPassthroughCopy("src/x/**/*.jpg");
  eleventyConfig.addPassthroughCopy("src/x/**/*.mp4");
  eleventyConfig.addPassthroughCopy("src/bookmarks/**/*.png");
  eleventyConfig.addPassthroughCopy("src/bookmarks/**/*.jpg");
  eleventyConfig.addPassthroughCopy("src/bookmarks/**/*.mp4");
  eleventyConfig.addPassthroughCopy({
    "node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2":
      "assets/inter-latin-wght-normal.woff2",
  });

  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPlugin(automaticNoopener, {
    noreferrer: false,
  });
  eleventyConfig.addPlugin(require("eleventy-hast-jsx").plugin);

  eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(markdownItWikilinks));

  eleventyConfig.addCollection("x", (collectionApi) =>
    collectionApi.getFilteredByGlob("src/x/**/*"),
  );

  eleventyConfig.addShortcode("dateToISO", dateToISO);
  eleventyConfig.addShortcode("formatDate", formatDate);
  eleventyConfig.addShortcode("relativeLink", (link, baseUrl) => new URL(link, baseUrl).toString());
  eleventyConfig.addShortcode("evaIcon", (name, kind) =>
    readFileSync(`node_modules/eva-icons/${kind}/svg/${name}-${kind}.svg`),
  );
  eleventyConfig.addShortcode(
    "bootstrapIcon",
    (name, classs) => {
      const svg = readFileSync(`node_modules/bootstrap-icons/icons/${name}.svg`, "utf-8");
      if (classs) return svg.replace("<svg", `<svg class="${classs}"`);
      return svg;
    },
    // .replaceAll(
    //   /(width|height)=".+?"/g,
    //   "",
    // ),
  );

  // eleventyConfig.addShortcode("formatDateish", formatDateish);
  // eleventyConfig.addShortcode("dateishToElement", dateishToElement);

  return {
    dir: {
      input: "src",
      output: "build",
    },
  };
};
