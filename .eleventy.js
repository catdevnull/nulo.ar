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
const { formatDate } = require("./helpers/date");

/**
 * @param {import("@11ty/eleventy").UserConfig} eleventyConfig
 */
module.exports = function config(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/status/*");
  eleventyConfig.addPassthroughCopy("src/_redirects");
  eleventyConfig.addPassthroughCopy("src/x/**/*.png");
  eleventyConfig.addPassthroughCopy("src/x/**/*.jpg");
  eleventyConfig.addPassthroughCopy("src/x/**/*.mp4");
  eleventyConfig.addPassthroughCopy("src/bookmarks/**/*.png");
  eleventyConfig.addPassthroughCopy("src/bookmarks/**/*.jpg");
  eleventyConfig.addPassthroughCopy("src/bookmarks/**/*.mp4");

  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPlugin(automaticNoopener, {
    noreferrer: false,
  });

  eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(markdownItWikilinks));

  eleventyConfig.addCollection("x", (collectionApi) =>
    collectionApi.getFilteredByGlob("src/x/**/*"),
  );

  eleventyConfig.addShortcode(
    "dateToISO",
    /** @param {Date} date */ (date) => date.toISOString().slice(0, 10),
  );
  eleventyConfig.addShortcode("formatDate", formatDate);
  eleventyConfig.addShortcode("relativeLink", (link, baseUrl) => new URL(link, baseUrl).toString());

  // eleventyConfig.addShortcode("formatDateish", formatDateish);
  // eleventyConfig.addShortcode("dateishToElement", dateishToElement);

  return {
    dir: {
      input: "src",
      output: "build",
    },
  };
};
